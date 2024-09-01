import React from "react";

export default function PostLayout({
  children,
  comments,
}: {
  children: React.ReactNode;
  comments: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {children}
      {comments}
    </div>
  );
}
