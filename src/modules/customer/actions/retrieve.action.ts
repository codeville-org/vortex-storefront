"use server";

import { HttpTypes } from "@medusajs/types";

import { sdk } from "@/lib/medusa/config";
import {
  getAuthHeaders,
  getCacheOptions
} from "@/modules/account/actions/cookies.actions";

export async function retrieveCustomer(): Promise<HttpTypes.StoreCustomer | null> {
  const authHeaders = await getAuthHeaders();

  if (!authHeaders) return null;

  const headers = { ...authHeaders };

  const next = { ...(await getCacheOptions("customers")) };

  return await sdk.client
    .fetch<{ customer: HttpTypes.StoreCustomer }>(`/store/customers/me`, {
      method: "GET",
      query: {
        fields: "*orders"
      },
      headers,
      next,
      cache: "force-cache"
    })
    .then(({ customer }) => customer)
    .catch(() => null);
}
