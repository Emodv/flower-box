import { routes } from "@/types/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { Button } from "../ui/button";
import { playfair } from "@/font/font";
import { cn } from "@/lib/utils";

type Props = {};
const links = [
  {
    title: "Why?",
    href: routes.dashboard,
    // icon: LayoutDashboard,
    variant: "default",
  },
  {
    title: "Features",
    href: routes.add_product,
    // icon: PlusCircle,
    variant: "ghost",
  },
  {
    title: "Company",
    href: routes.all_products,
    // icon: List,
    variant: "ghost",
  },
];

function Navbar({}: Props) {
  return (
    <div className="container flex items-center justify-between pt-10">
      <div className="flex space-x-10">
        <div className="logo">
          <Image src="/logo.png" height={60} width={140} alt="flowerbox" />
        </div>
        <nav>
          <ul className="mt-2 flex h-full items-center space-x-4 font-light">
            {links.map((link) => {
              return (
                <li key={link.href}>
                  <Link href={link.href}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="space-x-4">
        {/* <Button variant="ghost" className="font-extralight text-md">Sign in </Button> */}
        <Link
          href="/category"
          className={cn(
            playfair.className,
            "shadow-full rounded-lg bg-primary-subtle px-6 py-4 text-base text-white",
          )}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
