import {  type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPostBySlug } from "~/data/loaders";
import { handleStrapiError } from "~/lib/utils";

import { Markdown } from "~/components/markdown";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params?.slug;
  const data = await getPostBySlug(slug as string);
  handleStrapiError(data?.error);
  return { data: data.data[0]};
}

export default function SinglePostRoute() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen overflow-auto px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 ">
        <h1 className="text-3xl font-bold mb-8">{data.title}</h1>
        <Markdown content={data.content} classNames="rich-text"/>
      </div>
    </div>
  );
}
