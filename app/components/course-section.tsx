import { Link } from "@remix-run/react";

import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";

export function CourseSection() {
  return (
    <section className="container flex flex-col items-center gap-6 py-18 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          Courses
        </span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          Checkout your latest courses
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        Learn how to build beautiful landing pages fast.
      </p>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-6 w-full px-4 xl:px-0"
      >
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Link to="lesson-1">
                <Card className="h-full shadow-lg">
                  <CardContent className="flex h-full flex-col items-start gap-5 p-5">
                    <div className="relative h-52 w-full">
                      <img
                        src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="How to build a beautiful landing page in minutes"
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                      <h4 className="text-lg font-semibold">
                        How to build a beautiful landing page in minutes
                      </h4>
                      <p className="mb-auto text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque nec ultrices orci. Vivamus ante arcu, hendrerit.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                          Coding
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Jul 16, 2024
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Link to="lesson-2">
                <Card className="h-full shadow-lg">
                  <CardContent className="flex h-full flex-col items-start gap-5 p-5">
                    <div className="relative h-52 w-full">
                      <img
                        src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="How to generate the perfect theme for your website with AI"
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                      <h4 className="text-lg font-semibold">
                        How to generate the perfect theme for your website with
                        AI
                      </h4>
                      <p className="mb-auto text-muted-foreground">
                        Mauris tincidunt porttitor risus, et posuere erat
                        malesuada eu. Praesent volutpat ut ipsum ac congue.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                          Design
                        </span>
                        <span className="text-sm text-muted-foreground">
                          May 10, 2024
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Link to="lesson-3">
                <Card className="h-full shadow-lg">
                  <CardContent className="flex h-full flex-col items-start gap-5 p-5">
                    <div className="relative h-52 w-full">
                      <img
                        src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="How to build at the speed of no-code without customization limits"
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                      <h4 className="text-lg font-semibold">
                        How to build at the speed of no-code without
                        customization limits
                      </h4>
                      <p className="mb-auto text-muted-foreground">
                        Curabitur at quam eget eros semper euismod vitae at
                        neque. Ut ultrices ut.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                          Coding
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Apr 27, 2024
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Link to="lesson-4">
                <Card className="h-full shadow-lg">
                  <CardContent className="flex h-full flex-col items-start gap-5 p-5">
                    <div className="relative h-52 w-full">
                      <img
                        src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="How to edit React components and Tailwind visually"
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                      <h4 className="text-lg font-semibold">
                        How to edit React components and Tailwind visually
                      </h4>
                      <p className="mb-auto text-muted-foreground">
                        Vivamus dignissim porta orci, finibus tempus risus
                        consectetur dapibus. Donec quis ornare elit.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                          Design
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Apr 9, 2024
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="h-full p-1">
              <Link to="lesson-5">
                <Card className="h-full shadow-lg">
                  <CardContent className="flex h-full flex-col items-start gap-5 p-5">
                    <div className="relative h-52 w-full">
                      <img
                        src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="How to build at the speed of no-code without customization limits"
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                      <h4 className="text-lg font-semibold">
                        How to build at the speed of no-code without
                        customization limits
                      </h4>
                      <p className="mb-auto text-muted-foreground">
                        Curabitur at quam eget eros semper euismod vitae at
                        neque. Ut ultrices ut.
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                          Coding
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Mar 11, 2024
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </section>
  );
}
