
import {
  ResizablePanel,
} from "~/components/ui/resizable";

export default function Note() {
  return <ResizablePanel defaultSize={655}>
  <div className="p-2 h-[calc(100vh-72px)]">Select Note</div>
</ResizablePanel>;
}
