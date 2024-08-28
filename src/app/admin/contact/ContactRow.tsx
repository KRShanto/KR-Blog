"use client";

import React, { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import moment from "moment";
import { Contact } from "@prisma/client";

export default function ContactRow({ contact }: { contact: Contact }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Maximum length of the message to display before truncating

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{contact.name}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>
        {isExpanded || contact.message.length <= maxLength
          ? contact.message
          : `${contact.message.substring(0, maxLength)}...`}
        {contact.message.length > maxLength && (
          <button
            onClick={toggleExpand}
            className="ml-2 text-blue-500 hover:underline"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        )}
      </TableCell>
      <TableCell>{moment(contact.createdAt).format("MMM D, YYYY")}</TableCell>
    </TableRow>
  );
}
