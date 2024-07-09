import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { VideoPlayer } from "~/components/VideoPlayer";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({ params });
}

export default function LessonRoute() {
  const { params } = useLoaderData<typeof loader>();
  return (
    <div className="p-2 h-[calc(100vh-72px)]">
      <div className="rounded p-4 flex flex-col gap-4">
        <div className="aspect-video rounded overflow-hidden">
          <VideoPlayer />
        </div>
        <div>
          <h2 className="text-xl font-bold">Introduction to React</h2>
          <span>Lesson: {params.lesson}</span>
          <p className="text-sm text-muted-foreground">
            In this lesson, you will learn the basics of React, including
            components, props, and state. Well cover how to set up a React
            project, create reusable components, and manage the state of your
            application.
          </p>
        </div>
      </div>
    </div>
  );
}
