import { FC } from "react";
import { cn } from "~/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "~/components/ui/pagination";

import { Button } from "~/components/ui/button";

import { useSearchParams, useLocation, useNavigate } from "@remix-run/react";


interface PaginationProps {
  pageCount: number;
  className?: string;
}

interface PaginationArrowProps {
  direction: "left" | "right";
  href: string;
  isDisabled: boolean;
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const navigate = useNavigate();
  const isLeft = direction === "left";
  const disabledClassName = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <Button
      onClick={() => navigate(href)}
      className={`bg-gray-100 text-gray-500 hover:bg-gray-200 ${disabledClassName}`}
      aria-disabled={isDisabled}
      disabled={isDisabled}
    >
      {isLeft ? "«" : "»"}
    </Button>
  );
};

export function PaginationComponent({
  pageCount,
  className,  
}: Readonly<PaginationProps>) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${location.pathname}?${params.toString()}`;
  };

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationArrow
            direction="left"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="p-2 font-semibold text-primary leading-normal">Page {currentPage}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationArrow
            direction="right"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}