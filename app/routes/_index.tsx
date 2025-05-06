import type { MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import Home from "~/routes/home";
import Logo from "~/components/Logo";
import LogIn from "~/routes/_auth.login";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getSupabaseClient } from "~/utils/getSupabaseClient";

export async function loader() {
  if (process.env.NODE_ENV === "production") {
    let isSupabaseAvailable = true;

    try {
      getSupabaseClient();
    } catch (error) {
      isSupabaseAvailable = false;
    }

    if (isSupabaseAvailable) {
      return redirect("/login");
    }
  }

  return Response.json({});
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
    <Header/>
    <Home />
    <LogIn />
      {/* <nav className="flex justify-center w-full px-4 pt-8">
        <Logo />
      </nav>
      <main className="grow">
        <LogIn />
      </main> */}
            <Footer />
    </>
  );
}
