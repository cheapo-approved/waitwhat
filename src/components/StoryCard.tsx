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
        featured
          ? "min-h-[360px] sm:min-h-[420px]"
          : "min-h-[280px]"
      }`}
    >
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-[60%_center] transition-transform duration-700 group-hover:scale-105 sm:bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}

      {/* Mobile: darker bottom fade. Desktop: editorial white fade. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent sm:bg-gradient-to-r sm:from-white sm:via-white/90 sm:via-white/55 sm:to-transparent" />

      {/* Richen image slightly */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative flex min-h-[inherit] items-end p-6 sm:p-10">
        <div className="max-w-[95%] py-1 sm:max-w-lg sm:py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-xs sm:tracking-[0.28em] sm:text-gray-600">
            {story.category} · {story.readTime}
          </p>

          <h2
            className={
              featured
                ? "mt-3 text-[2.55rem] font-black leading-[0.92] tracking-tight text-white sm:mt-5 sm:text-5xl sm:text-black"
                : "mt-3 text-2xl font-black leading-tight tracking-tight text-white sm:mt-4 sm:text-black"
            }
          >
            {story.title}
          </h2>

          <p className="mt-4 max-w-md text-base leading-snug text-white/90 sm:mt-5 sm:rounded-lg sm:bg-white/55 sm:px-3 sm:py-2 sm:text-lg sm:leading-relaxed sm:text-gray-800">
            {story.summary}
          </p>

          <div className="mt-3 hidden sm:block">
            <span className="inline-block rounded-md bg-white/45 px-2.5 py-1 text-sm text-gray-700">
              {story.readTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}