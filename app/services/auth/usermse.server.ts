import qs from "qs";

import { getUserData } from "./session.server";
import { getStrapiURL } from "~/lib/utils";

const query = qs.stringify({
  fields: ["username", "email"],
});

export async function userme(request: Request) {
  const user = await getUserData(request);
  if (!user) return null;

  const BASE_URL = getStrapiURL();
  const path = `/api/users/me?${query}`;

  try {
    const userRequest = await fetch(BASE_URL + path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user}`,
      },
    });

    return await userRequest.json();
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user data");
  }
}