"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { playfair } from "@/font/font";
import { cn } from "@/lib/utils";
import useStore from "@/state/store";
import { Flower, Flower2, Flower2Icon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// import {
// RecoilRoot,
// atom,
// selector,
// useRecoilState,
// useRecoilValue,
// } from "recoil";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cartItems = useStore((state) => state.cartItems);
  return (
    <div>
      <div className="container ">
        <div className="flex w-full justify-between py-6">
          <Link href="/" className="logo flex items-center gap-2 text-primary">
            <Flower size={36}></Flower>
            <h1 className={cn(playfair.className, "text-2xl tracking-widest")}>
              FlowerBox
            </h1>
          </Link>
          <div className="tagline flex items-center justify-center gap-4">
            From Our Garden to Your Heart.
            <Link
              href="/category/cart"
              className="relative flex items-center justify-center gap-2 rounded-sm border-2 px-2 py-[4px]"
            >
              <ShoppingCartIcon size={16}></ShoppingCartIcon>
              <span>cart</span>
              {cartItems.length > 0 && (
                <span className="badge absolute right-[-15px] top-[-15px] flex h-5 items-center justify-center rounded-full bg-primary text-xs text-white min-w-8 shadow-md">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      {/* <RecoilRoot> */}
      {children}
      {/* </RecoilRoot> */}
    </div>
  );
}
