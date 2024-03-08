"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { MinusCircle, Trash } from "lucide-react";
// import { addProductSchema } from "@/schema/zod";

// keeping this schema interface in 'use client' because of the web api File type"
const addProductSchema = z.object({
  productName: z
    .string({ required_error: "Product Name is required." })
    .min(2, {
      message: "Product Name must contain atleast 2 charactters",
    }),
  productId: z
    .string({ required_error: "Product ID Name is required." })
    .min(2, {
      message: "Product ID must contain atleast 2 charactters",
    }),
  description: z
    .string({
      required_error: "Description is required.",
    })
    .min(30, { message: "Description must be at least 30 characters." }),
  price: z.string({
    required_error: "Price is required.",
  }),
  productImages: z
    .array(z.instanceof(File), {
      required_error: "Please upload at least one product image.",
    })
    .nonempty({
      message: "Please upload at least one product image.",
    }),
});

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
    //@ts-ignore
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
                  <MinusCircle
                    color="red"
                    size={24}
                    className="cursor-pointer rounded-lg hover:bg-gray-100"
                    onClick={() => deleteAsset(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-10">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-md font-normal text-black">
                  Product ID
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2"
                    placeholder="Product Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="flex-1 mt-6 md:mt-0">
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
                <FormMessage className="mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1 mt-6 md:mt-0">
                <FormLabel className="text-md font-normal text-black">
                  Price
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
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
