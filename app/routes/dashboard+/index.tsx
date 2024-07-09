import { BlogSection } from "~/components/blog-section";
export default function DashboardIndexRoute() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px)]">
      <div className="flex gap-2">
        <BlogSection />
      </div>
    </div>
  );
}
