import Link from "next/link";
import { getAllStories } from "@/lib/getStory";

export default function Header() {
  const stories = getAllStories();
  const random = stories[Math.floor(Math.random() * stories.length)];

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <div>
          <Link href="/" className="text-4xl font-black tracking-tight">
            WAITWHAT
          </Link>

          <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-gray-600">
            Recover Wonder.
          </p>
        </div>

        <nav className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider sm:gap-8 sm:text-sm">
          <Link href="/stories" className="transition-opacity hover:opacity-60">
            Discoveries
          </Link>

          <Link
            href={`/story/${random.slug}`}
            className="transition-opacity hover:opacity-60"
          >
            Random
          </Link>
        </nav>
      </div>
    </header>
  );
}