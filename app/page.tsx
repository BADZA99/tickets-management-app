import DashChart from '@/components/DashChart';
import DashRecentTickets from '@/components/DashRecentTickets';
import { prisma } from '@/prisma/prisma';
import { skip } from 'node:test';
import React from 'react'

const Dashboard = async() => {
  // Fetching the latest 5 tickets that are not closed
  // and including the assigned user details
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT:[
        {status: 'CLOSED'},
      ]
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: 0,
    take: 5,
    include : {
      assignedTo: true
  }
  });

  // console.log(tickets);

  // Grouping tickets by status and counting them
  const groupTicket=await prisma.ticket.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  })
  console.log(groupTicket);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div><DashRecentTickets tickets={tickets}/></div>
        <div><DashChart/></div>
      </div>
    </div>
  );
}

export default Dashboard
