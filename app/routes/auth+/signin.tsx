import z from "zod";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import { useActionData, Form } from "@remix-run/react";

import { login } from "~/services/auth/auth.server";
import { userme } from "~/services/auth/userme.server";
import { createUserSession } from "~/services/auth/session.server";
import { SocialButtonProvider } from "~/routes/api+/connect.$provider.redirect"

import { StrapiLoginFormProps } from "~/types";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { ZodErrors, StrapiErrors } from "~/components/errors";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign In" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (user) return redirect("/dashboard");
  return null;
}

const validationSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Please provide username or email" }),
  password: z
    .string()
    .min(6, { message: "Password Must be 6 or more characters long" }),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const validation = validationSchema.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return json({
      data: null,
      formErrors: validation.error.flatten().fieldErrors,
      strapiError: null,
    });
  }

  const response = await login(validation.data as StrapiLoginFormProps);

  if (response?.error)
    return json({
      data: null,
      formErrors: null,
      strapiError: response.error,
    });

  return createUserSession(response.jwt, "/dashboard");
}

interface StrapiErrorsProps {
  message: string;
  name: string;
  statusCode: number;
}

type StrapiError = StrapiErrorsProps | undefined | null;

export default function LoginRoute() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="mx-auto max-w-md space-y-6 h-[calc(100vh-224px)] flex justify-center items-center">
      <div className="w-full p-8 rounded">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <Form className="grid gap-4 mt-6" method="post">
          <div className="space-y-2">
            <Label htmlFor="identifier">Email or Username</Label>
            <Input
              id="identifier"
              name="identifier"
              type="identifier"
              defaultValue={"testuser"}
            />
            <ZodErrors error={actionData?.formErrors?.identifier as string[]} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              defaultValue={"testuser"}
            />
            <ZodErrors error={actionData?.formErrors?.password as string[]} />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </Form>

        <StrapiErrors error={actionData?.strapiError as StrapiError} />

        <Separator className="my-8" />
        <div className="space-y-4">
          <SocialButtonProvider provider="github" />
        </div>
        <div className="mt-4 text-center text-sm">
          <span className="mr-2">Don&apos;t have an account?</span>
        </div>
      </div>
    </div>
  );
}
