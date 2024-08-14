import { getStrapiURL } from "~/lib/utils";
import type { StrapiRegisterFormProps, StrapiLoginFormProps } from "~/types";

const BASE_URL = getStrapiURL();

export async function register(data: StrapiRegisterFormProps) {
  const path = `/api/auth/local/register`;
  const url = new URL(path, BASE_URL);

  const request = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await request.json();
}

export async function login(data: StrapiLoginFormProps) {
  const path = `/api/auth/local`;
  const url = new URL(path, BASE_URL);

  const request = await fetch(url.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return  await request.json();
}
