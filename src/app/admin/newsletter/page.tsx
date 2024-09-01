import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";
import AddSubscriber from "./AddSubscriber";
import { db } from "@/lib/db";
import EditSubscriber from "./EditSubscriber";
import DeleteSubscriber from "./DeleteSubscriber";

export const metadata = {
  title: "Newsletter Subscribers",
};

export default async function Page() {
  const subscribers = await db.newsletterSubscription.findMany();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex w-full flex-col items-center justify-between sm:flex-row">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">
          Newsletter Subscribers
        </h1>
        <AddSubscriber />
      </div>

      {/* Subscribers Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.name}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  {subscriber.subscribed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditSubscriber
                      id={subscriber.id}
                      name={subscriber.name}
                      email={subscriber.email}
                      subscribed={subscriber.subscribed}
                    />
                    <DeleteSubscriber id={subscriber.id} />
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
