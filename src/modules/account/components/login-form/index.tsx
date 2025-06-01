"use client";

import React, { Dispatch, SetStateAction, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { LOGIN_VIEW } from "@/modules/account/templates/login-template";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { SocialLogins } from "../social-logins";
import {
  loginSchema,
  type LoginSchema
} from "@/modules/account/schemas/login.schema";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginAction } from "../../actions/login.action";

type Props = {
  setCurrentView: Dispatch<SetStateAction<LOGIN_VIEW>>;
};

export function LoginForm({ setCurrentView }: Props) {
  const toastId = useId();
  const { executeAsync, isExecuting } = useAction(loginAction);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginSchema) {
    toast.success("Logging in...", { id: toastId });

    const result = await executeAsync(values);

    if (result?.serverError) {
      toast.error(result.serverError, { id: toastId });
      return;
    }

    if (result?.data) {
      toast.success(result.data.message, { id: toastId });
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 md:p-8 space-y-4"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-2xl font-bold font-heading tracking-tighter">
            Welcome Back !
          </h1>
          <p className="text-muted-foreground text-balance">
            Login to your Vortex account
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  disabled={isExecuting}
                  placeholder="***********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isExecuting}
          type="submit"
          loading={isExecuting}
          className="w-full"
        >
          Login
        </Button>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <SocialLogins />

        <div className="text-center text-sm">
          {`Don't have an account? `}
          <Button
            variant={"link"}
            className="underline underline-offset-4"
            onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
}
