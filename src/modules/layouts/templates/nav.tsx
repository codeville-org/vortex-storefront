import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ShoppingCartIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Navbar() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-background">
        <nav className="content-container flex items-center justify-around h-full">
          {/* Logo */}
          <Link href="/">
            <Logo className="text-2xl" />
          </Link>

          {/* Search */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center relative w-full max-w-md">
              <Input
                value={""}
                placeholder="Search products..."
                className="w-full  px-2 py-3 border-none bg-secondary"
              />

              <SearchIcon className="absolute right-4 text-foreground/60 size-4" />
            </div>
          </div>

          {/* User / Actions */}
          <div className="space-x-4">
            <Button size={"icon"} variant={"outline"} asChild>
              <Link href={"/cart"}>
                <ShoppingCartIcon />
              </Link>
            </Button>
            <Button asChild variant={"default"}>
              <Link href={"/account"} className="space-x-3">
                <UserCircleIcon />
                My Account
              </Link>
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
}
