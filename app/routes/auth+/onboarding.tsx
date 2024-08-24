import z from "zod";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { createUserProfile, updateUserProfile } from "~/data/actions";

import { useActionData, Form, useLoaderData } from "@remix-run/react";

import { userme } from "~/services/auth/userme.server";

import { getUserToken } from "~/services/auth/session.server";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

import { ZodErrors, StrapiErrors } from "~/components/errors";

export const meta: MetaFunction = () => {
  return [
    { title: "Onboarding" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  const userProfile = user?.userProfile || null;
  return json({ userProfile });
}

const validationSchema = z.object({
  name: z.string().min(1, { message: "Please provide name" }),
  githubLink: z.string().url({ message: "Please provide valid github url" }),
  bio: z.string().min(1, { message: "Please provide bio" }),
});

export async function action({ request }: ActionFunctionArgs) {
  const user = await userme(request);
  const userProfileId = user?.userProfile?.documentId;
  const token = await getUserToken(request);
  const formData = await request.formData();
  const action = formData.get("_action"); 
  let response = null;

  const validation = validationSchema.safeParse({
    name: formData.get("name"),
    githubLink: formData.get("githubLink"),
    bio: formData.get("bio"),
  });

  if (!validation.success) {
    return json({
      data: null,
      formErrors: validation.error.flatten().fieldErrors,
      strapiError: null,
    });
  }

  const createProfilePayload = {
    data: {
      name: formData.get("name"),
      githubLink: formData.get("githubLink"),
      bio: formData.get("bio"),
      user: {
        connect: {
          documentId: user?.documentId,
        },
      },
    },
  };

  const updateProfilePayload = {
    data: {
      name: formData.get("name"),
      githubLink: formData.get("githubLink"),
      bio: formData.get("bio"),
    },
  };

  switch (action) {
    case "create":
      response = await createUserProfile(createProfilePayload, token);
      break;

    case "update":
      response = await updateUserProfile(
        updateProfilePayload,
        userProfileId as string,
        token
      );
      break;
  }

  if (response?.error) {
    return json({
      data: null,
      formErrors: null,
      strapiError: response.error,
    });
  }

  return redirect("/courses");
}

export default function OnboardingRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const hasProfile = !!loaderData?.userProfile;
  return (
    <div className="h-[calc(100vh-224px)] flex justify-center items-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Create Your Profile</CardTitle>
          <CardDescription>
            Having a profile will allow you to add courses to your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name|Nickname</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name or nickname"
                defaultValue={loaderData?.userProfile?.name || ""}
              />
              <ZodErrors error={actionData?.formErrors?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="githubLink">GitHub Link</Label>
              <Input
                id="githubLink"
                name="githubLink"
                placeholder="Enter your GitHub profile link"
                defaultValue={loaderData?.userProfile?.githubLink || ""}
              />
              <ZodErrors error={actionData?.formErrors?.githubLink} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                rows={3}
                defaultValue={loaderData?.userProfile?.bio || ""}
              />
              <ZodErrors error={actionData?.formErrors?.bio} />
            </div>
            <Button
              type="submit"
              className="ml-auto"
              name="_action"
              value={hasProfile ? "update" : "create"}
            >
              {hasProfile ? "Update Profile" : "Create Profile"}
            </Button>
            <StrapiErrors error={actionData?.strapiError} />
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}