import React from "react";
import { Layout } from "@/modules/layouts/templates/index";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}
