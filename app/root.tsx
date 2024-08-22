import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useLoaderData,
} from "@remix-run/react";

import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/node";

import { userme } from "./services/auth/userme.server";

import "./tailwind.css";
import faviconUrl from "~/assets/favicon.svg";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { DashboardHeader } from "./components/dashboard-header";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: faviconUrl,
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  return json({ user });
}


export function Layout({ children }: { readonly children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const isDashboard = useLocation().pathname.startsWith("/dashboard");
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          {isDashboard ? <DashboardHeader user={data.user} /> : <Header user={data.user}/>}
          <main className="flex-grow">{children}</main>
          {!isDashboard && <Footer />}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
