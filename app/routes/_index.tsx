import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Features } from "~/components/features";

import { Hero } from "~/components/hero";
import { Pricing } from "~/components/pricing";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader() {
  return json({ data: mockData });
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div>
      <Hero {...data} />
      <Features />
      <Pricing />
    </div>
  );
}

const mockData = {
  subHeading: "Welcome to Our Service",
  heading: "Transform Your Business Today",
  text: "Our platform provides all the tools you need to streamline your operations and grow your business. Get started with us now!",
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
