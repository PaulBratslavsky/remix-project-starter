import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { userme } from "~/services/auth/userme.server";
import { unfollowCourseAction, followCourseAction } from "~/data/actions";
import { getUserToken } from "~/services/auth/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (!user) return null;
  const url = new URL(request.url);
  const documentId = url.searchParams.get("documentId");
  const courses = user.userProfile.followedCourses;
  const isFollowed = !!courses.find(
    (course: { documentId: string }) => course.documentId === documentId
  );
  return json({ isFollowed, user });
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const courseId = formData.get("documentId");

  const user = await userme(request);
  const authToken = await getUserToken(request);
  const userProfileId = user.userProfile.documentId;
  const courses = user.userProfile.followedCourses;

  const isFollowed = !!courses.find(
    (course: { documentId: string }) => course.documentId === courseId
  );

  if (isFollowed) {
    await unfollowCourseAction(userProfileId, courseId as string , authToken);
  } 
  else {
    await followCourseAction(userProfileId, courseId as string , authToken);
  }

  return json({ isFollowed: !isFollowed, user });
}

export function FollowCourseButton({ documentId }: { documentId: string }) {
  const fetcher = useFetcher<typeof action>();
  const isFollowed = fetcher.data?.isFollowed;

  useEffect(() => {
    fetcher.load(`/api/follow?documentId=${documentId}`);
  }, []);

  const isLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  if (isLoading)
    return (
      <button type="submit" className="rounded-full bg-teal-500 p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFollowed ? "#ec4899" : "white"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>
      </button>
    );

  const user = fetcher.data?.user;
  if (!user) return null;

  return (
    <fetcher.Form method="POST" action="/api/follow" className="z-50">
      <fieldset disabled={false}>
        <input hidden name="documentId" defaultValue={documentId} />
        <input
          hidden
          name="isFollowed"
          defaultValue={isFollowed ? "false" : "true"}
        />
        <button type="submit" className="rounded-full bg-teal-500 p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFollowed ? "#ec4899" : "white"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </button>
      </fieldset>
    </fetcher.Form>
  );
}
