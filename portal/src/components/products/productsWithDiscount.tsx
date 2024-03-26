"use client";

import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategories } from "@/services";
import { ProductTypes } from "@/types/types";
import { Category } from "@/types/productTypes";
import Link from "next/link";
import ProductCards from "../cards/productCards";
import Title from "../title/title";
import { ArrowRight, ArrowRightSquare } from "lucide-react";

interface TopProductsI {
  categories: Category[];
}

interface ProductsByCategoryI {
  data: {
    data: {
      [key in Category]?: ProductTypes.Product[];
    };
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
        dots: true,
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
const TopProducts = ({ categories }: TopProductsI) => {
  const { data, isLoading, isError, error } = useQuery<ProductsByCategoryI>({
    queryKey: ["productsByCategories"],
    queryFn: () => getProductsByCategories({ categories }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="container py-14">
      <Title>Top Products</Title>
      {categories.map((category) => {
        const products = data?.data?.data[category];
        if (products && products.length > 0) {
          return (
            <div key={category} className="my-10">
              <div className="flex justify-between px-6 py-4">
                <h3 className="text-lg capitalize text-primary">
                  Top Products
                </h3>
                <Link
                  href="/"
                  className="text-md flex justify-center gap-2 text-subtle transition-all hover:gap-3"
                >
                  See more <ArrowRight></ArrowRight>
                </Link>
              </div>
              <Slider {...settings}>
                {products.map((item) => (
                  <ProductCards key={item.id} {...item} discount></ProductCards>
                ))}
              </Slider>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default TopProducts;
