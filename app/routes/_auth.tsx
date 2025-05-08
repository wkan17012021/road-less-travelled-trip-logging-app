import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import Logo from "~/components/Logo";
import { getSupabaseClient } from "~/utils/getSupabaseClient";

export function loader() {
  try {
    getSupabaseClient(); // Throws an error if Supabase is not set
  } catch (error) {
    return redirect("/"); // Redirect to _index.tsx
  }

  return Response.json({});
}

export default function AuthLayout() {
  return (
    <main className="flex grow">
      <div className="absolute left-4 top-4">
        <Logo />
      </div>
      <div className="hidden p-8 bg-white hover:bg-amber-50 lg:basis-5/12 lg:flex transition-all duration-1000 ease-in-out">
        <img src="https://images.unsplash.com/photo-1646021263444-9b4aa871ceb7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Illustration" 
        className="transition-all duration-1000 ease-in-out"
           style={{
         clipPath: "circle(20% at 50% 50%)",
           }}
           onMouseEnter={(e) => {
         (e.currentTarget.style.clipPath = "circle(60% at 50% 50%)");
           }}
           onMouseLeave={(e) => {
         (e.currentTarget.style.clipPath =
           "circle(20% at 50% 50%)");
           }}
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full px-4 py-24 lg:px-8 lg:basis-7/12">
        <Outlet />
      </div>
    </main>
  );
}
