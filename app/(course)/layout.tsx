import { SideNav } from "@/components/SideNav";
import { parts } from "@/lib/course";

export default function CourseLayout({ children }: { children: React.ReactNode }) {
  const nav = parts.map((p) => ({
    slug: p.slug,
    title: p.title,
    group: p.group,
    lessons: p.lessons.map((l) => ({ slug: l.slug, title: l.title })),
  }));
  return (
    <div className="course">
      <SideNav parts={nav} />
      <main id="main" className="course-main">
        {children}
      </main>
    </div>
  );
}
