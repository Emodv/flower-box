import React from "react";
import Image from "next/image";
import { playfair, lora } from "@/font/font";
import { cn } from "@/lib/utils";

type Props = {};

function Header({}: Props) {
  return (
    <div className="my-14 bg-[#F3F3F3]  pt-10">
      <div className="container flex  flex-col md:flex-row">
        <div className="text flex-1 pt-8">
          <h2 className={cn(playfair.className, "text-4xl md:text-[60px] md:leading-[70px]")}>
            Send <span className="text-[#FFB6C1]">flowers</span> like <br />
            you mean it.
          </h2>
          <p
            className={cn(lora.className, "mt-8 text-lg leading-8 text-subtle")}
          >
            Where flowers are our inspiration to create lasting memories. <br />{" "}
            Whatever the occasion, our flowers will make it special cursus{" "}
            <br /> a sit amet mauris.
          </p>
          <Image
            className="mt-10"
            src="/signature.png"
            height={100}
            width={200}
            alt="signature"
          ></Image>
        </div>
        <div className="image mt-10 flex flex-1 justify-end">
          <Image
            src="/homepage-flowers2.png"
            height={600}
            width={600}
            alt="signature"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Header;
