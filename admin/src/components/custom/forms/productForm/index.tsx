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
import { Loader2, MinusCircle, Trash } from "lucide-react";
import { addProductSchema } from "@/schema/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { uploadProduct } from "@/services";
import { useRouter } from "next/navigation";

import { categories, tags } from "@/store/data.json";
import TagInput from "@/components/ui/tags";
import { routes } from "@/types/routes";

type FormSchemaType = z.infer<typeof addProductSchema>;

export function ProductForm() {
  const [isFormLoading, setFormLoading] = useState(false);
  const [tag, setTags] = useState<string[]>([]);
  const [category, setCategories] = useState<string[]>([]);
  const [tagCategoryError, setTagCategoryError] = useState({
    tags: "",
    categories: "",
  });
  const { toast } = useToast();

  const router = useRouter();
  // const pathname = usePathname();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(addProductSchema),
    shouldFocusError: true,
    defaultValues: {
      // description:
      //   "Generate Lorem Ipsum placeholder text for use in your graphic, print and web layouts, and discover plugins for your favorite writing, design and blogging tools. Explore the origins, history and meaning of the famous passage, and learn how Lorem Ipsum went from scrambled Latin passage to ubiqitous",
      // price: "99.99",
      // productId: "ID233H4I",
      // productName: "Flower's for valentine...",
    },
  });
  const { control, watch } = form;
  const uploadedImages = watch("productImages");

  // mutation ---
  const mutation = useMutation({
    mutationFn: uploadProduct,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: "Created!",
        description: "New Product Added.",
        variant: "sucess",
      });
      router.replace(routes.all_products);
    },
    onError: (error: any) => {
      console.log(error, "errors");
      toast({
        title: "Error",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
      setFormLoading(false);
    },
  });

  // submit handler ---
  const onSubmit = async (values: FormSchemaType) => {
    let hasError = false;
    const newTagCategoryError = {
      tags: "",
      categories: "",
    };

    if (!values.productImages?.length) {
      form.setError("productImages", {
        message: "Please upload at least one product image.",
      });
      hasError = true;
    }

    if (!tag.length) {
      newTagCategoryError.tags = "Tags is required.";
      hasError = true;
    }

    if (!category.length) {
      newTagCategoryError.categories = "Categories is required.";
      hasError = true;
    }

    setTagCategoryError(newTagCategoryError);

    if (hasError) {
      return;
    }

    setFormLoading(true);
    mutation.mutate({
      ...values,
      categories: category,
      tags: tag,
    });
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

  const deleteAsset = (index: number) => {
    // @ts-ignore
    const newImages = uploadedImages.filter((_, i) => index !== i);
    form.setValue("productImages", newImages as [File, ...File[]], {
      shouldValidate: true,
    });
  };

  const handleTagsChange = useCallback((tags: string[]) => {
    setTags(tags);
  }, []);

  const handleCategoriesChange = useCallback((categories: string[]) => {
    setCategories(categories);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          name="productImages"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-black dark:text-white">
                Product Images
              </FormLabel>
              <div
                onDragOver={(event) => event.preventDefault()}
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
              <FormMessage className="mt-2 dark:text-red-800" />
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
                <FormLabel className="text-md font-normal text-black dark:text-white">
                  Product ID
                </FormLabel>
                <FormControl>
                  <Input className="mt-2" placeholder="ID" {...field} />
                </FormControl>
                <FormMessage className="mt-2 dark:text-red-800" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="mt-6 flex-1 md:mt-0">
                <FormLabel className="text-md font-normal text-black dark:text-white">
                  Product Name
                </FormLabel>
                <FormControl>
                  <Input className="mt-2" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage className="mt-2 dark:text-red-800" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="mt-6 flex-1 md:mt-0">
                <FormLabel className="text-md font-normal text-black dark:text-white">
                  Product Price
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-800" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col mt-10 max-w-vw">
          <TagInput
            hasError={tagCategoryError.categories}
            label="Categories"
            predefinedTags={categories}
            onChange={handleCategoriesChange}
          />
          <TagInput
            hasError={tagCategoryError.tags}
            label="Tags"
            predefinedTags={tags}
            onChange={handleTagsChange}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-black dark:text-white">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Product Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Add a description for your product.
              </FormDescription>
              <FormMessage className="dark:text-red-800" />
            </FormItem>
          )}
        />
        {/* <div className="flex justify-"> */}

        <Button type="submit" disabled={isFormLoading} className="mt-4 w-52">
          {isFormLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
        {/* </div> */}
      </form>
    </Form>
  );
}
