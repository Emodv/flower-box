/** @format */

"use client";

import Link from "next/link";
import {
  CircleUser,
  Flower,
  LogOutIcon,
  Menu,
  Moon,
  SunMoon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/usePagination";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CustomAxiosError } from "@/services/api";
import { logoutHandler } from "@/services/adminService";
import { useToast } from "./use-toast";

type Props = {
  children: React.ReactNode;
  links: {
    title: string;
    href: string;
    icon: any;
  }[];
};

export function Navbar({ children, links }: Props) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isActive = theme === "light";

  const pathName = usePathname();

  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: logoutHandler,
    onSuccess: (response) => {
      toast({
        title: "logout Successful",
        variant: "sucess",
      });
      router.push("/sign-in");
    },
    onError: (error: CustomAxiosError) => {
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Flower />
              <span className="">Flower Box</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {links.map((item) => {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "my-1 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      {
                        "bg-muted text-primary": item.href == pathName,
                      },
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {links.map((item) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  mutation.mutate();
                }}
              >
                <LogOutIcon className="mr-2" size={18} />
                <span>Logout</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {" "}
                <>
                  {isActive ? (
                    <span className="flex cursor-pointer items-center">
                      <Moon className="mr-2" size={18} />
                      Dark
                    </span>
                  ) : (
                    <span className="flex cursor-pointer items-center">
                      <SunMoon className="mr-2" size={18} />
                      Light
                    </span>
                  )}
                </>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
