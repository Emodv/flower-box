import * as z from "zod";

export const addProductSchema = z.object({
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
  productImages: z.any()
  // productImages: z
  //   .array(z.instanceof(File), {
  //     required_error: "Please upload at least one product image.",
  //   })
  //   .nonempty({
  //     message: "Please upload at least one product image.",
  //   }),
});