import { json } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { GithubIcon } from "~/components/icons/GitHub";
import { getStrapiSocialAuthUrl, getStrapiURL } from "~/lib/utils";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { createUserSession } from "~/services/auth/session.server";


export async function loader({ request, params }: LoaderFunctionArgs) {
  const provider = params?.provider;
  if (!provider) return json({ error: "Provider not found" }, { status: 404 });

  const url = new URL(request.url);

  const BASE_URL = getStrapiURL();
  const path = `api/auth/${provider}/callback/${url.search}`;
  const strapiLoginCallbackUrl = new URL(path, BASE_URL);

  const response = await fetch(strapiLoginCallbackUrl);
  const data = await response.json();

  if (data?.error) return json({ error: data.error }, { status: 400 });

  return createUserSession(data.jwt, request);
}

export function SocialButtonProvider({
  provider,
}: {
  readonly provider: string;
}) {
  const providerUrl = getStrapiSocialAuthUrl(provider);
  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
  // this is disabled for now while we fix the backend to handle this logic.
  return null;
  return (
    <Button asChild variant="outline" className="w-full" disabled={true}>
      <Link to={providerUrl}>
        {getProviderIcon(provider)}
        {`Join with ${providerName}`}
      </Link>
    </Button>
  );
}

function getProviderIcon(provider: string) {
  switch (provider) {
    case "github":
      return <GithubIcon className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
}
