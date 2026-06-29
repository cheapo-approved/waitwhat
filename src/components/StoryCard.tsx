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
      className={`group relative block overflow-hidden rounded-3xl border border-gray-300 bg-black transition hover:-translate-y-1 hover:shadow-2xl ${
        featured ? "h-[360px]" : "h-[260px]"
      }`}
    >
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/70 to-transparent" />

      <div className="relative flex h-full max-w-3xl flex-col justify-end p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-600">
          {story.category}
        </p>

        <h2
          className={
            featured
              ? "mt-5 max-w-2xl text-3xl font-black leading-[1.05] tracking-tight"
              : "mt-4 max-w-2xl text-2xl font-black leading-tight tracking-tight"
          }
        >
          {story.title}
        </h2>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-700">
          {story.summary}
        </p>

        <p className="mt-7 text-sm text-gray-500">{story.readTime}</p>
      </div>
    </Link>
  );
}