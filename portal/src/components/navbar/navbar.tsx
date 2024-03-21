import { routes } from "@/types/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

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
    <div className="container flex items-center justify-between pt-4">
      <div className="flex space-x-10">
        <div className="logo">
          <Image src="/logo.png" height={60} width={140} alt="flowerbox" />
        </div>
        <nav>
          <ul className="flex items-center h-full space-x-4 font-extralight">
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
        <Button variant="ghost" className="font-extralight text-lg">Sign in </Button>
        <Button className="bg-[#FFB6C1] shadow-md shadow-[#FFB6C1] rounded-lg">Get Started</Button>
      </div>
    </div>
  );
}

export default Navbar;
