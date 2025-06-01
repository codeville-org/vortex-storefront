import React from "react";

import { Footer } from "@/modules/layouts/templates/footer";
import { Navbar } from "@/modules/layouts/templates/nav";
import { TopBar } from "./top-bar";

export const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Navbar />
      <main className="relative bg-muted dark:bg-muted/10">{children}</main>
      <Footer />
    </div>
  );
};
