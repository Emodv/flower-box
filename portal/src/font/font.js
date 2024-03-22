import { Inter, Playfair_Display, Lora } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--playfair",
  display: "swap",
});
export const lora = Lora({
  subsets: ["latin"],
  weight:["400"],
  variable: "--lora",
  display: "swap",
});
