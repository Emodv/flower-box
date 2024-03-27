"use client";

import { playfair } from "@/font/font";
import { cn } from "@/lib/utils";
import { Flower, Flower2, Flower2Icon } from "lucide-react";
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
  return (
    <div>
      <div className="container flex justify-between py-6">
        {/* <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="flowerbox"
          ></Image> */}
        <Link href="/" className="logo flex items-center gap-2 text-primary">
          <Flower size={36}></Flower>
          <h1 className={cn(playfair.className, "text-2xl tracking-widest")}>
            FlowerBox
          </h1>
        </Link>
        <div className="tagline">From Our Garden to Your Heart.</div>
      </div>
      {/* <RecoilRoot> */}
        {children}
      {/* </RecoilRoot> */}
    </div>
  );
}
