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
        featured ? "min-h-[360px] sm:min-h-[420px]" : "min-h-[280px]"
      }`}
    >
      {heroImage && (
        <div
          className="absolute inset-0 bg-cover bg-[60%_center] transition-transform duration-700 group-hover:scale-105 sm:bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent sm:from-black/80 sm:via-black/25" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative flex min-h-[inherit] items-end p-6 sm:p-8">
        <div className={featured ? "max-w-[95%] sm:max-w-xl" : "max-w-[92%] sm:max-w-md"}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 sm:text-xs sm:tracking-[0.28em]">
            {story.category} · {story.readTime}
          </p>

          <h2
            className={
              featured
                ? "mt-3 text-[2.55rem] font-black leading-[0.92] tracking-tight text-white sm:mt-5 sm:text-5xl"
                : "mt-3 text-2xl font-black leading-[0.95] tracking-tight text-white sm:text-[1.55rem]"
            }
          >
            {story.title}
          </h2>

          <p
            className={
              featured
                ? "mt-4 max-w-md text-base leading-snug text-white/90 sm:mt-5 sm:text-lg sm:leading-relaxed"
                : "mt-3 max-w-sm text-sm leading-snug text-white/90 sm:text-[0.95rem]"
            }
          >
            {story.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}