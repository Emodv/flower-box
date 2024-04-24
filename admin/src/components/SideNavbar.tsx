/** @format */
"use client";

import { Navbar } from "./ui/nav";

type Props = { children: React.ReactNode };

import { ShoppingCart, PlusCircle, List, DollarSign } from "lucide-react";
import { routes } from "@/types/routes";

export default function SideNavbar({ children }: Props) {
  return (
    <div>
      <Navbar
      links={[
        // {
        //   title: "Dashboard",
        //   href: routes.dashboard,
        //   icon: LayoutDashboard,
        //   variant: "default",
        // },
        {
          title: "Add Product",
          href: routes.add_product,
          icon: <PlusCircle className="h-5 w-5" />,
        },
        {
          title: "All Products",
          href: routes.all_products,
          icon: <List className="h-5 w-5" />,
        },
        // {
        //   title: "Users",
        //   href: routes.users,
        //   icon: UsersRound,
        //   variant: "ghost",
        // },
        {
          title: "Orders",
          href: routes.orders,
          icon: <ShoppingCart className="h-5 w-5" />,
        },
        {
          title: "Transactions",
          href: routes.transactions,
          icon: <DollarSign className="h-5 w-5" />,
        },
        // {
        //   title: "Settings",
        //   href: routes.settings,
        //   icon: Settings,
        //   variant: "ghost",
        // },
      ]}
      >
        {children}
      </Navbar>
    </div>
  );
}
