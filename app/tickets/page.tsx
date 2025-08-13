import React from 'react'
import {prisma} from "../../prisma/prisma";
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

interface SearchParams{
  page: string;
}


const Tickets = async ({ searchParams }: { searchParams :SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();
  // console.log(tickets);
  const tickets = await prisma.ticket.findMany({
    
    skip: (page - 1) * pageSize,
    take: pageSize,
    // orderBy: {
    //   createdAt: 'desc',
    // },
  });

  return (
    <div>
      <Link
        href="/tickets/new"
        className={buttonVariants({
          variant: "default",
        })}
      >
        new ticket
      </Link>

      <DataTable tickets={tickets} />
      <Pagination
        itemCount={ticketCount}
        pageSize={pageSize}
        currentPage={page}
        // onPageChange={(page) => console.log('Page changed to:', page)}
      />
    </div>
  );
};

export default Tickets
