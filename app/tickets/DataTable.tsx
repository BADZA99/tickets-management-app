import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {Ticket} from '@prisma/client';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { SearchParams } from './page';

interface Props {
    tickets: Ticket[];
    searchParams : SearchParams;
}

const DataTable = ({ tickets, searchParams }: Props) => {
  // console.log(tickets);
  return (
    <div className="w-full mt-5 ">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link
                  href={{ query: { ...searchParams, orderBy: "title" } }}
                  className=""
                >
                  title
                </Link>
                {"title" === searchParams?.orderBy && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>

              <TableHead>
                {" "}
                <div className="flex justify-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: "status" } }}
                    className=""
                  >
                    status
                  </Link>{" "}
                  {"status" === searchParams?.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>

              {/* <div className="flex justify-center"> */}
              <TableHead>
                <div className="flex justify-center">
                  {" "}
                  <Link
                    href={{ query: { ...searchParams, orderBy: "priority" } }}
                    className=""
                  >
                    priority
                  </Link>
                  {"priority" === searchParams?.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              {/* </div> */}
              <TableHead>
                <Link
                  href={{ query: { ...searchParams, orderBy: "createdAt" } }}
                  className=""
                >
                  createdAt
                </Link>
                {"createdAt" === searchParams?.orderBy && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tickets ? (
              tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href="/">
                  <TableCell>
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className=" hover:underline"
                    >
                      {ticket.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center">
                      <TicketPriority priority={ticket.priority} />
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div>no tickets</div>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable
