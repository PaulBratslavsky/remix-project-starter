import qs from "qs";
import { getStrapiURL } from "./utils";

const BASE_URL = getStrapiURL();
export async function fetchData(url: string, authToken?: string) {
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getAllCourses(token?: string) {
  const path = "/api/courses";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText", "formats"],
      },
    },
  });

  return await fetchData(url.href, token);
}

export async function getCourseBySlug(slug: string, token?: string) {
  const path = "/api/courses";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    filters: {
      slug: slug,
    },
    populate: {
      lessons: {
        fields: ["slug", "title", "description", "documentId"],
      },
    },
  });

  return await fetchData(url.href, token);
}

export async function getLessonBySlug(slug: string, token?: string) {
  const path = "/api/lessons";
  const url = new URL(path, BASE_URL);

  url.search = qs.stringify({
    filters: {
      slug: slug,
    },
    populate: "*",
  });

  return await fetchData(url.href, token);
}
