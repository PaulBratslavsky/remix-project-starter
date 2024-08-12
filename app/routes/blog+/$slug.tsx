import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPostBySlug } from "~/lib/fetch";
import { handleStrapiError } from "~/lib/utils";

import { Markdown } from "~/components/markdown";


export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params?.slug;
  const data = await getPostBySlug(slug as string);
  handleStrapiError(data?.error);
  return json({ data: data.data[0]});
}

export default function SinglePostRoute() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className=" px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 ">
        <h1 className="text-3xl font-bold mb-8">{data.title}</h1>
        <Markdown content={data.content} classNames="rich-text"/>
      </div>
    </div>
  );
}
