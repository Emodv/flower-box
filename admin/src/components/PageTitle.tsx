/** @format */

import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  className?: string;
};

export default function PageTitle({ title, className }: Props) {
  return <h1 className={cn("ml-10 text-2xl font-semibold text-primary", className)}>{title}</h1>;
}
