import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselNext,
} from "~/components/ui/carousel";

import React from "react";

interface CarouselWrapperProps {
  courses: CourseProps[];
  component: React.FC<CourseProps>;
}

interface ImageProps {
  url: string;
  alt: string;
  width: number;
  height: number;
  alternativeText: string;
  formats: {
    medium: {
      url: string;
      height: number;
      width: number;
    };
  };
}

interface CourseProps {
  id: number;
  documentId: string;
  title: string;
  description: string;
  isPremium: boolean;
  slug: string;
  publishedAt: string;
  image: ImageProps;
}

export function CarouselWrapper({
  courses,
  component: Component,
}: CarouselWrapperProps) {
  if (!courses || courses.length === 0) return null;

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="mt-6 w-full px-4 xl:px-0"
    >
      <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
      <CarouselContent className="pb-4">
        {courses.map((course) => (
          <Component key={course.id} {...course } />
        ))}
      </CarouselContent>
      <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
    </Carousel>
  );
}
