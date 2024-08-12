import * as React from "react";
import type { RenderableTreeNodes } from "@markdoc/markdoc";

import pkg from "@markdoc/markdoc";
const { renderers, parse, transform } = pkg;

function markdown(markdown: string, config: object): RenderableTreeNodes {
  return transform(parse(markdown, config));
}

export function Markdown({
  content,
  config = {},
}: {
  content: string;
  config?: object;
}) {
  return (
    <div className="rich-text">
      {renderers.react(markdown(content, config), React)}
    </div>
  );
}
