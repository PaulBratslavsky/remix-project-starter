import { createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno

const sessionSecret = process.env.SESSION_SECRET || "Testing";
if (!sessionSecret) throw new Error('Please set the SESSION_SECRET environment variable');

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: 'user-session',
    secrets: [sessionSecret],
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
});

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
  },
  jwt: string
}

export async function createUserSession(user: UserProps, redirectTo: string,) {
  "FROM CREATE USER SESSION";
  const sessionData = await getSession();
  sessionData.set('user-session', user);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(sessionData),
    },
  });
}

function getUserSession(request: Request) {
  return getSession(request.headers.get('Cookie'));
}

export async function getUserToken(request: Request) {
  const session = await getUserSession(request);
  return session.get('user-session');
}

export async function logout(request: Request) {
  const sessionData = await getUserSession(request);
  return redirect("/", {
    headers: { 'Set-Cookie': await destroySession(sessionData) }
  })
}