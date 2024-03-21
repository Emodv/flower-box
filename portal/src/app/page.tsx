import Image from "next/image";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div className="container mt-10 flex">
      <div className="text">
        <h2 className="text-[60px]">
          Send <span className="text-[#FFB6C1]">flowers</span> like <br />
          you mean it.
        </h2>
        <p className="text-lg">
          Where flowers are our inspiration to create lasting memories. Whatever
          the occasion, our flowers will make it special cursus a sit amet
          mauris.
        </p>
        <Image
          src="/signature.png"
          height={100}
          width={200}
          alt="signature"
        ></Image>
      </div>
      <div className="image">
        <Image
          src="/homepage-flowers.jpg  "
          height={600}
          width={600}
          alt="signature"
        ></Image>
      </div>
    </div>
  );
}

export default Page;
