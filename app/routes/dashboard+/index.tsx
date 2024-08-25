import type { CourseProps } from "~/types";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userme } from "~/services/auth/userme.server";
import { setRedirectToSession } from "~/services/auth/session.server";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);

  console.log("Main Dashboard");

  if (!user) {
    const url = new URL(request.url);
    const redirectTo = url.pathname + url.search;

    console.log("Setting redirectTo:", redirectTo);

    // Set the redirect cookie and get the headers to set in the response
    const { headers } = await setRedirectToSession(request, redirectTo);

    // Redirect the user to the login page, including the headers to set the cookie
    return redirect("/auth/signin", { headers });
  }

  if (!user?.userProfile) return redirect("/auth/onboarding");
  const followedCourses = user?.userProfile?.followedCourses;
  return json({
    headerData: { ...mockData },
    courseData: followedCourses || [],
  });
}

export default function DashboardCoursesRoute() {
  const { headerData, courseData } = useLoaderData<typeof loader>();

  return (
    <SectionLayout {...headerData}>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-6 w-full px-4 xl:px-0"
      >
        <CarouselPrevious className="-left-6 size-7 xl:-left-12 xl:size-8" />
        <CarouselContent className="pb-4">
          {courseData.map((course: CourseProps) => (
            <CourseItem course={course} key={course.id} />
          ))}
        </CarouselContent>
        <CarouselNext className="-right-6 size-7 xl:-right-12 xl:size-8" />
      </Carousel>
    </SectionLayout>
  );
}

const mockData = {
  subHeading: "My Courses",
  heading: "Continue your learning journey",
  text: "Whether you're a beginner or an expert, our curated courses are designed to help you level up your skills.",
};
