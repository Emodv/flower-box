import React from "react";
import Header from "./(home)/header";

import ProductsByCatogories from "@/components/products/productsByCategories";
import TopProducts from "@/components/products/productsWithDiscount";

import { Category } from "@/types/productTypes";
import Banner from "@/components/banners/banner";
import JoinUs from "@/components/joinus/joinus";
import Navbar from "@/components/navbar/navbar";

type Props = {};

function Page({}: Props) {
  return (
    <>
      <Navbar></Navbar>
      <div className="">
        <Header />
        <ProductsByCatogories
          categories={[
            Category.romantic,
            Category.anniversary,
            // Category.spring,
            // Category.anniversary,
            // Category.summer,
          ]}
        />
        <TopProducts categories={[Category.romantic]} />
        <Banner></Banner>
        <JoinUs></JoinUs>
      </div>
    </>
  );
}

export default Page;
