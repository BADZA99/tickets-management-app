import { Ticket } from '@prisma/client'
import React from 'react'

interface TicketDetailsProps {
  ticket: Ticket

}


const TicketDetails = ({ ticket }: TicketDetailsProps) => {
  return <div>
    <h1 className='text-2xl font-bold mb-4'>Ticket Details</h1>
    <div className='p-6 rounded-lg shadow-md'>
      <p><strong>ID:</strong> {ticket.id}</p>
      <p><strong>Title:</strong> {ticket.title}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(ticket.updatedAt).toLocaleString()}</p>
    </div>
  </div>;
};

export default TicketDetails