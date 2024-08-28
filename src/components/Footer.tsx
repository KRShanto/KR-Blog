import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { SITE_NAME } from "@/lib/consts";
import Image from "next/image";
import { Button } from "./ui/button";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center justify-between gap-2 border-t px-14 py-6 sm:flex-row">
      <p className="text-base text-muted-foreground">
        © 2024 {SITE_NAME}. All rights reserved.
      </p>

      <div className="flex space-x-4">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <Button variant="outline" size="icon">
            <FaTwitter className="h-5 w-5" />
          </Button>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <Button variant="outline" size="icon">
            <FaFacebook className="h-5 w-5" />
          </Button>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Button variant="outline" size="icon">
            <FaInstagram className="h-5 w-5" />
          </Button>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Button variant="outline" size="icon">
            <Linkedin className="h-5 w-5" />
          </Button>
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Button variant="outline" size="icon">
            <FaGithub className="h-5 w-5" />
          </Button>
        </a>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="font-medium text-slate-400">Author</h3>
        <Link
          className="flex items-center gap-3"
          href="https://www.krshanto.com"
        >
          <Image
            src="/author.png"
            alt="Author"
            className="rounded-full object-cover"
            height={50}
            width={50}
          />
          <p className="text-xl font-bold">KR Shanto</p>
        </Link>
      </div>
    </footer>
  );
}
