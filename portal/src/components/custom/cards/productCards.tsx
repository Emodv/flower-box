import { montserrat } from "@/font/font";
import { cn } from "@/lib/utils";
import { Category, TagsEnum } from "@/types/productTypes";
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
  categories?: Category[];
  tags?: TagsEnum[];
};

function ProductCards({
  assets,
  price,
  name,
  discount = false,
  placeholder = false,
  id,
  categories,
  tags,
}: Props) {
  const router = useRouter();
  const categoryParams = categories?.join("+");
  const tagsParams = tags?.join("+");

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        const query = `?category=${categoryParams}&tags=${tagsParams}`;
        router.push(`/category/${id}${query}`);
      }}
    >
      <div className="relative h-80 overflow-hidden rounded-xl">
        <Image
          className="h-full"
          src={assets[0]}
        // src={"/placeholderProduct.jpg"}
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
            "w-56 overflow-hidden overflow-ellipsis whitespace-nowrap text-center uppercase text-sm",
          )}
        >
          {name}
        </h4>
        {!placeholder && (
          <p className="mt-2 flex items-center gap-3 text-md font-normal">
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
