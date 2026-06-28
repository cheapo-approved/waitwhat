import Link from "next/link";
import type { Story } from "@/types/story";

export default function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/story/${story.slug}`}
      className={
        featured
          ? "group relative block overflow-hidden rounded-3xl border border-gray-300 p-6 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-7"
          : "block rounded-3xl border border-gray-300 p-6 transition hover:-translate-y-0.5 hover:shadow-lg sm:p-7"
      }
    >
      {featured && story.hero?.src && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70 transition duration-300 group-hover:opacity-80"
            style={{
              backgroundImage: `url(${story.hero.src})`,
            }}
          />

          <div className="absolute inset-0 bg-white/55" />
        </>
      )}

      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.22em] text-gray-700">
          {story.category}
        </p>

        <h3
          className={
            featured
              ? "mt-4 text-2xl font-black leading-tight tracking-tight sm:text-3xl"
              : "mt-3 text-xl font-black leading-tight tracking-tight sm:text-2xl"
          }
        >
          {story.title}
        </h3>

        <p className="mt-3 text-base leading-relaxed text-gray-800">
          {story.summary}
        </p>

        <p className="mt-5 text-sm text-gray-700">{story.readTime}</p>
      </div>
    </Link>
  );
}