import { prisma } from '@/prisma/prisma';
import React from 'react'
import TicketDetails from './TicketDetails';

interface Props{
    params: { id: string };
}
//!note important
//pour voir un ticket icic on a pas besoin de creer une route dans le dossier api pour acceder a la base d edonne car on est dur un server page le ticket est retourne directememt au server
//pour read,delete et update c des client page du coup il faut une route dans /api pour acceder a la base de donnee
const ViewTicket = async ({params}:Props) => {
    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!ticket) {
        return <p className='text-destructive'>Ticket not found</p>;
    }


  return (
    <TicketDetails ticket={ticket} />
  )
}

export default ViewTicket