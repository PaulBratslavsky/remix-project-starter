import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, Outlet, useParams } from "@remix-run/react";
import { cn } from "~/lib/utils"

import { TooltipProvider } from "~/components/ui/tooltip";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import { Separator } from "~/components/ui/separator";

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params.lesson);
  return json({ data: mockData });
}

export default function DashboardRoute() {
  const data = useLoaderData<typeof loader>();
  const params = useParams();

  console.log(params)
  if (!data) return null;
  const courseList = data?.data;

  console.log(courseList);
  return (
    <TooltipProvider delayDuration={0}>
      <Separator />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={250}>
          <div className="p-2 h-[calc(100vh-72px)]">
            <div className="rounded p-4 overflow-auto">
              <h2 className="text-xl font-bold mb-4">Lessons</h2>
              <div className="space-y-2">
                { courseList.map((lesson) => {
                  const isSelected = params.lesson === lesson.id;
                  console.log(isSelected)
                  return <Link 
                  key={lesson.id}
                  to={lesson.id}
                  className={cn("flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors", isSelected ? "bg-muted" : "")}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-none bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">{lesson.heading}</h3>
                      <p className="text-sm text-muted-foreground">
                        {lesson.text}
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </Link>
              
                }
              
              )}
              </div>
            </div>
          </div>
          <Separator />
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel defaultSize={655}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
      <Separator />
    </TooltipProvider>
  );
}

function CheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const mockData = [
  {
    "id": "lesson-1",
    "heading": "Introduction to HTML",
    "text": "In this lesson, you'll learn the basics of HTML and how to structure a webpage.",
    "video": {
      "playbackId": "abc12345",
      "metadata": {
        "video_id": "vid-001",
        "video_title": "HTML Basics",
        "viewer_user_id": "user-789"
      }
    }
  },
  {
    "id": "lesson-2",
    "heading": "CSS Fundamentals",
    "text": "This lesson covers the core concepts of CSS, including selectors, properties, and the box model.",
    "video": {
      "playbackId": "def67890",
      "metadata": {
        "video_id": "vid-002",
        "video_title": "CSS Fundamentals",
        "viewer_user_id": "user-789"
      }
    }
  },
  {
    "id": "lesson-3",
    "heading": "JavaScript Essentials",
    "text": "Learn the essentials of JavaScript, including variables, functions, and event handling.",
    "video": {
      "playbackId": "ghi23456",
      "metadata": {
        "video_id": "vid-003",
        "video_title": "JavaScript Essentials",
        "viewer_user_id": "user-789"
      }
    }
  },
  {
    "id": "lesson-4",
    "heading": "Responsive Web Design",
    "text": "Explore the principles of responsive web design and how to create layouts that work on any device.",
    "video": {
      "playbackId": "jkl78901",
      "metadata": {
        "video_id": "vid-004",
        "video_title": "Responsive Web Design",
        "viewer_user_id": "user-789"
      }
    }
  },
  {
    "id": "lesson-5",
    "heading": "Advanced JavaScript",
    "text": "Dive deeper into JavaScript with topics such as closures, asynchronous programming, and the DOM.",
    "video": {
      "playbackId": "mno34567",
      "metadata": {
        "video_id": "vid-005",
        "video_title": "Advanced JavaScript",
        "viewer_user_id": "user-789"
      }
    }
  }
]




