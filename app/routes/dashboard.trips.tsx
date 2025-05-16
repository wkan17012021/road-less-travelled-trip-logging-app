import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { ImageUploader } from "../components/ImageUploader";
import { sanitizeFilename } from "../utils/sanitizeFilename";

import { getSession } from "../session.server";
import { getSupabaseClient } from "../utils/getSupabaseClient";
import Map from "~/components/Map";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("__session");

  if (!token) return redirect("/login");

  // Only needed if you want to validate the session with Supabase
  const supabase = getSupabaseClient(token);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return redirect("/login");

  return json({});
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("__session");

  if (!token) return json({ error: "Not authenticated" }, { status: 401 });

  const supabase = getSupabaseClient(token);

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return json({ error: "User not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!file || typeof file === "string") {
    return json({ error: "No file uploaded or invalid file type" }, { status: 400 });
  }

  const safeName = sanitizeFilename(file.name);
  const fileName = `${Date.now()}-${safeName}`;
  const filePath = `${user.id}/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, buffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return json({ message: "File uploaded successfully", path: data?.path });
};

export default function Gallery() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Upload an Image</h1>
      <ImageUploader />
      
        <Map />
      
    </>
  );
}