"use client";

import React, { useState } from "react";
import useStore, { cartQuantityUpdate } from "@/state/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { CustomAxiosError } from "@/services/axiosApi";
import { checkoutHandler } from "@/services/productService/productService";

type Props = {};

const signInFormSchema = z.object({
  address: z.string({ required_error: "Address is required." }).min(20,{message:"Write a more descriptive address"}),
});

function Page({}: Props) {
  const router = useRouter();

  const { toast } = useToast();
  const [formLoading, setFormLoading] = useState(false);

  const { cartItems, updateCartItemQuantity, removeCartItem } = useStore(
    (state) => state,
  );
  console.log(cartItems, "cartItem");

  const mutation = useMutation({
    mutationFn: checkoutHandler,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: "Log in Sucess",
        variant: "sucess",
      });
      router.push("/dashboard");
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

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      address:
        "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    setFormLoading(true);
    // mutation.mutate({
    //   address: values.address,
    // });
  };

  return (
    <div className="container flex gap-4 py-20">
      <div className="flex-1 space-y-4">
        {cartItems?.map((item, index) => {
          return (
            <div
              key={item.productId}
              className={cn(
                "flex h-24 items-center justify-between border-t-2 border-gray-100 px-4",
                {
                  "border-b-2": index + 1 === cartItems.length,
                },
              )}
            >
              <Image
                src={item.img}
                width={50}
                height={50}
                alt="cartItem"
              ></Image>
              <h4 className="w-56 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm uppercase">
                {item.name}
              </h4>
              <div className="flex items-center justify-center">
                <Button
                  variant="ghost"
                  className="text-subtle"
                  onClick={() =>
                    updateCartItemQuantity({
                      action: cartQuantityUpdate.subtract,
                      id: item.productId,
                    })
                  }
                >
                  <Minus size={16} />
                </Button>
                <div className="flex w-10 items-center justify-center rounded-lg border-2 ">
                  {item.quantity}
                </div>
                <Button
                  variant="ghost"
                  className="text-subtle"
                  onClick={() =>
                    updateCartItemQuantity({
                      action: cartQuantityUpdate.add,
                      id: item.productId,
                    })
                  }
                >
                  <Plus size={16} />
                </Button>
              </div>
              <div className="w-10">${item.price}</div>
              <Button
                variant="ghost"
                className="text-subtle"
                onClick={() => removeCartItem(item.productId)}
              >
                <X size={16} />
              </Button>
            </div>
          );
        })}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-normal text-black">
                      Your Shipping Address.
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="address"
                        {...field}
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-end gap-2 sticky top-20">
        <div>
          <div className="w-96 rounded-t bg-gray-100 p-10">
            <h1 className="text-2xl font-semibold">Summary</h1>
            <div className="mt-10 space-y-10">
              <div className="flex items-center justify-between">
                <p className="text-subtle">Order Total</p>
                <p className="text-subtle">$231,00</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-subtle">Promo Code</p>
                <p className="text-subtle">$2.010,00</p>
              </div>
              {/* <div className="flex items-center justify-between">
                <p className="text-subtle">Shipping</p>
                <p className="text-subtle">$219.00</p>
              </div> */}
              <div className="items-center justify-between">
                <p className="text-subtle">Address</p>
                <p className="text-subtle">{form.getValues("address")}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-gray-100">
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
            <div className="h-4 w-4 rounded-full bg-white"></div>
          </div>
          <div className="flex w-96 items-center justify-between rounded-b bg-gray-100 px-10 py-6">
            <p className="text-subtle">Subtotal</p>
            <p className="text-xl font-semibold">$2.010,00</p>
          </div>
        </div>
        <Button className="bg-primary uppercase mt-2 rounded-none " type="submit" disabled={formLoading}>
          {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          checkout items
        </Button>
      </div>
    </div>
  );
}

export default Page;
