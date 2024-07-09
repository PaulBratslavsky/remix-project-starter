import { Outlet } from "@remix-run/react";

export default function UserNotesRoute() {
  return (
    <div>
      <h1>User Notes Route</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
