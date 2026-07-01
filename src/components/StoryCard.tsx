import Link from "next/link";
import type { Story } from "@/types/story";

export default function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  const heroImage = story.hero?.src;

  return (
    <Link
      href={`/story/${story.slug}`}
      className={`group relative block overflow-hidden rounded-3xl border border-gray-300 bg-black transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        featured ? "min-h-[420px]" : "min-h-[280px]"
      }`}
    >
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}

      {/* Editorial fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-white/55 to-transparent" />

      {/* Richen image slightly */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative flex min-h-[inherit] items-end p-7 sm:p-10">
        <div className="max-w-lg py-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-600">
            {story.category}
          </p>

          <h2
            className={
              featured
                ? "mt-5 text-5xl font-black leading-[0.95] tracking-tight"
                : "mt-4 text-2xl font-black leading-tight tracking-tight"
            }
          >
            {story.title}
          </h2>

          <p className="mt-5 max-w-md rounded-lg bg-white/55 px-3 py-2 text-lg leading-relaxed text-gray-800">
  {story.summary}
</p>

<div className="mt-3">
  <span className="inline-block rounded-md bg-white/45 px-2.5 py-1 text-sm text-gray-700">
    {story.readTime}
  </span>
</div>
        </div>
      </div>
    </Link>
  );
}