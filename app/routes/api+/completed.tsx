import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { userme } from "~/services/auth/userme.server";
import { cn } from "~/lib/utils";
import { CheckIcon } from "~/components/icons/CheckIcon";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await userme(request);
  if (!user) return null;

  const url = new URL(request.url);
  const documentId = url.searchParams.get("documentId");

  const lessons = user.userProfile?.completedLessons || [];
    
  const isCompleted = !!lessons.find(
    (lesson: { documentId: string }) => lesson.documentId === documentId
  );

  return json({ isCompleted });
}
export function LessonStatusIcon({ documentId }: { documentId: string }) {
  const fetcherLoader = useFetcher<typeof loader>();
  const isCompleted = fetcherLoader.data?.isCompleted;

  useEffect(() => {
    fetcherLoader.load(`/api/completed?documentId=${documentId}`);
  }, []);

  const color = isCompleted ? "text-muted-foreground" : "text-muted";
  return (
    <CheckIcon className={cn("w-7 h-7 bg-muted rounded-full p-1", color)} />
  );
}
