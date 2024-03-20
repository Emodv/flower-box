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
  productImages: z.any(),
  //   productImages: z
  //     .array(z.instanceof(File), {
  //       required_error: "Please upload at least one product image.",
  //     })
  //     .nonempty({
  //       message: "Please upload at least one product image.",
  //     }),
});

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, { message: "Password must be at least 6 characters" }),
});
