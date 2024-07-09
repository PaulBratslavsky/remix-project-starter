import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({
  params,
}: LoaderFunctionArgs) {
  return json({ params });
}

export default function LessonRoute() {
  const { params } = useLoaderData<typeof loader>();
  return <div className="p-2 h-[calc(100vh-72px)]">{params.lesson}</div>;
}
