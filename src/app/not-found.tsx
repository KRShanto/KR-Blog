import { Metadata } from "next";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import NotFoundAnimation from "./NotFoundAnimation";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved.",
  openGraph: {
    title: "Page not found",
    description:
      "The page you are looking for does not exist or has been moved.",
    images: [], // no image should be shown
  },
};

export default function Page() {
  return (
    <main className="flex flex-col items-center px-10">
      <NotFoundAnimation />

      <h2 className="mb-5 text-5xl font-bold text-red-500 max-[1000px]:text-4xl max-[400px]:mb-3 max-[400px]:text-2xl">
        Page not found
      </h2>

      <p className="text-2xl max-[1000px]:text-xl max-[400px]:text-lg">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link href="/">
        <Button className="mt-10 text-lg">
          <FaHome className="mr-2" />
          Go back home
        </Button>
      </Link>
    </main>
  );
}
