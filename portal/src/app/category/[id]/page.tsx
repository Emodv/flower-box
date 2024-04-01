"use client";

import { Separator } from "@/components/ui/separator";
import { fetchProduct } from "@/services/productService/productService";
import { ProductTypes } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  Boxes,
  CarTaxiFront,
  CircleDollarSign,
  QrCode,
  ShoppingCart,
  TagIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import Tag from "@/components/custom/tags/tag";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useStore from "@/state/store";

interface singleProduct {
  data: {
    data: ProductTypes.Product;
  };
}

type Props = {
  params: { id: string };
};

function Page({ params }: Props) {
  const setCartItem = useStore((state) => state.setCartItem);

  const { data, isLoading, isError, error } = useQuery<singleProduct>({
    queryKey: ["product"],
    queryFn: () => fetchProduct({ productId: params.id }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Could not load Products....</div>;

  const product = data?.data.data as ProductTypes.Product;

  console.log(product, "single-data");

  return (
    <div className="container min-h-screen py-10">
      <div className="pb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/category">Browse Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <h1 className="text-2xl font-semibold">{product?.name}</h1>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="carousal relative flex w-full gap-2">
        <div className="relative h-[550px] flex-1 overflow-hidden rounded-l-lg">
          <Image
            src={product?.assets[0]}
            alt="asdf"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL="/placeholderProduct.jpg"
          ></Image>
        </div>
        <div className="relative flex h-[550px] flex-1 flex-wrap items-start justify-start gap-2 overflow-scroll">
          {product?.assets.map((item, index) => {
            return (
              <div
                key={item}
                className={cn("relative h-80 w-72 overflow-hidden", {
                  "rounded-tr-xl": index == 1,
                })}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={item}
                  alt={`flowerbox product picture`}
                  placeholder="blur"
                  blurDataURL="/placeholderProduct.jpg"
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Separator className="mt-10 w-full border-t-[1px] border-gray-300" /> */}
      <div className="mt-10 flex gap-2">
        <div className="flex-1">
          <div className="pb-10">
            <p className="text-subtle">{product?.description}</p>
          </div>
          <Separator className="w-full border-t-[1px] border-gray-300" />
          <div className="flex items-center space-x-10 py-4">
            <CircleDollarSign />
            <p className="flex flex-col">
              <span className="text-lg">${product?.price}</span>
              <span className="text-sm text-subtle">
                Getting you the lowest price possible...
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-10 py-4">
            <QrCode />
            <p className="flex flex-col">
              <span className="text-lg">PDHD939D99</span>
              <span className="text-sm text-subtle">Product ID.</span>
            </p>
          </div>
          <Separator className="w-full border-t-[1px] border-gray-300" />
          <div className="my-4 space-x-2">
            <h1 className="mb-6 flex space-x-2">
              <Boxes />
              <span>Tags</span>
            </h1>
            <div className="flex flex-wrap gap-2">
              {product?.categories?.map((item) => {
                return <Tag key={item}>{item}</Tag>;
              })}
            </div>
          </div>
          <div className="my-4 space-x-2">
            <h1 className="mb-6 flex space-x-2">
              <TagIcon />
              <span>Tags</span>
            </h1>
            <div className="flex flex-wrap gap-2">
              {product?.tags?.map((item) => {
                return <Tag key={item}>{item}</Tag>;
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 px-10">
          <Button
            onClick={() =>
              setCartItem({
                productId: product?.id,
                price: product?.price,
                img: product?.assets[0],
                name: product?.name,
                quantity: 0,
              })
            }
            variant="outline"
            className="w-full py-6 hover:bg-primary-hover"
          >
            <ShoppingCart className="mr-2" />
            Add to Cart.
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
