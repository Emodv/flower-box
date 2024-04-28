"use client";

import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services";
import { ProductTypes } from "@/types/types";
import Link from "next/link";
import ProductCards from "../cards/productCards";
import Title from "../title/title";
import { ArrowRight } from "lucide-react";

interface ProductsByCategoryI {
  data: {
    data: ProductTypes.Product[];
  };
}

const settings = {
  className: "center custom-slider",
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 4,
  swipeToSlide: true,
  arrows: false,
  afterChange: function (index: number) {
    console.log(`Slider Changed to: ${index + 1}`);
  },
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const TopProducts = () => {
  const { data, isLoading, isError, error } = useQuery<ProductsByCategoryI>({
    queryKey: ["topProducts"],
    queryFn: productService.getTopProducts,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div className="container">Loading...</div>;
  if (isError)
    return (
      <div className="container">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  console.log(data?.data?.data, "data");

  return (
    <div className="container py-14">
      <Title>Top Products</Title>
      <div className="my-10">
        <Slider {...settings}>
          {data?.data?.data.map((item) => (
            <ProductCards key={item.id} {...item} discount></ProductCards>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopProducts;
