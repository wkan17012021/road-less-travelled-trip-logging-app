import type { MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import dynamic from 'react';

import LogIn from "~/routes/_auth.login";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Testimonials from "~/components/Testimonials";
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
    { title: "Road Less Travelled Web App" },
    { name: "description", content: "A travel diary web app that allows registered users to catalogue their travel journeys." },
  ];
};

export default function Index() {
  return (
    <>
      <Header />
      <Hero />

      <LogIn />
      <Testimonials />

      <Footer />
    </>
  );
}
