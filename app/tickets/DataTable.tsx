import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {Ticket} from '@prisma/client';

interface Props {
    tickets: Ticket[];
}

const DataTable = ({tickets}:Props) => {

    // console.log(tickets);
  return (
    <div className="w-full mt-5 ">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>title</TableHead>

              <TableHead>
                {" "}
                <div className="flex justify-center">status </div>
              </TableHead>

              {/* <div className="flex justify-center"> */}
              <TableHead>
                <div className="flex justify-center"> priority</div>
              </TableHead>
              {/* </div> */}
              <TableHead>created at</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tickets ? (
              tickets.map((ticket) => (
                <TableRow key={ticket.id} data-href="/">
                  <TableCell>{ticket.title}</TableCell>
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
}

export default DataTable
