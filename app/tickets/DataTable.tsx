import TicketStatusBadge from '@/components/TicketStatusBadge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {Ticket} from '@prisma/client';

interface Props {
    tickets: Ticket[];
}

const DataTable = ({tickets}:Props) => {

    // console.log(tickets);
  return (
    <div className='w-full mt-5 '>
    <div className='rounded-md sm:border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>title</TableHead>
            <div className="flex justify-center">
              <TableHead>status</TableHead>
            </div>
            <TableHead>priority</TableHead>
            <TableHead>created at</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tickets ? tickets.map((ticket) => (
            <TableRow key={ticket.id} data-href='/'>
              <TableCell>{ticket.title}</TableCell>
              <div className="flex justify-center">
                <TableCell><TicketStatusBadge status={ticket.status}/></TableCell>
              </div>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>{new Date(ticket.createdAt).toLocaleDateString('en-US',{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}</TableCell>
            </TableRow>
          )) : (
            <div>no tickets</div>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}

export default DataTable
