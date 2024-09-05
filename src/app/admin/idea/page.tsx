import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddIdea from "./AddIdea";
import { db } from "@/lib/db";
import EditIdea from "./EditIdea";
import DeleteIdea from "./DeleteIdea";

type Idea = {
  id: number;
  title: string;
  description: string;
};

export default async function Page() {
  const ideas = await db.idea.findMany();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">Ideas Management</h1>
        <AddIdea />
      </div>

      {/* Ideas Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ideas.map((idea) => (
              <TableRow key={idea.id}>
                <TableCell className="font-medium">{idea.title}</TableCell>
                <TableCell>{idea.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditIdea idea={idea} />
                    <DeleteIdea id={idea.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
