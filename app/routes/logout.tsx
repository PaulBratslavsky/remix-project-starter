import type { ActionFunctionArgs } from "@remix-run/node";

import { logout } from "~/services/auth/session.server";

export const loader = async ({ request }: ActionFunctionArgs) => {
  return logout(request);
};
