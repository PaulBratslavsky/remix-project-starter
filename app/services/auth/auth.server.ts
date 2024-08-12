import { getStrapiURL } from "~/lib/utils";
import type { StrapiRegisterFormProps, StrapiLoginFormProps } from "~/types";

const BASE_URL = getStrapiURL();

export async function register(data: StrapiRegisterFormProps) {
  const query = `/api/auth/local/register`;

  const request = await fetch(BASE_URL + query, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await request.json();
}

export async function login(data: StrapiLoginFormProps) {
  const query = `/api/auth/local`;

  const request = await fetch(BASE_URL + query, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return  await request.json();
}
