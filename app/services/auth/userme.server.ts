import qs from "qs";

import { getUserToken } from "./session.server";
import { getStrapiURL } from "~/lib/utils";

const query = qs.stringify({
  fields: ["id", "email", "username"],
  populate: {
    userProfile: {
      populate: {
        followedCourses: {
          populate: "*",
        },
        completedLessons: {
          populate: "*",
        }
      },
    },
  },
});

export async function userme(request: Request) {
  const user = await getUserToken(request);
  if (!user) return null;

  const BASE_URL = getStrapiURL();
  const path = `/api/users/me`;

  const url = new URL(path, BASE_URL);
  url.search = query;

  try {
    const userRequest = await fetch(url.href, {
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
