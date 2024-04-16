"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

export default function OrdersPage({}: Props) {
  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <PageTitle title="Orders" />
      <Tabs defaultValue="Pending" className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="Pending">Pending</TabsTrigger>
          <TabsTrigger value="Delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="Pending" className="border-2">
         
        </TabsContent>
        <TabsContent value="Delivered">
         
        </TabsContent>
      </Tabs>
    </div>
  );
}
