import { montserrat } from "@/font/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  assets: string[];
  price: number;
  name: string;
  discount?: boolean;
  placeholder?: boolean;
  id: number;
};

function ProductCards({
  assets,
  price,
  name,
  discount = false,
  placeholder = false,
  id,
}: Props) {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer"
      onClick={() => router.push(`/category/${id}`)}
    >
      <div className="relative h-80 overflow-hidden rounded-xl">
        <Image
          className="h-full"
          src={assets[0]}
          layout="fill"
          objectFit="cover"
          alt={`Image of ${name}`}
          placeholder="blur"
          blurDataURL="/placeholderProduct.jpg"
        />
      </div>
      <div className="mt-4 flex flex-col items-center">
        <h4
          className={cn(
            montserrat.className,
            "w-56 overflow-hidden overflow-ellipsis whitespace-nowrap text-center uppercase",
          )}
        >
          {name}
        </h4>
        {!placeholder && (
          <p className="mt-2 flex items-center gap-3 text-lg font-normal">
            $ {Math.floor(price)}{" "}
            {discount && (
              <span className="text-xs text-primary-subtle line-through">
                ${Math.floor(price * 1.3)}.00
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductCards;
