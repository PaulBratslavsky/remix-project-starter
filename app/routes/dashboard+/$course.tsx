import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";

import { TooltipProvider } from "~/components/ui/tooltip";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import { Separator } from "~/components/ui/separator";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({ params });
}

export default function DashboardRoute() {
  const { params } = useLoaderData<typeof loader>();
  console.log(params);
  return (
    <TooltipProvider delayDuration={0}>
      <Separator />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={250}>
          <div className="p-2 h-[calc(100vh-72px)]">
            <div className="rounded p-4 overflow-auto">
              <h2 className="text-xl font-bold mb-4">Lessons</h2>
              <div className="space-y-2">
                <Link
                  to="lesson-1"
                  className="flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Introduction to React</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn the basics of React
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </Link>
                <Link
                  to="lesson-2"
                  className="flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Components and Props</h3>
                      <p className="text-sm text-muted-foreground">
                        Understand components and props
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </Link>
                <Link
                  to="lesson-3"
                  className="flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">State and Lifecycle</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn about state and lifecycle methods
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </Link>
                <Link
                  to="lesson-4"
                  className="flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Handling Events</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn how to handle events in React
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </Link>
                <Link
                  to="lesson-5"
                  className="flex items-center justify-between bg-background rounded p-3 cursor-pointer hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                      5
                    </div>
                    <div>
                      <h3 className="font-medium">Conditional Rendering</h3>
                      <p className="text-sm text-muted-foreground">
                        Learn how to conditionally render components
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </Link>
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
