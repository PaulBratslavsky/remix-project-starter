import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getLessonBySlug } from "~/data/loaders";
import { handleStrapiError } from "~/lib/utils";
import { userme } from "~/services/auth/userme.server";

import { MediaPlayer } from "~/components/media-player";
import { Markdown } from "~/components/markdown";
import { LessonStatusButton } from "~/routes/api+/complete";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { ScrollArea } from "~/components/ui/scroll-area";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { lesson } = params;
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const user = await userme(request);
  if (!user) return redirect("/auth/signin");
  if (!user?.userProfile) return redirect("/auth/onboarding");
  const data = await getLessonBySlug(lesson as string, PUBLIC_TOKEN);
  handleStrapiError(data?.error);
  const courseData = data?.data[0];
  return json({ data: courseData });
}

export default function LessonRoute() {
  const { data } = useLoaderData<typeof loader>();

  const { title, description, content, resources, player, documentId } = data;
  const video = player[0];

  return (
    <div className="p-2 h-[calc(100vh-72px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={60}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-8">
            <div className="rounded flex flex-col gap-4">
              <div className="aspect-video rounded overflow-hidden">
                <MediaPlayer
                  videoId={video.videoId}
                  timestamp={video.timecode}
                  controls
                />
              </div>
              <LessonStatusButton documentId={documentId} />

              <div>
                <h1 className="text-3xl mt-2 mb-4 font-bold">{title}</h1>
                <p className="text-lg mb-4 text-muted-foreground">
                  {description}
                </p>
                {resources && (
                  <div>
                    <Markdown content={resources} classNames="resources-text" />
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <ScrollArea className="h-[calc(100vh-72px)] w-full p-8">
            {content && <Markdown content={content} classNames="rich-text w-full" />}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
