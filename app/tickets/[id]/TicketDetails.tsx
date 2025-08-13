import { Ticket } from '@prisma/client'
import React from 'react'

import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import DeleteButtom from './DeleteButtom';

interface TicketDetailsProps {
  ticket: Ticket

}



const TicketDetails = ({ ticket }: TicketDetailsProps) => {
  return (
    <div className="lg:grid lg:grid-cols-4 ">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
        <CardHeader>
          <div className="flex justify-between">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriority priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            {" "}
            Created at{" "}
            {new Date(ticket.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className='prose dark:prose-invert '>
          <ReactMarkdown>{ticket.description}</ReactMarkdown>
          </CardContent>
        <CardFooter>
            Updated at{" "}
          {new Date(ticket.updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </CardFooter>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2 ">
        <Link
          href={`/tickets/edit/${ticket.id}`}
            className={buttonVariants({
                 variant: 'default'})}
        >edit ticket</Link>
        <DeleteButtom ticketId={ticket.id} />
      </div>
    </div>
  );
};

export default TicketDetails