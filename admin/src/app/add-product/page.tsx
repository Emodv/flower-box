'use client';

import PageTitle from "@/components/PageTitle";
import { ProductForm } from "@/components/forms/productForm";
import React from "react";

type Props = {};

function AddProduct({}: Props) {
  return (
    <div className="flex flex-col">
      <PageTitle title="Add Product" />
      <div className="my-10">
        <ProductForm></ProductForm>
      </div>
    </div>
  );
}

export default AddProduct;
