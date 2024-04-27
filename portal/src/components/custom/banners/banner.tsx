import Image from "next/image";
import React from "react";
// import Title from "../title/title";
import { Button } from "../../ui/button";

type Props = {};

function Banner({}: Props) {
  return (
    <div className="container relative py-14">
      {/* <Title>Shop now</Title> */}
      <div className="relative h-96 overflow-hidden rounded-2xl">
        <div className="z-10 absolute h-full  ml-4 md:ml-32 flex flex-col justify-center">
          <p className="text-gray-200 text-lg">Deal of the day</p>
          <h1 className="capitalize mt-4 text-xl md:text-5xl leading-[60px]">Shop your Flower best Offer - $12</h1>
          <Button className="mt-4 w-44 rounded-[40px] py-7 px-8 bg-primary">Shop Now</Button>
        </div>
        <Image
          src="/bg1.jpg"
          layout="fill"
          objectFit="cover"
          alt={`Image of flowerbox banner`}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Banner;
