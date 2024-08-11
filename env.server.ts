const requiredServerEnv = [
  "VITE_STRAPI_API_URL",
  "READ_ONLY_STRAPI_API_TOKEN",
] as const;

for (const env of requiredServerEnv) {
  if (!process.env[env]) {
    throw new Error(`Missing required server environment variable: ${env}`);
  }
}
export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    VITE_STRAPI_API_URL:
      import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337",
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  let ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}

global.ENV = getEnv();
