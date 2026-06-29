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
        featured ? "h-[380px]" : "h-[260px]"
      }`}
    >
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}

      {/* Strong editorial fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/96 via-white/75 via-[45%] to transparent" />

      {/* subtle dark overlay to make image richer */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative flex h-full items-end p-8 sm:p-10">
        <div className="max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-600">
            {story.category}
          </p>

          <h2
            className={
              featured
                ? "mt-5 text-5xl font-black leading-none tracking-tight"
                : "mt-4 text-2xl font-black leading-tight tracking-tight"
            }
          >
            {story.title}
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-gray-700">
            {story.summary}
          </p>

          <p className="mt-7 text-sm text-gray-500">
            {story.readTime}
          </p>
        </div>
      </div>
    </Link>
  );
}