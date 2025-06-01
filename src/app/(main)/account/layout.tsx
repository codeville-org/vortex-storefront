import React from "react";
import { Toaster } from "sonner";

import { AccountLayout } from "@/modules/account/templates/account-layout";
import { retrieveCustomer } from "@/modules/customer/actions/retrieve.action";

type Props = {
  dashboard?: React.ReactNode;
  login?: React.ReactNode;
};

export default async function Layout({ dashboard, login }: Props) {
  const customer = await retrieveCustomer().catch(() => null);

  return (
    <AccountLayout customer={customer}>
      {customer ? dashboard : login}
      <Toaster />
    </AccountLayout>
  );
}
