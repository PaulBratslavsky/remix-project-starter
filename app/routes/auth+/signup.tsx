import z from "zod";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { useActionData, Link, Form } from "@remix-run/react";

import { register } from "~/services/auth/auth.server";
import { createUserSession } from "~/services/auth/session.server";
import { userme } from "~/services/auth/userme.server";
import { getStrapiSocialAuthUrl } from "~/lib/utils";

import { StrapiRegisterFormProps } from "../../types";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { SocialButtonProvider } from "~/routes/api+/connect.$provider.redirect";

import { ZodErrors, StrapiErrors } from "~/components/errors";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (user) return redirect("/dashboard");
  return null;
}

const validationSchema = z.object({
  username: z.string().min(1, { message: "Please provide a username" }),
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password Must be 6 or more characters long" }),
});


export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const validation = validationSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return json({
      data: null,
      formErrors: validation.error.flatten().fieldErrors,
      strapiError: null,
    });
  }

  const response = await register(validation.data as StrapiRegisterFormProps);

  if (response?.error)
    return json({
      data: null,
      formErrors: null,
      strapiError: response.error,
    });


  return createUserSession(response.jwt, request);
}

interface StrapiErrorsProps {
  message: string;
  name: string;
  statusCode: number;
}

type StrapiError = StrapiErrorsProps | undefined | null;

export default function SignupRoute() {
  const actionData = useActionData<typeof action>();
  const githubUrl = getStrapiSocialAuthUrl("github");
  return (
    <div className="mx-auto max-w-md space-y-6 h-[calc(100vh-224px)] flex justify-center items-center">
      <div className="w-full p-8 rounded">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <Form className="grid gap-4 mt-6" method="post">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Email" />
            <ZodErrors error={actionData?.formErrors?.email as string[]} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" placeholder="Username" />
            <ZodErrors error={actionData?.formErrors?.username as string[]} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
            <ZodErrors error={actionData?.formErrors?.password as string[]} />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </Form>

        <StrapiErrors error={actionData?.strapiError as StrapiError} />

        <Separator className="my-8" />
        <div className="space-y-4">
          <SocialButtonProvider provider="github" />
        </div>
        <div className="mt-4 text-center text-sm">
          <span className="mr-2">Already have an account?</span>
          <Link to="/auth/signin" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
