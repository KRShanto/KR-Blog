import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import ContactRow from "./ContactRow";

export const metadata = {
  title: "Contacts List",
};

export default async function ContactsPage() {
  const contacts = await db.contact.findMany();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex w-full flex-col items-center justify-between sm:flex-row">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">Contacts</h1>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <ContactRow key={contact.id} contact={contact} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
