import type { MetaFunction } from "@remix-run/node";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { CourseSection } from "~/components/course-section";

export const meta: MetaFunction = () => {
  return [
    { title: "All Courses" },
    { name: "description", content: "Checkout our courses" },
  ];
};

export function loader(request: LoaderFunctionArgs) {
  console.log(request);
  return json({ data: mockData });
} 

export default function CoursesRoute() {
  const { data } = useLoaderData<typeof loader>();
  return <CourseSection {...data} />
}

const mockData = {
  "subHeading": "Expand Your Knowledge",
  "heading": "Our Featured Courses",
  "text": "Whether you're a beginner or an expert, our curated courses are designed to help you level up your skills.",
  "courses": [
    {
      "heading": "Introduction to JavaScript",
      "text": "Learn the fundamentals of JavaScript, the most popular programming language for web development.",
      "image": {
        "src": "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "alt": "A placeholder image",
        "width": 600,
        "height": 400
      },      "date": "2024-01-10",
      "category": "Programming",
      "url": "https://example.com/courses/javascript-intro",
      "link": {
        "text": "Enroll Now",
        "href": "/dashboard/course-1",
        "isExternal": true
      }
    },
    {
      "heading": "Mastering React",
      "text": "Take your React skills to the next level with this in-depth course on modern React development.",
      "image": {
        "src": "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "alt": "A placeholder image",
        "width": 600,
        "height": 400
      },      "date": "2024-02-15",
      "category": "Web Development",
      "url": "https://example.com/courses/mastering-react",
      "link": {
        "text": "Enroll Now",
        "href": "/dashboard/course-1",
        "isExternal": true
      }
    },
    {
      "heading": "UI/UX Design Principles",
      "text": "Discover the key principles of user interface and user experience design with practical examples.",
      "image": {
        "src": "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "alt": "A placeholder image",
        "width": 600,
        "height": 400
      },      "date": "2024-03-20",
      "category": "Design",
      "url": "https://example.com/courses/ui-ux-design",
      "link": {
        "text": "Enroll Now",
        "href": "/dashboard/course-1",
        "isExternal": true
      }
    },
    {
      "heading": "Data Science with Python",
      "text": "Learn how to analyze and visualize data using Python in this comprehensive data science course.",
      "image": {
        "src": "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "alt": "A placeholder image",
        "width": 600,
        "height": 400
      },      "date": "2024-04-25",
      "category": "Data Science",
      "url": "https://example.com/courses/data-science-python",
      "link": {
        "text": "Enroll Now",
        "href": "/dashboard/course-1",
        "isExternal": true
      }
    },
    {
      "heading": "Full-Stack Development",
      "text": "Become a full-stack developer by learning both front-end and back-end technologies.",
      "image": {
        "src": "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "alt": "A placeholder image",
        "width": 600,
        "height": 400
      },      "date": "2024-05-30",
      "category": "Web Development",
      "url": "https://example.com/courses/full-stack-development",
      "link": {
        "text": "Enroll Now",
        "href": "/dashboard/course-1",
        "isExternal": true
      }
    }
  ]
}