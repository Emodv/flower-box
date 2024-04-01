import { z } from "zod";

export const signUpLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email format." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." }),
});

export const uploadProductSchema = z.object({
  productName: z.string({ required_error: "Product name is required." }),
  description: z.string({ required_error: "Description is required." }),
  productId: z.string({ required_error: "productId is required." }),
  price: z
    .string({ required_error: "Price is required." })
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format."),
  categories: z.string({ required_error: "Categories are required." }),
  tags: z.string({ required_error: "Tags are required." }),
});
