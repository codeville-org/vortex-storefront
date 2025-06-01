"use client";

import { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "@/modules/account/components/register-form";
import { LoginForm } from "@/modules/account/components/login-form";

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register"
}

const LoginTemplate = () => {
  const { theme } = useTheme();
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(
    LOGIN_VIEW.SIGN_IN
  );

  return (
    <div className={cn("w-full my-14 flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0 w-full min-w-4xl shadow-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          {currentView === "sign-in" ? (
            <LoginForm setCurrentView={setCurrentView} />
          ) : (
            <RegisterForm setCurrentView={setCurrentView} />
          )}

          <div className="bg-muted relative hidden md:block">
            {theme === "light" ? (
              <Image
                src="/assets/auth-bg-light.jpg"
                alt="Image"
                width={600}
                height={800}
                className="absolute inset-0 h-full w-full object-cover brightness-[0.8]"
              />
            ) : (
              <Image
                src="/assets/auth-bg-dark.jpg"
                alt="Image"
                width={600}
                height={800}
                className="absolute inset-0 h-full w-full object-cover brightness-[0.7]"
              />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginTemplate;
