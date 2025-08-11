import React from 'react'
import {prisma} from "../../prisma/prisma";

const Tickets =async () => {
  const tickets = await prisma.ticket.findMany();
  console.log(tickets);
  return (
    <div>
      tickets
    </div>
  )
}

export default Tickets
