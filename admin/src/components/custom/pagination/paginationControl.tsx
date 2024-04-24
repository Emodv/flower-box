"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  prevPage: number | undefined;
  nextPage: number | undefined;
}

const PaginationControls = ({
  prevPage,
  nextPage,
}: PaginationControlsProps) => {

  const { currentPage, setPage } = usePagination();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            // @ts-ignore
            onClick={() => setPage(prevPage)}
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 pr-2.5")}
            disabled={!prevPage}
            variant="ghost"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            // @ts-ignore
            onClick={() => setPage(prevPage)}
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 pr-2.5")}
            disabled={!prevPage}
            variant="ghost"
          >
            {currentPage - 1}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Button
            // @ts-ignore
            onClick={() => setPage(nextPage)}
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 pr-2.5")}
            disabled={!nextPage}
            variant="ghost"
          >
            {currentPage + 1}
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            // @ts-ignore
            onClick={() => setPage(nextPage)}
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 pr-2.5")}
            disabled={!nextPage}
            variant="ghost"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
