import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

function ProductSkeleton({}: Props) {
  return (
    <div className="py-10">
      <div className="w-1/2">
      <Skeleton className="bg-gray-200 h-[25px] w-full rounded-xl " />
      </div>
      <div className="images flex gap-4 mt-6 flex-col md:flex-row">
        <div className="md:flex-1 h-[290px] lg:h-auto">
          <Skeleton className="w-full h-full rounded-xl bg-gray-200" />
        </div>
        <div className="flex-1 lg:flex flex-wrap gap-2 hidden">
          <Skeleton className="h-[290px] w-[290px] rounded-xl bg-gray-200" />
          <Skeleton className="h-[290px] w-[290px] rounded-xl bg-gray-200" />
          <Skeleton className="h-[290px] w-[290px] rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
