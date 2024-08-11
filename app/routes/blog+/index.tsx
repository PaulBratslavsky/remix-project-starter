import { BlogSection } from "~/components/blog-section";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function BlogIndexRoute() {
  return <BlogSection />;
}
