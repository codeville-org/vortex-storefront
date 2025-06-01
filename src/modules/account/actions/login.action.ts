"use server";

import { actionClient } from "@/lib/safe-action";
import { loginSchema } from "../schemas/login.schema";
import { sdk } from "@/lib/medusa/config";
import { getCacheTag, setAuthToken } from "./cookies.actions";
import { revalidateTag } from "next/cache";

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async (args) => {
    const { parsedInput } = args;

    // Destructure the parsed input
    const { email, password } = parsedInput;

    try {
      await sdk.auth
        .login("customer", "emailpass", { email, password })
        .then(async (token) => {
          await setAuthToken(token as string);
          const customerCacheTag = await getCacheTag("customers");
          revalidateTag(customerCacheTag);
        });

      return { message: "User logged in successfully" };
    } catch (error) {
      console.error(`[LOGIN ACTION] Error: `, error);
      throw error;
    }
  });
