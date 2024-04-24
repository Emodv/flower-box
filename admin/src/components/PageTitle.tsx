/** @format */

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return (
    <div className="flex items-center mb-4">
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
    </div>
  );
}
