import { db } from "@/lib/db";
import BlogCard from "./_component/BlogCard";
const data = [
  {
    id: 1,
    title: "Top Post Title",
    description:
      "This is a brief description of the top post. Its more detailed than the others to grab attention. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "July 15, 2022",
  },
  {
    id: 2,
    title: "2nd Post Title",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna",
    date: "July 16, 2022",
  },
];
export default async function Page() {
  // Fetch data from an API or a database
  const blogPosts = await db.post.findMany();
  console.log(blogPosts);
  return (
    <main className="flex-1 overflow-auto p-4 md:p-8">
      <div className="flex flex-col justify-center space-y-3">
        {data.map((d) => (
          <BlogCard key={d.id} blog={d} />
        ))}
      </div>
    </main>
  );
}
