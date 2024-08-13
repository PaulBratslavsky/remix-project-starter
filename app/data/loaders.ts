import qs from "qs";
import { getStrapiURL } from "../lib/utils";

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

export async function getAllPosts(
  query: string = "",
  page: number = 1,
  token?: string
) {
  const PAGE_SIZE = 6;
  const EXTERNAL_API_URL = "https://deserving-harmony-9f5ca04daf.strapiapp.com";
  const path = "/api/posts";

  const url = new URL(path, EXTERNAL_API_URL);

  url.search = qs.stringify({
    sort: { createdAt: "desc" },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      $or: [
        { title: { $containsi: query } },
        { description: { $containsi: query } },
        { content: { $containsi: query } },
      ],
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: page,
    },
  });

  return await fetchData(url.href, token);
}

export async function getPostBySlug(slug: string, token?: string) {
  const EXTERNAL_API_URL = "https://deserving-harmony-9f5ca04daf.strapiapp.com";
  const path = "/api/posts";

  const url = new URL(path, EXTERNAL_API_URL);

  url.search = qs.stringify({
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
    filters: {
      slug: slug,
    },
  });

  return await fetchData(url.href, token);
}
