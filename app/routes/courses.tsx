import type { CourseProps } from "~/types";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAllCourses } from "~/data/loaders";
import { handleStrapiError } from "~/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui/carousel";

import { SectionLayout } from "~/components/section-layout";

import { CourseItem } from "~/components/course-item";

export const meta: MetaFunction = () => {
  return [
    { title: "My Courses" },
    { name: "description", content: "Checkout our courses" },
  ];
};

export async function loader() {
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const data = await getAllCourses(PUBLIC_TOKEN);
  handleStrapiError(data?.error);
  return { headerData: { ...mockData }, courseData: data };
}


export default function CoursesRoute() {
  const { headerData, courseData } = useLoaderData<typeof loader>();
  const { data } = courseData;

  return (
    <SectionLayout {...headerData}>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-6 w-full px-4 xl:px-0"
      >
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          {data.map((course: CourseProps) => <CourseItem course={course} key={course.id} />)}
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </SectionLayout>
  );
}

const mockData = {
  subHeading: "Expand Your Knowledge",
  heading: "Our Featured Courses",
  text: "Whether you're a beginner or an expert, our curated courses are designed to help you level up your skills.",
};
