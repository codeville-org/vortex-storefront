"use client";

import { CONSTANTS } from "@/lib/constants";
import {
  MailIcon,
  MapPinIcon,
  MoonIcon,
  PhoneIcon,
  SunIcon,
  TruckIcon
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export function TopBar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-8 w-full mx-auto bg-primary dark:bg-muted text-primary-foreground dark:text-muted-foreground">
      <nav className="h-full content-container mx-auto flex items-center justify-between">
        {/* Left Content */}
        <div className="space-x-8 flex items-center">
          <div className="flex items-center gap-2">
            <PhoneIcon className="size-3" />
            <span className="text-xs">Call us: {CONSTANTS.contact.mobile}</span>
          </div>

          <div className="flex items-center gap-2">
            <MailIcon className="size-3" />
            <span className="text-xs">{CONSTANTS.contact.email}</span>
          </div>
        </div>

        {/* Left Content */}
        <div className="space-x-8 flex items-center">
          <div className="flex items-center gap-2">
            <MapPinIcon className="size-3" />
            <Link href={"/about"} className="text-xs hover:underline">
              Store Locations
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <TruckIcon className="size-3" />
            <Link href={"/track"} className="text-xs hover:underline">
              Track your Order
            </Link>
          </div>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="cursor-pointer"
          >
            {theme === "light" ? (
              <MoonIcon className="size-4" />
            ) : theme === "dark" ? (
              <SunIcon className="size-4" />
            ) : (
              <></>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
