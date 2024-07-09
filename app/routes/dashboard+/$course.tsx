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
            <div className="flex flex-col gap-4 py-2">
              <Link to="lesson-1" className="ml-2">Lesson 1</Link>
              <Separator />

              <Link to="lesson-2" className="ml-2">Lesson 2</Link>
              <Separator />

              <Link to="lesson-3" className="ml-2">Lesson 3</Link>
              <Separator />

              <Link to="lesson-4" className="ml-2">Lesson 4</Link>
              <Separator />
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
