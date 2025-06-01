/* eslint-disable @typescript-eslint/no-empty-object-type */
"use server";

import "server-only";
import { cookies as nextCookies } from "next/headers";

export async function getAuthHeaders(): Promise<
  { authorization: string } | {}
> {
  try {
    const cookies = await nextCookies();
    const token = cookies.get("_medusa_jwt")?.value;

    if (!token) {
      return {};
    }

    return { authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
}

export async function getCacheTag(tag: string): Promise<string> {
  try {
    const cookies = await nextCookies();
    const cacheId = cookies.get("_medusa_cache_id")?.value;

    if (!cacheId) {
      return "";
    }

    return `${tag}-${cacheId}`;
  } catch (error) {
    console.error("Error retrieving cache tag:", error);
    return "";
  }
}

export async function getCacheOptions(
  tag: string
): Promise<{ tags: string[] } | {}> {
  if (typeof window !== "undefined") {
    return {};
  }

  const cacheTag = await getCacheTag(tag);

  if (!cacheTag) {
    return {};
  }

  return { tags: [`${cacheTag}`] };
}

export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies();
  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
};

export const removeAuthToken = async () => {
  const cookies = await nextCookies();
  cookies.set("_medusa_jwt", "", {
    maxAge: -1
  });
};
