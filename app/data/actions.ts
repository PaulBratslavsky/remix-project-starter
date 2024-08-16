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

export async function removeProfileRelationAction(
  userProfileId: string,
  documentId: string,
  relationships: string,
  authToken: string,
) {
  const payload = {
    data: {
      [relationships]: {
        disconnect: {
          documentId: documentId,
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

export async function addProfileRelationAction(
  userProfileId: string,
  documentId: string,
  relationships: string,
  authToken: string,
) {
  const payload = {
    data: {
      [relationships]: {
        connect: {
          documentId: documentId,
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

export async function createUserProfile(payload: object, authToken: string) {
  return await mutateData("POST", `/api/user-profiles`, payload, authToken);
}

export async function updateUserProfile(
  payload: object,
  userProfileId: string,
  authToken: string
) {
  return await mutateData(
    "PUT",
    `/api/user-profiles/${userProfileId}`,
    payload,
    authToken
  );
}