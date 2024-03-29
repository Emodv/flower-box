import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
};

function Offer(props: Props) {
  return (
    <div >
      <Image {...props} layout="fill" objectFit="cover"></Image>
    </div>
  );
}

export default Offer;
