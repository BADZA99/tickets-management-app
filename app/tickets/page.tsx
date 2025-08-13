import React from 'react'
import {prisma} from "../../prisma/prisma";
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

const Tickets =async () => {
  const tickets = await prisma.ticket.findMany();
  // console.log(tickets);
  return (
    <div>
      <Link href='/tickets/new'
      className={buttonVariants({
        variant: 'default'})}
      >new ticket</Link>
      
      <DataTable tickets={tickets} />
      <Pagination 
        itemCount={22}
        pageSize={10}
        currentPage={1}
        // onPageChange={(page) => console.log('Page changed to:', page)}
       />
    </div>
  )
}

export default Tickets
