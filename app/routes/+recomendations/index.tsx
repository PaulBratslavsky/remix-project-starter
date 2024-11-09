import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { formatDate, handleStrapiError } from "~/lib/utils";
import { getAllPosts } from "~/data/loaders";

import { Card, CardContent } from "~/components/ui/card";
import { Search } from "~/components/search";
import { PaginationComponent } from "~/components/pagination";
export const meta: MetaFunction = () => {
  return [
    { title: "Blog" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? "";
  const page = url.searchParams.get("page") ?? "1";
  const data = await getAllPosts(query, Number(page));
  handleStrapiError(data?.error);
  return {
    data: data?.data,
    pagination: data?.meta.pagination,
    headerData: { ...mockData },
    query: query,
  };
}

interface PostProps {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
}

export default function BlogIndexRoute() {
  const { data, pagination, query } = useLoaderData<typeof loader>();
  const pageCount = pagination.pageCount;

  return (
    <section className="container h-full flex flex-col items-center gap-4  sm:gap-2 py-2">
      <Search query={query} />

      <div className="my-6 grid auto-rows-fr grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((post: PostProps) => {
          const { documentId, title, slug, description, publishedAt } = post;
          return (
            <Link to={`/blog/${slug}`} key={documentId}>
              <Card className="h-full shadow-lg">
                <CardContent className="flex flex-col items-start gap-5 px-0 p-6">
                  <div className="flex flex-1 flex-col gap-4">
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <p className="mb-auto text-muted-foreground">
                      {description.slice(0, 100) + "..."}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                        Coding
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(publishedAt)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      <PaginationComponent pageCount={pageCount} />
    </section>
  );
}

const mockData = {
  subHeading: "Blog",
  heading: "Checkout our latest articles",
  text: "Learn by reading our articles. We're always adding new content. Check out our latest articles below.",
};
