"use client";

import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services";
import { ProductTypes } from "@/types/types";
import { Category } from "@/types/productTypes";
import ProductCards from "../cards/productCards";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useStore from "@/state/store";
import { useRouter } from "next/navigation";
import Title from "../title/title";

interface ProductsByCategoriesProps {
  categories: Category[];
}

interface ProductWithPlaceholder extends ProductTypes.Product {
  placeholder?: boolean;
}

interface ProductsByCategoryI {
  data: {
    data: {
      [key in Category]?: ProductWithPlaceholder[];
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

const ProductsByCategories = ({ categories }: ProductsByCategoriesProps) => {
  const { setCategory } = useStore((state) => state);

  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<ProductsByCategoryI>({
    queryKey: ["productsByCategories"],
    queryFn: () => productService.getProductsByCategories({ categories }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div className="container">Loading...</div>;
  if (isError)
    return (
      <div className="container">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="container py-14">
      <Title>Products by Categories</Title>
      {categories.map((category) => {
        const products = data?.data?.data[category];

        if (!products || products.length === 0) {
          return null;
        }

        const extendedProducts = [...products];
        while (extendedProducts.length < 4) {
          extendedProducts.push({
            id: 1,
            name: "Comming soon...",
            assets: ["/placeholderProduct.jpg"],
            description: "",
            price: 0,
            createdAt: "",
            categories: [],
            placeholder: true,
          });
        }

        return (
          <div key={category} className="my-10">
            <div className="flex justify-between px-6 py-4">
              <h3 className="text-lg capitalize text-primary">{category}</h3>
              <Button
                variant="ghost"
                className="text-md flex items-center justify-center gap-2 text-subtle transition-all hover:gap-3 hover:bg-primary-hover"
                onClick={() => {
                  setCategory(category);
                  router.push("/category");
                }}
              >
                See more <ArrowRight size={18} />
              </Button>
            </div>
            <Slider {...settings}>
              {extendedProducts.map((item) => (
                <ProductCards key={item.id} {...item} />
              ))}
            </Slider>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsByCategories;
