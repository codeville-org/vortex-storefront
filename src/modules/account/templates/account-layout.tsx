import React from "react";
import { HttpTypes } from "@medusajs/types";

type Props = {
  customer: HttpTypes.StoreCustomer | null;
  children: React.ReactNode;
};

export function AccountLayout({ children }: Props) {
  return (
    <div className="content-container mx-auto w-full flex items-center justify-center ">
      {/* <div className="grid grid-cols-2 py-12">
        {customer && <AccountNav customer={customer} />}
        <div className="flex-1">{children}</div>
        </div> */}
      <div>{children}</div>
    </div>
  );
}
