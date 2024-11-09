import { useLoaderData } from "@remix-run/react";
import { Features } from "~/components/features";

import { Hero } from "~/components/hero";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader() {
  return { data: mockData };
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div>
      <Hero {...data} />
      <Features />
    </div>
  );
}

const mockData = {
  subHeading: "Welcome to Coding After Thirty",
  heading: "Building LMS with Remix and Strapi 5",
  text: "This is a project that I am currently building to use as an example and learn more on how to create Learning Management Systems.",
  links: [
    {
      text: "Get Started",
      href: "auth/signup",
      isExternal: false,
    },
    {
      text: "Learn More",
      href: "/",
      isExternal: false,
    },
  ],
  image: {
    src: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "A placeholder image",
    width: 600,
    height: 400,
  },
};
