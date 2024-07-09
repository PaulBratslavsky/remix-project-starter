import { TooltipProvider } from "~/components/ui/tooltip";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

import { Separator } from "~/components/ui/separator";
import { Outlet } from "@remix-run/react";

export default function DashboardRoute() {
  return (
    <TooltipProvider delayDuration={0}>
      <Separator />

      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={250}>
          <div className="p-2 h-[calc(100vh-72px)]">Dashboard Route</div>
          <Separator />
        </ResizablePanel>

        <ResizableHandle />
        <ResizablePanel defaultSize={440}>
          <div className="p-2 h-[calc(100vh-72px)]">Notes</div>
        </ResizablePanel>

        <ResizableHandle />

        <Outlet />
      </ResizablePanelGroup>
      <Separator />
    </TooltipProvider>
  );
}
