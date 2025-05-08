import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { ImageUploader } from "~/components/ImageUploader";

import { getSession } from "~/session.server";
import { getSupabaseClient } from "~/utils/getSupabaseClient";

// export async function loader({ request }: LoaderFunctionArgs) {
//   try {
//     getSupabaseClient();
//   } catch (error) {
//     return redirect("/");
//   }

//   const session = await getSession(request.headers.get("Cookie"));
//   const token = session.get("__session");

//   if (!token) {
//     return redirect("/login");
//   }

//   return json({});
// }

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const file = formData.get("image");

//   if (!file || typeof file === "string") {
//     return json({ error: "No file uploaded or invalid file type" }, { status: 400 });
//   }

//   // Get the authenticated user's ID
//   const supabase = getSupabaseClient();
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();

//   if (userError || !user) {
//     return json({ error: "User not authenticated" }, { status: 401 });
//   }

//   const userId = user.id;
//   const fileName = `${Date.now()}-${file.name}`;
//   const filePath = `${userId}/${fileName}`;

//   // Convert the file to a Buffer for Supabase
//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const { data, error } = await supabase.storage
//     .from("images")
//     .upload(filePath, buffer, {
//       cacheControl: "3600",
//       upsert: false,
//       contentType: file.type, // Set the correct MIME type
//     });

//   if (error) {
//     return json({ error: error.message }, { status: 500 });
//   }

//   return json({ message: "File uploaded successfully", data });
// };

// export default function Gallery() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Upload an Image</h1>
//       <ImageUploader />
//     </div>
//   );
// }

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

  const fileName = `${Date.now()}-${file.name}`;
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
    <div>
      <h1 className="text-2xl font-bold">Upload an Image</h1>
      <ImageUploader />
    </div>
  );
}