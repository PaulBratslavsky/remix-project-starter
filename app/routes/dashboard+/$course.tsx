import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, Link, Outlet, useParams } from "@remix-run/react";
import { cn, handleStrapiError } from "~/lib/utils";

import { getCourseBySlug } from "~/data/loaders";
import { TooltipProvider } from "~/components/ui/tooltip";
import { ScrollArea } from "~/components/ui/scroll-area";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import { Separator } from "~/components/ui/separator";
import { userme } from "~/services/auth/userme.server";
import { LessonStatusButton, LessonStatusIcon } from "~/routes/api+/complete";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { course } = params;
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const user = await userme(request);
  if (!user) return redirect("/auth/signin");
  if (!user?.userProfile) return redirect("/auth/onboarding");
  const data = await getCourseBySlug(course as string, PUBLIC_TOKEN);
  handleStrapiError(data?.error);
  const courseData = data?.data[0];
  return json({ data: courseData });
}

interface LessonListProps {
  documentId: string;
  slug: string;
  title: string;
  description: string;
}

export default function DashboardRoute() {
  const params = useParams();
  const { data } = useLoaderData<typeof loader>();
  const courseList = data.lessons;

  return (
    <TooltipProvider delayDuration={0}>
      <Separator />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={250}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-4">
            <h2 className="text-xl font-bold mb-4">Lessons</h2>
            <div className="space-y-2">
              {courseList.map((lesson: LessonListProps, index: number) => {
                const isSelected = params.lesson === lesson.slug;
                const { title, documentId, slug } = lesson;
                return (
                  <div
                    key={documentId}
                    className={cn(
                      "flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors",
                      isSelected ? "bg-muted" : ""
                    )}
                  >
                    <Link to={slug} className="w-full bg-green=500">
                      <div className="flex items-center gap-3">
                        <div className="flex-none bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{title}</h3>
                          {/* <p className="text-sm text-muted-foreground">
                                  {description}
                                </p> */}
                        </div>
                      </div>
                    </Link>
                    <div className="text-muted-foreground text-sm">
                      <LessonStatusButton documentId={documentId} asIcon />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <Separator />
        </ResizablePanel>

        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={655}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Separator />
    </TooltipProvider>
  );
}
