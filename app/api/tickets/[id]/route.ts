import { prisma } from "@/prisma/prisma";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";

interface Props{
    params:{id:string}
}

export async function PATCH(request: NextRequest, { params }: Props) {
    const body = await request.json();
    const validation = ticketSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {
            status: 400,
        });
    }

    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });   
    }

    const updatedTicket = await prisma.ticket.update({
        //quand on recupere lid de la requete c en string alors que quand on le stocke dans la base de donnee c en int
        //donc on parse le string en int
        where: { id: parseInt(params.id) },
        data: {
            ...body
        },
    });

    return NextResponse.json(updatedTicket, {
        status: 200,
    });
}

export async function DELETE(request: NextRequest, { params }: Props) {
    const ticket = await prisma.ticket.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!ticket) {
        return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    await prisma.ticket.delete({
        where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Ticket deleted successfully" }, {
        status: 200,
    });
}