import PageTitle from "@/components/PageTitle";
import { ProductForm } from "@/components/custom/forms/productForm";
import React from "react";

type Props = {};

function AddProduct({}: Props) {
  return (
    <div className="flex flex-col">
      <PageTitle title="Add Product" />
      <ProductForm></ProductForm>
    </div>
  );
}

export default AddProduct;
