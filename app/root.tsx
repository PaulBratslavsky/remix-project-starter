import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import faviconUrl from "~/assets/favicon.svg";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: faviconUrl,
    },
  ];
};

export function Layout({ children }: { readonly children: React.ReactNode }) {
  const isDashboard = useLocation().pathname.startsWith("/dashboard");
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Header isDashboard={isDashboard} />
        <main>{children}</main>
        {!isDashboard && <Footer />}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
