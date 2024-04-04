"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import PageTitle from "@/components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/services";
import { ProductTypes } from "@/types/types";
import Image from "next/image";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

interface singleProduct {
  data: {
    data: ProductTypes.Product;
  };
}

type Props = {
  params: { id: string };
};


function ProductDetail({ params }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { data, isLoading, isError, error } = useQuery<singleProduct>({
    queryKey: ["product"],
    queryFn: () => fetchProduct({ productId: params.id }),
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Could not load Products....</div>;

  const product = data?.data.data;

  return (
    <div>
      <PageTitle title="Product details" />

      <div className="container mt-20 flex space-x-20">
        <div className="carousal">
          <Carousel setApi={setApi} className="w-[600px]">
            <CarouselContent>
              {product?.assets?.map((_, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={_}
                        width={100}
                        height={100}
                        alt={`preview`}
                        className="h-full w-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="py-2 text-center text-sm text-muted-foreground">
            Slide {current} of {count}
          </div>
        </div>
        <div className="table w-full">
          <DataTable columns={columns as any} data={[product]} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

const columns: ColumnDef<ProductTypes.Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
];
