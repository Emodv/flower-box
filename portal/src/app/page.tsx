import React from "react";
import Header from "./(home)/header";

import ProductsByCatogories from "@/components/custom/products/productsByCategories";
import TopProducts from "@/components/custom/products/productsWithDiscount";

import { Category } from "@/types/productTypes";
import Banner from "@/components/custom/banners/banner";
import JoinUs from "@/components/custom/joinus/joinus";
import Navbar from "@/components/custom/navbar/navbar";

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
        <TopProducts/>
        <Banner></Banner>
        <JoinUs></JoinUs>
      </div>
    </>
  );
}

export default Page;
