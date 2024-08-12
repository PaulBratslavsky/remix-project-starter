import { Link } from "@remix-run/react";

import {
  Carousel,
  CarouselPrevious,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";

import { formatDate, getStrapiMedia } from "~/lib/utils";

interface CourseCarouselProps {
  data: CourseProps[];
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

export function CourseCarousel(data: Readonly<CourseCarouselProps>) {
  if (!data) return null;
  const courses = data.data;

  return (
    <Carousel
      opts={{ align: "start", loop: true }}
      className="mt-6 w-full px-4 xl:px-0"
    >
      <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
      <CarouselContent className="pb-4">
        {courses.map((course) => {
          const { documentId, title, description, image, publishedAt, slug } =
            course;
          const imageUrl = getStrapiMedia(image.url);
          return (
            <CarouselItem
              key={documentId}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="h-full p-1">
                <Link to={slug}>
                  <Card className="h-full shadow-lg">
                    <CardContent className="flex h-full flex-col items-start gap-5 p-5">
                      {imageUrl && (
                        <div className="relative h-52 w-full">
                          <img
                            src={imageUrl}
                            alt={image.alt}
                            className="object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col gap-4">
                        <h4 className="text-lg font-semibold">{title}</h4>
                        <p className="mb-auto text-muted-foreground">
                          {description}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full border bg-accent px-3 py-0.5 text-sm text-accent-foreground">
                            {"Strapi"}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(publishedAt)}
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
  );
}
