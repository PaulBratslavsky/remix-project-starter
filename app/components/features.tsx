import { Frame, Download, Globe, Sparkles, LayoutPanelLeft, Palette } from "lucide-react";

import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";

export function Features() {
  return (
    <section className="container flex flex-col items-center gap-6 py-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">Features</span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Build fast and stay flexible
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        Reweb brings the best of two worlds together: the speed of development of no-code tools, and
        the flexibility of code customization.
      </p>
      <Carousel opts={{ loop: true, align: "start" }} className="mt-6 w-full px-4 xl:px-0">
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7">
                  <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                    <Frame size={28} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">Visual builder</h4>
                    <p className="text-muted-foreground">
                      Edit HTML, Tailwind &amp; React components with a visual builder and see your
                      changes in real-time.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7">
                  <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                    <Download size={28} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">Code Export</h4>
                    <p className="text-muted-foreground">
                      Once you&apos;re done building, export your project to a fully functional
                      Next.js &amp; Tailwind app.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7">
                  <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                    <Globe size={28} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">No lock-in</h4>
                    <p className="text-muted-foreground">
                      You own the code. Customize with full flexibility and host it anywhere you
                      want.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7">
                  <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                    <Sparkles size={28} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      Built on modern tech
                    </h4>
                    <p className="text-muted-foreground">
                      Reweb works with the most popular frontend technologies like Next.js, Tailwind
                      CSS and Shadcn UI.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7">
                  <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                    <LayoutPanelLeft size={28} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      Pre-made templates
                    </h4>
                    <p className="text-muted-foreground">
                      Get started quickly with pre-made templates and sections to build your landing
                      page fast.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Card className="h-full shadow-md">
                <CardContent className="flex flex-col items-start gap-5 p-7">
                  <div className="inline-flex items-center justify-center rounded-md border border-border bg-secondary p-2">
                    <Palette size={28} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      AI Theme Generation
                    </h4>
                    <p className="text-muted-foreground">
                      Generate beautiful themes and color palettes with AI to match your brand
                      identity and style.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </section>
  );
}
