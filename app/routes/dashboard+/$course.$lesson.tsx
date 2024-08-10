import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MediaPlayer } from "~/components/media-player";
export async function loader({ params }: LoaderFunctionArgs) {
  const selectedLesson = mockData.find((lesson) => lesson.id === params.lesson);
  return json({ params, data: selectedLesson});
}

export default function LessonRoute() {
  const { data, params } = useLoaderData<typeof loader>();
  if (!data) return null;
  const { heading, text, video } = data;
  console.log(video);
  return (
    <div className="p-2 h-[calc(100vh-72px)]">
      <div className="rounded p-4 flex flex-col gap-4">
        <div className="aspect-video rounded overflow-hidden">
          <MediaPlayer videoId={video.videoId} timestamp={video.timestamp} controls/>
        </div>
        <div>
          <h2 className="text-xl font-bold">{heading}</h2>
          <span>Lesson: {params.lesson}</span>
          <p className="text-sm text-muted-foreground">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

const mockData = [
  {
    "id": "lesson-1",
    "heading": "Introduction to HTML",
    "text": "In this lesson, you'll learn the basics of HTML and how to structure a webpage.",
    "video": {
      "videoId": "RceLeh9D85o",
      "timestamp": 1,
    }
  },
  {
    "id": "lesson-2",
    "heading": "CSS Fundamentals",
    "text": "This lesson covers the core concepts of CSS, including selectors, properties, and the box model.",
    "video": {
      "videoId": "RceLeh9D85o",
      "timestamp": 100,
    }
  },
  {
    "id": "lesson-3",
    "heading": "JavaScript Essentials",
    "text": "Learn the essentials of JavaScript, including variables, functions, and event handling.",
    "video": {
      "videoId": "RceLeh9D85o",
      "timestamp": 200,
    }
  },
  {
    "id": "lesson-4",
    "heading": "Responsive Web Design",
    "text": "Explore the principles of responsive web design and how to create layouts that work on any device.",
    "video": {
      "videoId": "RceLeh9D85o",
      "timestamp": 300,
    }
  },
  {
    "id": "lesson-5",
    "heading": "Advanced JavaScript",
    "text": "Dive deeper into JavaScript with topics such as closures, asynchronous programming, and the DOM.",
    "video": {
      "videoId": "RceLeh9D85o",
      "timestamp": 400,
    }
  }
]