"use client";

import { Metadata } from "next";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import ErrorAnimation from "@/../public/animations/error.json";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
  title: "Server Error",
};

export default function ErrorPage() {
  return (
    <main className="px-10">
      <Lottie
        animationData={ErrorAnimation}
        className="mx-auto w-52 max-[1000px]:w-40 max-[400px]:w-32"
        loop={false}
        autoplay={true}
      />

      <h2 className="mb-5 text-center text-4xl font-bold text-red-500 max-[1000px]:text-3xl max-[400px]:text-xl">
        An Error occured
      </h2>

      <p className="text-center text-2xl max-[1000px]:text-xl max-[400px]:text-base">
        We are encountering some issues. Please try again later.
      </p>
    </main>
  );
}
