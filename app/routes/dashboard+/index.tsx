import type { MetaFunction } from "@remix-run/node";
import { json, redirect, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getAllCourses } from "~/lib/fetch";
import { getStrapiMedia, formatDate } from "~/lib/utils";

import { CarouselItem } from "~/components/ui/carousel";
import { Card, CardContent } from "~/components/ui/card";

import { SectionLayout } from "~/components/section-layout";
import { CarouselWrapper } from "~/components/carousel-wrapper";
import { userme } from "~/services/auth/userme.server";

export const meta: MetaFunction = () => {
  return [
    { title: "My Courses" },
    { name: "description", content: "Checkout our courses" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const PUBLIC_TOKEN = process.env.READ_ONLY_STRAPI_API_TOKEN;
  const user = await userme(request);
  if (!user) return redirect("/auth/signin");
  const data = await getAllCourses(PUBLIC_TOKEN);
  return json({ headerData: { ...mockData }, courseData: data });
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

export default function CoursesRoute() {
  const { headerData, courseData } = useLoaderData<typeof loader>();
  const { meta, data } = courseData;
  console.dir(data, { depth: null });
  console.log(meta); // will use this for pagination later
  return (
    <SectionLayout {...headerData}>
      <CarouselWrapper
        courses={data}
        component={(props: CourseProps) => {
          const { documentId, slug, title, description, publishedAt, image } = props;

          const imageUrl = getStrapiMedia(image?.formats?.medium?.url);

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
        }}
      />
    </SectionLayout>
  );
}

const mockData = {
  subHeading: "My Courses",
  heading: "Continue your learning journey",
  text: "Whether you're a beginner or an expert, our curated courses are designed to help you level up your skills.",
};
