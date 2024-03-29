"use client";

import { Separator } from "@/components/ui/separator";
import { fetchProduct } from "@/services/productService/productService";
import { ProductTypes } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  Boxes,
  CarTaxiFront,
  CircleDollarSign,
  ShoppingCart,
  TagIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import Tag from "@/components/custom/tags/tag";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface singleProduct {
  data: {
    data: ProductTypes.Product;
  };
}

type Props = {
  params: { id: string };
};

// const settings = {
//   customPaging: function (i) {
//     return (
//       <a>
//         <Image src={`${baseUrl}/abstract0${i + 1}.jpg`} />
//       </a>
//     );
//   },
//   dots: true,
//   dotsClass: "slick-dots slick-thumb",
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
// };

function Page({ params }: Props) {
  const { data, isLoading, isError, error } = useQuery<singleProduct>({
    queryKey: ["product"],
    queryFn: () => fetchProduct({ productId: params.id }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Could not load Products....</div>;

  const product = data?.data.data as ProductTypes.Product;

  console.log(product, "single-data");

  return (
    <div className="container min-h-screen py-20">
      <div className="carousal relative flex w-full gap-2">
        <div className="relative h-[550px] flex-1 overflow-hidden rounded-l-xl">
          <Image
            src={product?.assets[0]}
            alt="asdf"
            layout="fill"
            objectFit="cover"
          ></Image>
        </div>
        <div className="relative flex flex-1 items-start justify-start gap-2">
          {product?.assets.map((item, index) => {
            return (
              <div
                key={item}
                className={cn("relative h-80 w-64 overflow-hidden", {
                  "rounded-r-xl": [1, 3, 5].includes(index),
                })}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={item}
                  alt={`flowerbox product picture`}
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex">
        <div className="flex-[5]">
          <div className="my-10">
            <h1 className="text-lg font-semibold">{product?.name}</h1>
            <p className="mt-4 text-subtle">{product?.description}</p>
          </div>
          <Separator className="w-full border-t-[1px] border-gray-300" />
          <div className="flex items-center space-x-10 py-8">
            <CircleDollarSign />
            <p className="flex flex-col">
              <span className="text-lg">${product?.price}</span>
              <span className="text-subtle">
                Getting you the lowest price possible...
              </span>
            </p>
          </div>
          <Separator className="w-full border-t-[1px] border-gray-300" />
          <div className="my-6 space-x-2">
            <h1 className="mb-8 flex space-x-2">
              <Boxes />
              <span>Tags</span>
            </h1>
            {product?.categories?.map((item) => {
              return <Tag key={item}>{item}</Tag>;
            })}
          </div>
          <div className="my-6 space-x-2">
            <h1 className="mb-8 flex space-x-2">
              <TagIcon />
              <span>Tags</span>
            </h1>
            {product?.tags?.map((item) => {
              return <Tag key={item}>{item}</Tag>;
            })}
          </div>
        </div>
        <div className="flex-[4]">
          <Button variant="outline" className="hover:bg-primary-hover">
            <ShoppingCart className="mr-2"/>
            Login with Email
          </Button>
        </div>
      </div>
      {/* <Slider {...settings}>
        <div>
          <Image src={baseUrl + "/abstract01.jpg"} />
        </div>
        <div>
          <Image src={baseUrl + "/abstract02.jpg"} />
        </div>
        <div>
          <Image src={baseUrl + "/abstract03.jpg"} />
        </div>
        <div>
          <Image src={baseUrl + "/abstract04.jpg"} />
        </div>
      </Slider> */}
    </div>
  );
}

export default Page;
