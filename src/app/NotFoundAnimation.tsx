"use client";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import Animation from "@/../public/animations/not-found.json";

/* TODO: try to optimize this animation */
export default function NotFoundAnimation() {
  return (
    <div className="mx-auto my-7 flex h-52 w-72 items-center justify-center max-[1000px]:h-32 max-[1000px]:w-52 max-[400px]:h-28 max-[400px]:w-40">
      <Lottie animationData={Animation} loop={false} autoplay={true} />
    </div>
  );
}
