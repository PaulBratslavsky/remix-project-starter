import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CourseCarousel } from "~/components/course-carousel";

// import { fetchData } from "~/lib/fetch";
import SectionLayout from "~/components/section-layout";
import { getAllCourses } from "~/lib/fetch";

export const meta: MetaFunction = () => {
  return [
    { title: "My Courses" },
    { name: "description", content: "Checkout our courses" },
  ];
};

export async function loader() {
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const data = await getAllCourses(PUBLIC_TOKEN);
  return json({ headerData: { ...mockData }, courseData: data });
} 

export default function CoursesRoute() {
  const { headerData, courseData } = useLoaderData<typeof loader>();
  const { meta, data } = courseData;
  console.dir(data, { depth: null });
  console.log(meta); // will use this for pagination later
  return <SectionLayout {...headerData}>
    <CourseCarousel data={data} />
  </SectionLayout>;
}

const mockData = {
  subHeading: "My Courses",
  heading: "Continue your learning journey",
  text: "Whether you're a beginner or an expert, our curated courses are designed to help you level up your skills.",
}