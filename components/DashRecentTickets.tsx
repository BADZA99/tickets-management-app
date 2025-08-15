import { Prisma } from "@prisma/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";
import TicketPriority from "./TicketPriority";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedTo: true;
  };
}>;
interface Props {
  tickets: TicketWithUser[];
}
const DashRecentTickets = ({ tickets }: Props) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent updated Tickets</CardTitle>
        <CardDescription>Last 5 tickets created</CardDescription>
      </CardHeader>
      <CardContent>
        {tickets && tickets.length > 0 ? (
          <div className="space-y-8">
            {tickets.map((ticket) => (
              <div className="flex items-center" key={ticket.id}>
                <TicketStatusBadge status={ticket.status} />
                <div className="ml-4 space-y-1">
                  <Link
                    href={`/tickets/${ticket.id}`}
                    className=" hover:underline"
                  >
                    <p>{ticket.title}</p>
                    <p>{ticket.assignedTo?.name || "Unassigned"}</p>
                  </Link>
                </div>
                <div className="ml-auto font-medium">
                  <TicketPriority priority={ticket.priority} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No recent tickets found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashRecentTickets;
