"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategories } from "@/services";
import { ProductTypes } from "@/types/types";
import { Category } from "@/types/productTypes";

interface ProductsByCategoriesProps {
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
  className: "center",
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3, // Adjust based on your layout and preference
  swipeToSlide: true,
  afterChange: function(index: number) {
    console.log(`Slider Changed to: ${index + 1}`);
  }
};
const ProductsByCategories = ({ categories }: ProductsByCategoriesProps) => {
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
    <div className="container">
      <h2>Products by Categories</h2>
      {categories.map((category) => {
        const products = data?.data?.data[category];
        if (products && products.length > 0) {
          return (
            <div key={category}>
              <h3>
                {category.charAt(0).toUpperCase() + category.slice(1)} Products
              </h3>
              <Slider {...settings}>
                {products.map((item) => (
                  <div key={item.id}>
                    <h4>{item.name}</h4>
                    <Image
                      src={item.assets[0]}
                      width={100}
                      height={100}
                      alt={`Image of ${item.name}`}
                      loading="lazy"
                    />
                  </div>
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

export default ProductsByCategories;
