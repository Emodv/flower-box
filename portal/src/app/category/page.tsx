"use client";

import SearchBar from "@/components/custom/search/seachbar";
import React from "react";
import PaginatedProducts from "@/components/custom/products/paginatedProducts";

type Props = {};

function Page({}: Props) {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <SearchBar></SearchBar>
      </div>
      <div className="pt-10 pb-20">
      <PaginatedProducts></PaginatedProducts>
      </div>
    </div>
  );
}

export default Page;
