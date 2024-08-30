"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
type TProps = {
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
};

export default function MyImage({
  width,
  height,
  src,
  alt,
  className,
  ...props
}: TProps) {
  const [isLoad, setIsLoad] = useState(true);
  return (
    <>
      {isLoad && (
        <Skeleton
          style={{
            width: "100%",
            height,
          }}
        />
      )}
      <Image
        {...props}
        style={{
          visibility: isLoad ? "hidden" : "visible",
          height: isLoad ? "0px" : `${height}px`,
        }}
        loading="lazy"
        onLoad={() => setIsLoad(() => false)}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </>
  );
}
