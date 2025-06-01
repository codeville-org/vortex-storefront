import { CONSTANTS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <h1
      className={cn(
        "text-base font-heading font-black text-foreground uppercase flex items-center gap-1",
        className
      )}
    >
      {CONSTANTS.appName}
    </h1>
  );
}
