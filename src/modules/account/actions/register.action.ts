"use server";

import { sdk } from "@/lib/medusa/config";
import { actionClient } from "@/lib/safe-action";
import { setAuthToken, getAuthHeaders, getCacheTag } from "./cookies.actions";
import { registerSchema } from "../schemas/register.schema";
import { revalidateTag } from "next/cache";

export const registerAction = actionClient
  .schema(registerSchema)
  .action(async (args) => {
    const { parsedInput } = args;

    // Destructure the parsed input
    const { confirmPassword, email, password, firstName, lastName } =
      parsedInput;

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Register the user using the Medusa SDK
      const token = await sdk.auth.register("customer", "emailpass", {
        email,
        password
      });

      await setAuthToken(token as string);

      const headers = {
        ...(await getAuthHeaders())
      };

      // Create the customer profile
      const { customer: createdCustomer } = await sdk.store.customer.create(
        {
          email,
          first_name: firstName,
          last_name: lastName
        },
        {},
        headers
      );

      // Login the user
      const loginToken = await sdk.auth.login("customer", "emailpass", {
        email,
        password
      });

      await setAuthToken(loginToken as string);

      const customerCacheTag = await getCacheTag("customers");
      revalidateTag(customerCacheTag);

      // TODO: Implement cart transfer logic
      // await transferCart();

      return {
        message: "User registered successfully !",
        customer: createdCustomer
      };
    } catch (error) {
      console.log(`[REGISTER ACTION] Error: `, error);
      throw error;
    }
  });
