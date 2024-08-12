import { Link } from "@remix-run/react";

import { Button } from "~/components/ui/button";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LinkProps {
  text: string;
  href: string;
  isExternal: boolean;
}
interface HeroProps {
  subHeading: string;
  heading: string;
  text: string;
  links: LinkProps[];
  image: ImageProps;
}

export function Hero(data: Readonly<HeroProps>) {
  if (!data) return null;
  const { subHeading, heading, text, links, image } = data;
  return (
    <section className="container h-full flex flex-col items-center gap-10 pb-10 pt-20 sm:gap-14 lg:flex-row">
      <div className="flex flex-1 flex-col items-center gap-8 lg:items-start lg:gap-10">
        <div className="flex items-center gap-1 rounded-full border bg-secondary px-3 py-0.5 hover:bg-secondary/60">
          <span className="text-sm text-secondary-foreground">
            {subHeading}
          </span>
        </div>
        <h1 className="max-w-2xl text-center font-heading text-4xl font-semibold sm:text-5xl sm:leading-tight lg:text-left">
          {heading}
        </h1>
        <p className="max-w-md text-center text-lg text-muted-foreground lg:text-left">
          {text}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {links.map((link, index) => {
            return (
              <Button
                key={index}
                size="lg"
                asChild
                variant="outline"
                className="h-12 cursor-pointer border-border text-base sm:h-14 sm:px-10"
              >
                <Link to={link.href} target={link.isExternal ? "_blank" : "_self"} rel="noopener noreferrer" prefetch="intent">{link.text}</Link>
              </Button>
            );
          })}
        </div>
      </div>
      <div className="relative flex-1">
        <img
          alt={image.alt}
          src={image.src}
          width={image.width}
          height={image.height}
          className="rounded-xl border border-border shadow-lg"
        />
        <div className="absolute inset-0 -z-10 bg-primary/20 [filter:blur(180px)]" />
      </div>
    </section>
  );
}
