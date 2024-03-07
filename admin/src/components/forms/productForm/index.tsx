"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Trash } from "lucide-react";
import { addProductSchema } from "@/schema/zod";

type FormSchemaType = z.infer<typeof addProductSchema>;

export function ProductForm() {
  const [signUpDisabled, setSignUpDisabled] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(addProductSchema),
    shouldFocusError: true,
  });

  const { control, watch } = form;

  const uploadedImages = watch("productImages");

  const onSubmit = async (values: FormSchemaType) => {
    setSignUpDisabled(true);
    console.log(values);
    setSignUpDisabled(false);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    const imageFiles = newFiles.filter(
      (file) =>
        file.type.startsWith("image/") && !file.type.startsWith("image/heic"),
    );

    const allFiles = [...(uploadedImages || []), ...imageFiles];
    form.setValue("productImages", allFiles as [File, ...File[]]);
    event.target.value = "";
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files) {
        const newFiles = Array.from(event.dataTransfer.files);
        const allFiles = [...(uploadedImages || []), ...newFiles];
        form.setValue("productImages", allFiles as [File, ...File[]]);
      }
    },
    [uploadedImages, form],
  );

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const deleteAsset = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => index !== i);
    form.setValue("productImages", newImages as [File, ...File[]], {
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="productImages"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-black">
                Product Images
              </FormLabel>
              <div
                onDragOver={onDragOver}
                onDrop={onDrop}
                className="cursor-pointer rounded-md border-2 border-dashed border-gray-300 px-6 py-10 text-center"
              >
                <p>Drag & Drop to Upload File</p>
                <p>OR</p>
                <label
                  htmlFor="file-upload"
                  className="mt-2 inline-block cursor-pointer rounded-sm bg-primary px-4 py-2 text-white"
                >
                  Browse File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={onFileChange}
                />
              </div>
              <FormMessage className="mt-2" />
            </FormItem>
          )}
        />
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="mt-4 flex flex-wrap">
            {uploadedImages?.map((file: File, index: number) => (
              <div className="flex flex-col items-center" key={index}>
                <div className="mb-2 mr-2 h-20 w-20 overflow-hidden rounded">
                  <Image
                    src={URL.createObjectURL(file)}
                    width={100}
                    height={100}
                    alt={`preview ${index}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <Trash
                    color="red"
                    size={24}
                    className="cursor-pointer"
                    onClick={() => deleteAsset(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full sm:flex-col sm:space-x-0 md:flex-row md:space-x-10">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-md font-normal text-black">
                  Product Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2"
                    placeholder="Product Name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is will be your Product Name
                </FormDescription>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1 sm:mt-6 md:mt-0">
                <FormLabel className="text-md font-normal text-black">
                  Price
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormDescription>Add a price for your product.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-black">
                Description
              </FormLabel>
              <FormControl>
                <Input placeholder="Product Description" {...field} />
              </FormControl>
              <FormDescription>
                Add a description for your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
