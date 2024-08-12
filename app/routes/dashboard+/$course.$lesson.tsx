import { json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MediaPlayer } from "~/components/media-player";

import { getUserData } from "~/services/auth/session.server";

import { getLessonBySlug } from "~/lib/fetch";
import { handleStrapiError } from "~/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { lesson } = params;
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const user = await getUserData(request);
  if (!user) return redirect("/auth/signin");
  const data = await getLessonBySlug(lesson as string, PUBLIC_TOKEN);
  handleStrapiError(data?.error);
  const courseData = data?.data[0];
  return json({ data: courseData });
}

export default function LessonRoute() {
  const { data } = useLoaderData<typeof loader>();

  const { title, description, player } = data;
  const video = player[0];

  return (
    <div className="p-2 h-[calc(100vh-72px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="rounded p-4 flex flex-col gap-4">
            <div className="aspect-video rounded overflow-hidden">
              <MediaPlayer
                videoId={video.videoId}
                timestamp={video.timecode}
                controls
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel   defaultSize={0}>Two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}


