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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PageTitle from "@/components/PageTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/services";
import { ProductTypes } from "@/types/types";
import Image from "next/image";
import Tag from "@/components/custom/tags/tags";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { deleteProductById } from "@/services/adminService";
import { CustomAxiosError } from "@/services/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

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

  const [formLoading, setFormLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: deleteProductById,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: "Product deleted.",
        variant: "sucess",
      });
      router.push("/dashboard/all-products?page=1");
    },
    onError: (error: CustomAxiosError) => {
      setFormLoading(false);
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Could not load Products....</div>;

  const product = data?.data.data;

  return (
    <div>
      <PageTitle title="Product details" />

      <div className="container mt-20 flex-col xl:flex-row flex space-x-0 xl:space-x-20">
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
                        className="h-full w-full object-cover"
                        alt={`Image of ${product.name}`}
                        placeholder="blur"
                        blurDataURL="/placeholderProduct.jpg"
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
        <div className="data divide-y-2">
          <div className="flex justify-between py-4 text-2xl font-semibold">
            <span>{product?.name}</span>
            <span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this product?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4"></div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={() => {
                        if (!product?.id) {
                          return;
                        }
                        mutation.mutate({
                          productId: product?.id,
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </span>
          </div>
          <div className="py-4">{product?.description}</div>
          <div className="flex justify-between py-4">
            <span>${product?.price}</span>
            <span>{formatDate(product?.createdAt || "")}</span>
          </div>
          <div className="space-y-4 py-4">
            <h2 className="font-semibold">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {product?.categories?.map((item) => {
                return <Tag key={item}>{item}</Tag>;
              })}
            </div>
          </div>
          <div className="space-y-4 py-4">
            <h2 className="font-semibold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {product?.tags?.map((item) => {
                return <Tag key={item}>{item}</Tag>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
