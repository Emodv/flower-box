"use client";

import SearchBar from "@/components/search/seachbar";
import React from "react";
import ProductsByCatogories from "@/components/products/productsByCategories";
import { Category } from "@/types/productTypes";

type Props = {};

function Page({}: Props) {
  return (
    <div>
      <div className="sticky top-0 z-10">
      <SearchBar></SearchBar>
      </div>
      <ProductsByCatogories
          categories={[
            Category.romantic,
            Category.anniversary,
            Category.spring,
            Category.anniversary,
            Category.summer,
          ]}
        />
    </div>
  );
}

export default Page;
