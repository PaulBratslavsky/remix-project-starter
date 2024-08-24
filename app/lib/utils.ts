import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337";
}

export function getStrapiSocialAuthUrl(provider: string) {
  const BASE_URL = getStrapiURL();
  const path = "/api/connect/" + provider;
  const url = new URL(path, BASE_URL);
  return url.href;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function invariantResponse(
  condition: unknown,
  message?: string | (() => string),
  responseInit?: ResponseInit
) : asserts condition {
  if (!condition) {
    throw new Response( typeof message === "function"
      ? message()
      : message || "Invariant failed. Please provide a message.",
      { status: 400, ...responseInit }
    )
  }
}

interface StrapiErrorsProps {
  status: number;
  name: string;
  message: string;
}

export function handleStrapiError(error: StrapiErrorsProps) {
  if (!error) return null;
  throw new Response(error.message, { status: error.status});
}
