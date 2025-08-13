'use client';

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {

    const pageCount = Math.ceil(itemCount / pageSize); 
    const router = useRouter();
    const searchParams=useSearchParams();
 
    if (pageCount <= 1) {
        return null; // No pagination needed if there's only one page
    }

    // fonction qui met la page a jour sur l'url
    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };
  return (
    <div>
      <div className="mt-4">
        <Button variant={"outline"} disabled={currentPage === 1} 
          onClick={() => changePage(1)}>
          <ChevronFirst />
        </Button>
        <Button variant={"outline"} disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button variant={"outline"} disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}>
          <ChevronRight />
        </Button>
        <Button variant={"outline"} disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}>
          <ChevronLast />
        </Button>
      </div>

      <div className="">
        <p>
          Page {currentPage} of {pageCount} ({itemCount} items total)
        </p>
      </div>
    </div>
  );
};

export default Pagination