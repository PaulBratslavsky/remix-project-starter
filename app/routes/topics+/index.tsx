import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { formatDate, handleStrapiError } from "~/lib/utils";
import { getAllTopics } from "~/data/loaders";

import { Search } from "~/components/search";
import { PaginationComponent } from "~/components/pagination";

import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";

import { ThumbsUp } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Topics and Questions" },
    { name: "description", content: "Recommended Topics and Questions" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? "";
  const page = url.searchParams.get("page") ?? "1";
  const data = await getAllTopics(query, Number(page), PUBLIC_TOKEN);
  handleStrapiError(data?.error);
  return {
    data: data?.data || [],
    pagination: data?.meta.pagination,
    query: query,
  };
}

type TopicProps = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  type: "QUESTION" | "TOPIC";
  upvotes: number;
  createdAt: string;
  user: {
    name: string;
  };
};

export default function BlogIndexRoute() {
  const { data, pagination, query } = useLoaderData<typeof loader>();
  const pageCount = pagination.pageCount;

  return (
    <section className="container h-full flex flex-col items-center gap-4  sm:gap-2 py-2">
      <Search query={query} />

      <Table className="my-6">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Upvotes</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((topic: TopicProps) => (
            <TableRow key={topic.documentId}>
              <TableCell className="font-medium">{topic.title}</TableCell>
              <TableCell>
                <Badge
                  variant={topic.type === "TOPIC" ? "default" : "secondary"}
                >
                  {topic.type === "TOPIC" ? "Topic" : "Question"}
                </Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate">
                {topic.description}
              </TableCell>
              <TableCell>{formatDate(topic.createdAt)}</TableCell>
              <TableCell>{topic.upvotes}</TableCell>
              <TableCell>
                <form>
                  <Button variant="outline" size="sm" type="submit" disabled>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Upvote
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComponent pageCount={pageCount} />
    </section>
  );
}
