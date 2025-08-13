import React from 'react'
import {prisma} from "../../prisma/prisma";
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

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
    </div>
  )
}

export default Tickets
