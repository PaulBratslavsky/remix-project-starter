import { Link } from "@remix-run/react";
export default function LessonIndexRoute() {
  return <div className="p-2 h-[calc(100vh-72px)] flex justify-center items-center"><Link to="lesson-1" className="bg-muted rounded-md py-2 px-4">Select Lesson</Link></div>;
}
