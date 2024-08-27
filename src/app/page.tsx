"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import bOne from "../../public/b-one.avif";
import bTwo from "../../public/b-Two.avif";
import bThree from "../../public/b-three.avif";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Moon, Sun } from "lucide-react";

export default function Component() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 items-center border-b px-4 lg:px-6">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Blog
          </Link>
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="#"
          >
            Contact
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <form className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search..."
              type="search"
            />
          </form>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="mb-6 text-2xl font-bold tracking-tighter sm:mb-8 sm:text-4xl md:text-5xl">
              Latest Posts
            </h2>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="md:col-span-2 lg:row-span-2">
                <CardHeader>
                  <Image
                    src={bOne}
                    alt="Another image"
                    className="mx-auto w-full rounded-lg object-cover md:mx-0"
                    height={300}
                    width={800}
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl sm:text-2xl">
                    Top Post Title
                  </CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    This is a brief description of the top post. Its more
                    detailed than the others to grab attention. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
                    href="#"
                  >
                    Read More
                  </Link>
                </CardFooter>
              </Card>
              {[1, 2].map((i) => (
                <Card key={i} className="flex flex-col">
                  <CardHeader>
                    <Image
                      src={bTwo}
                      alt={`Featured post ${i} image`}
                      className="mx-auto w-full rounded-lg object-cover md:mx-0"
                      height={150}
                      width={300}
                    />
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardTitle className="text-lg">Featured Post {i}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A brief description of the featured post. This is a
                      shorter summary to fit the smaller card size.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      href="#"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="mb-6 text-2xl font-bold tracking-tighter sm:mb-8 sm:text-4xl md:text-5xl">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {[
                "Technology",
                "Travel",
                "Food",
                "Lifestyle",
                "Fashion",
                "Health",
                "Business",
                "Education",
              ].map((category) => (
                <Link
                  key={category}
                  className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
                  href="#"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="l mb-6 text-2xl font-bold tracking-tighter sm:mb-8 sm:text-4xl md:text-5xl">
              More Posts
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <Image
                      src={bThree}
                      alt={`Blog post ${i} image`}
                      className="mx-auto w-full rounded-lg object-cover md:mx-0"
                      height={200}
                      width={400}
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>Blog Post Title {i}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This is a brief description of the blog post. It gives
                      readers an idea of what to expect.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
                      href="#"
                    >
                      Read More
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Subscribe to Our Newsletter
                </h2>
                <p className="mx-auto max-w-xs text-sm text-muted-foreground sm:max-w-md sm:text-base md:text-lg lg:text-xl">
                  Stay updated with our latest blog posts and news. We promise
                  not to spam you!
                </p>
              </div>
              <div className="w-full max-w-xs space-y-2 sm:max-w-sm">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          © 2023 Acme Inc. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="#">
            Privacy
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Author" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Link
            href="#"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            John Doe
          </Link>
        </div>
      </footer>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
