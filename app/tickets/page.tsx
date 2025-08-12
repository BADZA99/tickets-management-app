import React from 'react'
import {prisma} from "../../prisma/prisma";
import DataTable from './DataTable';

const Tickets =async () => {
  const tickets = await prisma.ticket.findMany();
  console.log(tickets);
  return (
    <div>
      <DataTable tickets={tickets} />
    </div>
  )
}

export default Tickets
