import Image from "next/image";
import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { playfair } from "@/font/font";
import { cn } from "@/lib/utils";

type Props = {};

function JoinUs({}: Props) {
  return (
    <div className="py-14">
      <div className="relative h-[600px] overflow-hidden">
        <div className="container relative z-10 flex h-full flex-col items-center justify-center">
          <h1
            className={cn(
              playfair.className,
              "text-3xl font-semibold tracking-widest text-white ",
            )}
          >
            Join the Colorful bunch!
          </h1>
          <div className="mt-6 flex">
            <Input
              className="text-gray-600 h-full w-48 md:w-96 rounded-none rounded-l-2xl text-xs tracking-wider outline-none placeholder:text-gray-400"
              placeholder="Email Address"
            ></Input>
            <Button className="rounded-none rounded-r-2xl bg-primary-subtle px-8 py-7 text-xs font-light uppercase tracking-widest">
              subscribe
            </Button>
          </div>
        </div>
        <Image
          src="/section.png"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt={`Image of flowerbox join us section`}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default JoinUs;
