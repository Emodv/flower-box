import React from "react";
import Header from "./(home)/header";
import ProductsByCatogories from "@/components/products";

type Props = {};

function Page({}: Props) {
  return (
    <div className="">
      <Header></Header>
      <ProductsByCatogories></ProductsByCatogories>
    </div>
  );
}

export default Page;
