import { getStrapiURL } from "~/lib/utils";

export async function mutateData(
  method: string,
  path: string,
  payload: object,
  authToken: string
) {
  if (!authToken) throw new Error("No auth token found");
  const baseUrl = getStrapiURL();
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...payload }),
    });
    return await response.json();
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}

export async function unfollowCourseAction(
  userProfileId: string,
  courseId: string,
  authToken: string
) {
  const payload = {
    data: {
      followedCourses: {
        disconnect: {
          documentId: courseId,
        },
      },
    },
  };
  return await mutateData(
    "PUT",
    `/api/user-profiles/${userProfileId}`,
    payload,
    authToken
  );
}

export async function followCourseAction(
  userProfileId: string,
  courseId: string,
  authToken: string
) {
  const payload = {
    data: {
      followedCourses: {
        connect: {
          documentId: courseId,
        },
      },
    },
  };
  return await mutateData(
    "PUT",
    `/api/user-profiles/${userProfileId}`,
    payload,
    authToken
  );
}
