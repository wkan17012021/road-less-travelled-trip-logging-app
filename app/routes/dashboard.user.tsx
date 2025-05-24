import { useLoaderData } from "@remix-run/react";
import { getSupabaseClient } from "~/utils/getSupabaseClient";
import { getSession } from "~/session.server";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title: "User | Remix Dashboard",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("__session");

  if (!token) {
    throw new Response("Not authenticated", { status: 401 });
  }

  const supabase = getSupabaseClient(token);
  const userId = session.get("user_id");

  const { data: user, error } = await supabase
    .from("members")
    .select("name, email, location, avatar_url")
    .eq("id", userId)
    .single();

  if (error || !user) {
    throw new Response("User not found", { status: 404 });
  }

  return user;
};

export default function User() {
  const user = useLoaderData();

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900 lg:text-3xl">
        User Details
      </h1>
      <div className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl md:flex-row">
        <div className="flex flex-col w-full px-8 py-10 bg-slate-50 md:basis-1/3 md:items-center lg:py-12">
          <img
            className="object-cover w-20 h-20 rounded-full ring-2 ring-cyan-300 lg:w-28 lg:h-28"
            src={user.avatar_url || "/user.jpg"}
            alt={user.name || "User Avatar"}
          />
        </div>
        <div className="px-8 py-10 md:basis-2/3 lg:px-10 lg:py-12">
          <div className="mb-6 space-y-1">
            <p className="text-sm">Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div className="mb-6 space-y-1 overflow-hidden">
            <p className="text-sm">Email</p>
            <p className="font-medium truncate">{user.email}</p>
          </div>
          <div className="mb-6 space-y-1">
            <p className="text-sm">Location</p>
            <p className="font-medium">{user.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}
