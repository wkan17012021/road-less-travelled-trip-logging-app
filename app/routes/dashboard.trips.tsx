import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json, unstable_parseMultipartFormData, UploadHandler } from "@remix-run/node";
import { ImageUploader } from "../components/ImageUploader";
import { useFetcher, useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { useState, useEffect } from "react";

import { getSession } from "../session.server";
import { getSupabaseClient } from "../utils/getSupabaseClient";
import Map from "~/components/Map";
import Banner from "~/components/Banner";
import { sanitizeFilename } from "../utils/sanitizeFilename";
import mime from "mime";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("__session");

  if (!token) return redirect("/login");

  const supabase = getSupabaseClient(token);
  const { data: trips, error } = await supabase
    .from("trips")
    .select("*")
    .eq("user_id", session.get("user_id"));

  if (error) {
    throw new Response(error.message, { status: 500 });
  }

  return json({ trips, token }); // <-- include token
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("__session");

  console.log("Session token:", token);

  if (!token) {
    console.log("Error: Not authenticated");
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  const supabase = getSupabaseClient(token);

  // Fetch user_id from session
  const userId = session.get("user_id");
  console.log("Session user_id:", userId);

  if (!userId) {
    console.log("Error: User ID not found in session");
    return json({ error: "User ID not found in session" }, { status: 401 });
  }

  // Verify user exists in the members table
  const { data: member, error: memberError } = await supabase
    .from("members")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (memberError) {
    console.error("Supabase query error:", memberError);
    return json({ error: "Database query error" }, { status: 500 });
  }

  if (!member) {
    console.log("Error: User not found in members table");
    return json({ error: "User not found in members table" }, { status: 404 });
  }

  // --- Use unstable_parseMultipartFormData for file upload ---
  const uploadHandler: UploadHandler = async ({ name, filename, data }) => {
    if (name === "image" && filename) {
      // Sanitize the filename to remove spaces and special characters
      const safeFilename = sanitizeFilename(filename);
      const chunks = [];
      for await (const chunk of data) {
        chunks.push(chunk);
      }
      const buffer = Buffer.concat(chunks);
      const filePath = `${userId}/${Date.now()}-${safeFilename}`;
      const contentType = mime.getType(safeFilename) || "application/octet-stream";
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, buffer, {
          cacheControl: "3600",
          upsert: false,
          contentType
        });
      if (uploadError) {
        throw new Error(uploadError.message);
      }
      return uploadData?.path;
    }
    // For non-file fields, just return as string
    const textDecoder = new TextDecoder();
    const chunks = [];
    for await (const chunk of data) {
      chunks.push(chunk);
    }
    return textDecoder.decode(Buffer.concat(chunks));
  };

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);

  const title = formData.get("title");
  const imagePath = formData.get("image");
  const caption = formData.get("caption");
  const description = formData.get("description");
  const latitude = formData.get("latitude");
  const longitude = formData.get("longitude");

  console.log("Form data received:", { title, imagePath, caption, description, latitude, longitude });

  if (
    !title ||
    !imagePath ||
    !caption ||
    !description ||
    latitude === null ||
    longitude === null
  ) {
    console.log("Error: Missing required fields");
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  // Get public URL for the uploaded image
  const imageUrl = imagePath
    ? supabase.storage.from("images").getPublicUrl(imagePath as string).data.publicUrl
    : null;

  if (!imageUrl) {
    console.log("Error: Failed to generate public URL for image");
    return json({ error: "Failed to generate public URL for image" }, { status: 500 });
  }

  // Insert trip data into the trips table
  const { error: insertError } = await supabase.from("trips").insert({
    user_id: userId,
    title,
    image_url: imageUrl,
    caption,
    description,
    latitude: parseFloat(latitude as string),
    longitude: parseFloat(longitude as string),
  });

  if (insertError) {
    console.log("Error inserting into trips table:", insertError);
    return json({ error: "Failed to add trip" }, { status: 500 });
  }

  console.log("Trip added successfully");
  return json({ message: "Trip added successfully", path: imagePath });
};

export default function Gallery() {
  const { trips, token } = useLoaderData<{ trips: any[]; token: string }>(); // <-- get token
  const fetcher = useFetcher();
  const [formData, setFormData] = useState<{
    title: string;
    image: File | null;
    caption: string;
    description: string;
    latitude: number | null;
    longitude: number | null;
  }>({
    title: "",
    image: null,
    caption: "",
    description: "",
    latitude: null,
    longitude: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (file: File) => {
    console.log("File received in handleFileChange:", file);
    setFormData((prev) => ({ ...prev, image: file }));
    console.log("Updated formData after file change:", formData);
  };

  const handleLocationExtracted = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = () => {
    // Validate that all required fields are filled
    const { title, image, caption, description, latitude, longitude } = formData;
    if (!title || !image || !caption || !description || latitude === null || longitude === null) {
      setErrorMessage("Please fill out all fields and ensure geolocation data is available before uploading.");
      console.log("Form data validation failed:", formData);
      return;
    }

    setErrorMessage(""); // Clear any previous error messages

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (key === "image" && value instanceof File) {
          data.append(key, value);
        } else if (key !== "image") {
          data.append(key, String(value));
        }
      }
    });

    console.log("Submitting form data:", Object.fromEntries(data));
    fetcher.submit(data, { method: "post", encType: "multipart/form-data" });
  };

  // Clear form fields after successful upload
  useEffect(() => {
    if (fetcher.data && typeof fetcher.data === "object" && "message" in fetcher.data) {
      setFormData({
        title: "",
        image: null,
        caption: "",
        description: "",
        latitude: null,
        longitude: null,
      });
      setErrorMessage("");
    }
  }, [fetcher.data]);

  return (
    <>
      <Banner />
      <h1 className="text-2xl font-bold mb-2">Upload an Image</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <ImageUploader
          onLocationExtracted={handleLocationExtracted}
          onFileSelected={handleFileChange}
        />
        <input
          type="text"
          name="caption"
          placeholder="Caption"
          value={formData.caption}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          type="button"
          onClick={handleUpload}
          className="btn btn-primary"
        >
          Upload Image
        </button>
      </div>
      <Map trips={trips} onLocationFound={handleLocationExtracted} token={token} /> {/* <-- pass token */}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.error("Route error:", error);
    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.data || "Something went wrong."}</p>
      </div>
    );
  }

  console.error("Unexpected error:", error);
  return (
    <div>
      <h1>Unexpected Error</h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
}