import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cn } from "../lib/utils";
import type { Metadata } from "next";
import { inter} from "@/font/font";

import { ThemeProvider } from "@/lib/theme-provider";
import QueryProvider from "@/lib/react-query-provider";

import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Flower Box",
  description: "Flower Box",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // enableSystem
            disableTransitionOnChange
          >
            <div>
              {children}
            </div>
          </ThemeProvider>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
