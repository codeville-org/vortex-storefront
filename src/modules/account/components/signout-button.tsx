"use client";

import React from "react";
import { LogOutIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signoutAction } from "../actions/signout.action";
import { toast } from "sonner";

type Props = {
  className?: string;
};

export function SignoutButton({ className }: Props) {
  const { executeAsync, isExecuting } = useAction(signoutAction);

  async function handleSignOut() {
    const result = await executeAsync();

    if (result?.serverError) {
      toast.error(result.serverError);
      return;
    }
  }

  return (
    <Button
      className={cn(`text-white`, className)}
      icon={<LogOutIcon />}
      onClick={handleSignOut}
      disabled={isExecuting}
      loading={isExecuting}
      variant={"destructive"}
    >
      Sign Out
    </Button>
  );
}
