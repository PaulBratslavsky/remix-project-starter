import {
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node"; // or cloudflare/deno

const sessionSecret = process.env.SESSION_SECRET || "Testing";
if (!sessionSecret)
  throw new Error("Please set the SESSION_SECRET environment variable");

// Create separate session storage for the redirect session
const redirectSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "redirect-session",
    secrets: [sessionSecret],
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 5, // 5 minutes
  },
});

const { getSession: getRedirectSession, commitSession: commitRedirectSession, destroySession: destroyRedirectSession } =
  redirectSessionStorage;

// Create session storage for the user session
const userSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "user-session",
    secrets: [sessionSecret],
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

const { getSession, commitSession, destroySession } = userSessionStorage;

interface UserProps {
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
  jwt: string;
}

export async function createUserSession(user: UserProps, request: Request) {
  const sessionData = await getSession(request.headers.get("Cookie"));
  sessionData.set("user-session", user);

  const sessionCookie = await commitSession(sessionData);
  const redirectSession = await getRedirectSession(request.headers.get("Cookie"));
  const redirectTo = redirectSession.get("redirectTo") || "/dashboard";

  // Clear the redirect session after using it
  const clearRedirectCookieHeader = await destroyRedirectSession(redirectSession);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": `${sessionCookie}, ${clearRedirectCookieHeader}`,
    },
  });
}

export async function setRedirectToSession(request: Request, redirectTo: string) {
  const session = await getRedirectSession(request.headers.get("Cookie"));
  session.set("redirectTo", redirectTo);
  const setCookieHeader = await commitRedirectSession(session);
  return {
    headers: {
      "Set-Cookie": setCookieHeader,
    },
  };
}

function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export async function getUserToken(request: Request) {
  const session = await getUserSession(request);
  return session.get("user-session");
}

export async function logout(request: Request) {
  const sessionData = await getUserSession(request);
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(sessionData) },
  });
}
