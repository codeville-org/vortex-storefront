"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { sdk } from "@/lib/medusa/config";
import { actionClient } from "@/lib/safe-action";
import { getCacheTag, removeAuthToken } from "./cookies.actions";

export const signoutAction = actionClient.action(async () => {
  await sdk.auth.logout();

  await removeAuthToken();

  const customerCacheTag = await getCacheTag("customers");
  revalidateTag(customerCacheTag);

  // TODO: Implement cart removal logic if needed
  //   await removeCartId();

  //   const cartCacheTag = await getCacheTag("carts");
  //   revalidateTag(cartCacheTag);

  redirect(`/account`);
});
