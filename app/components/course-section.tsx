import { Link } from "@remix-run/react";

import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";

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

interface CourseSectionProps {
  subHeading: string;
  heading: string;
  text: string;
  courses: CourseProps[];
}
interface CourseProps {
  heading: string;
  text: string;
  image: ImageProps;
  date: string;
  category: string;
  url: string;
  link: LinkProps;
}

export function CourseSection(data: Readonly<CourseSectionProps>) {
  if (!data) return null;
  const { subHeading, heading, text, courses } = data;
  console.log(data);
  return (
    <section className="container h-full flex flex-col items-center gap-6 py-20 sm:gap-7">
      <div className="flex flex-col gap-3">
        <span className="font-bold uppercase text-primary text-center">
          {subHeading}
        </span>
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl text-center">
          {heading}
        </h2>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        {text}
      </p>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-6 w-full px-4 xl:px-0"
      >
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          {courses.map((course, index) => {
            const { heading, text, image, date, category, link } = course;
            return (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="h-full p-1">
                  <Link to={link.href}>
                    <Card className="h-full shadow-lg">
                      <CardContent className="flex h-full flex-col items-start gap-5 p-5">
                        <div className="relative h-52 w-full">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-4">
                          <h4 className="text-lg font-semibold">
                            {heading}
                          </h4>
                          <p className="mb-auto text-muted-foreground">
                            {text}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                              {category}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {date}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </section>
  );
}
