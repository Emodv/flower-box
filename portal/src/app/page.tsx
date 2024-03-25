import React from "react";
import Header from "./(home)/header";
import ProductsByCatogories from "@/components/products";
import { Category } from "@/types/productTypes";

type Props = {};

function Page({}: Props) {
  return (
    <div className="">
      <Header></Header>
      <ProductsByCatogories
        categories={[
          Category.winter,
          Category.autumn,
          Category.anniversary,
          Category.summer,
        ]}
      ></ProductsByCatogories>
    </div>
  );
}

export default Page;
