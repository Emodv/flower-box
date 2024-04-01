"use client";

import {
  ArrowBigRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Clover,
  Cylinder,
  Flower,
  Flower2,
  Grip,
  Heart,
  Leaf,
  PartyPopper,
  Search,
  ShoppingBasket,
  Snowflake,
  Sun,
  TreePine,
} from "lucide-react";
import React, { useState } from "react";
import Slider from "react-slick";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Input } from "../../ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import useStore from "@/state/store";
import { Category } from "@/types/productTypes";
import { cn } from "@/lib/utils";
// import categories from "@/store/data.json";

type Props = {};

const settings = {
  // dots: true,
  className: "custom-arrow-slider",
  speed: 500,
  infinite: true,
  slidesToShow: 10,
  slidesToScroll: 2,
  // initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 8,
        infinite: true,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
  ],
};

function SearchBar({}: Props) {
  const [searchString, setSearchString] = useState("");
  const {
    setSearchString: setStoreSearchString,
    setCategory: setStoreCategory,
    category,
  } = useStore((state) => state);

  const searchStringHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setStoreCategory(undefined)
    setStoreSearchString(searchString);
  };

  return (
    <div className="container relative">
      <div className="slider-container bg-[#fffcfc] pt-4">
        <div className="m-auto mb-4 w-[600px]">
          <div className="relative">
            <form onSubmit={searchStringHandler}>
              <Input
                onChange={(e) => setSearchString(e.target.value)}
                type="search"
                id="default-search"
                className="text-sm block h-14 w-full rounded-full border-gray-300 p-4 ps-10 text-gray-900 shadow-md"
                placeholder="Search by Name, Category or Tags..."
                required
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary p-0 font-medium text-white hover:brightness-90"
              >
                <Search className="text-white" size={16}></Search>
              </Button>
            </form>
          </div>
        </div>
        <Separator className="w-full border-t-[1px]" />
        <Slider {...settings}>
          {categories.map(({ name, icon, value }) => {
            return (
              <div
                key={name}
                className="m-2 cursor-pointer text-center text-subtle"
              >
                <Button
                  onClick={() => setStoreCategory(value)}
                  variant="ghost"
                  className={cn(
                    "flex h-20 w-full flex-col items-center rounded-md py-3 hover:bg-transparent hover:font-semibold",
                    {
                      "bg-primary-hover font-semibold": category === value,
                    },
                  )}
                >
                  {icon}
                  <span className="mt-2 text-xs">{name}</span>
                </Button>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default SearchBar;

const categories = [
  { value: Category.all, name: "all", icon: <Grip size={20}/> },
  { value: Category.spring, name: "spring", icon: <Flower size={20}/> },
  { value: Category.summer, name: "summer", icon: <Sun size={20}/> },
  { value: Category.autumn, name: "autumn", icon: <Leaf size={20}/> },
  { value: Category.winter, name: "winter", icon: <Snowflake size={20}/> },
  { value: Category.romantic, name: "romantic", icon: <Heart size={20}/> },
  { value: Category.sympathy, name: "sympathy", icon: <Clover size={20}/> },
  {
    value: Category.congratulation,
    name: "congratulation",
    icon: <PartyPopper size={20}/>,
  },
  { value: Category.tropic, name: "tropic", icon: <TreePine size={20}/> },
  { value: Category.anniversary, name: "anniversary", icon: <CalendarCheck size={20}/> },
  { value: Category.bouquets, name: "bouquets", icon: <Flower2 size={20}/> },
  { value: Category.basket, name: "basket", icon: <ShoppingBasket size={20}/> },
  { value: Category.vase, name: "vase", icon: <Cylinder size={20}/> },
];

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <div className="flex h-8 w-8 -translate-y-6 items-center justify-center rounded-full border-[1px]">
        <ChevronRight color="black" />
      </div>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <div className="flex h-8 w-8 -translate-y-6 items-center justify-center rounded-full border-[1px]">
        <ChevronLeft color="black" />
      </div>
    </div>
  );
}
