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
import React from "react";
import Slider from "react-slick";
import { Button } from "../../ui/button";
import Link from "next/link";
import { Input } from "../../ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
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
  return (
    <div className="container relative">
      <div className="slider-container bg-[#fffcfc] pt-10 ">
        <div className="m-auto mb-8 w-[600px]">
          <div className="relative">
            <Input
              type="search"
              id="default-search"
              className="text-md block h-14 w-full rounded-full border-gray-300 p-4 ps-10 text-gray-900 shadow-md"
              placeholder="Search by Name, Category or Tags..."
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-medium text-white hover:brightness-90"
            >
              <Search className="text-white" size={16}></Search>
            </button>
          </div>
        </div>
        <Separator className="w-full border-t-[1px]"/>
        <Slider {...settings}>
          {categories.map(({ name, icon }) => {
            return (
              <div
                key={name}
                className="m-2 cursor-pointer text-center text-subtle"
              >
                <Button
                  variant="ghost"
                  className="flex h-20 w-full flex-col items-center rounded-md py-3 hover:font-semibold hover:bg-transparent"
                >
                  {icon}
                  <span className="mt-2 text-sm">{name}</span>
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
  { name: "all", icon: <Grip /> },
  { name: "spring", icon: <Flower /> },
  { name: "summer", icon: <Sun /> },
  { name: "autumn", icon: <Leaf /> },
  { name: "winter", icon: <Snowflake /> },
  { name: "romantic", icon: <Heart /> },
  { name: "sympathy", icon: <Clover /> },
  { name: "congratulation", icon: <PartyPopper /> },
  { name: "tropic", icon: <TreePine /> },
  { name: "anniversary", icon: <CalendarCheck /> },
  { name: "bouquets", icon: <Flower2 /> },
  { name: "basket", icon: <ShoppingBasket /> },
  { name: "vase", icon: <Cylinder /> },
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
