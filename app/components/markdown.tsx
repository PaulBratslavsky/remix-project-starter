import * as React from "react";
import type { RenderableTreeNodes } from "@markdoc/markdoc";
import pkg from "@markdoc/markdoc";
const { renderers, parse, transform } = pkg;


import { cn } from "~/lib/utils";

function markdown(markdown: string, config: object,): RenderableTreeNodes {
  return transform(parse(markdown, config));
}

export function Markdown({
  content,
  config = {},
  classNames,
}: {
  content: string;
  config?: object;
  classNames?: string;
}) {
  return (
    <div className={cn(classNames)}>
      {renderers.react(markdown(content, config), React)}
    </div>
  );
}
