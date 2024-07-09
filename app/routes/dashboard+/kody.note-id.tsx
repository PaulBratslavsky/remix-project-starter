
import {
  ResizablePanel,
} from "~/components/ui/resizable";

export default function Note() {
  return <ResizablePanel defaultSize={655}>
  <div className="p-2">Note</div>
</ResizablePanel>;
}
