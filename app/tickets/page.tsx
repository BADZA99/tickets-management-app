import React from "react";
import { prisma } from "../../prisma/prisma";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status } from "@prisma/client";

interface SearchParams {
  status: Status;
  page: string;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;

  const statues = Object.values(Status);
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let whereClause = {};

  if (status) {
    whereClause = { status };
  } else {
    whereClause = {
      NOT: [
        {
          status: "CLOSED" as Status,
        },
      ],
    };
  }
  // console.log(tickets);
  // Compte le nombre total de tickets en fonction du filtre de statut
  const ticketCount = await prisma.ticket.count({
    where: whereClause,
  });
  const tickets = await prisma.ticket.findMany({
    where: whereClause,
    skip: (page - 1) * pageSize,
    take: pageSize,
    // orderBy: {
    //   createdAt: "desc",
    // },
  });

  return (
    <div>
      <div className="flex gap-2">

      <Link
        href="/tickets/new"
        className={buttonVariants({
          variant: "default",
        })}
      >
        new ticket
      </Link>

      <StatusFilter />
      </div>

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

export default Tickets;
