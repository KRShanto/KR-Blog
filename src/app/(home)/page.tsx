import Link from "next/link";
import Image from "next/image";
import bOne from "../../../public/b-one.avif";
import bTwo from "../../../public/b-two.avif";
import bThree from "../../../public/b-three.avif";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewsLetter from "./NewsLetter";

export default async function Page() {
  return (
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
                  This is a brief description of the top post. Its more detailed
                  than the others to grab attention. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
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
                    A brief description of the featured post. This is a shorter
                    summary to fit the smaller card size.
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

      <NewsLetter />
    </main>
  );
}
