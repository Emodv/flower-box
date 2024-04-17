"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const usePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    if (!searchParams.has("page") || isNaN(currentPage)) {
      router.replace(`${pathName}?page=${1}`);
    }
  }, [searchParams, currentPage, pathName, router]);

  const setPage = (page: number) => {
    router.replace(`${pathName}?page=${page}`);
  };

  return { setPage, currentPage };
};
