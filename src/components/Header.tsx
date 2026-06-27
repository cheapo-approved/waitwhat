import Link from "next/link";
import { getAllStories } from "@/lib/getStory";

export default function Header() {
  const stories = getAllStories();
  const random = stories[Math.floor(Math.random() * stories.length)];

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Link
          href="/"
          className="text-3xl font-black tracking-tight"
        >
          WAITWHAT
        </Link>

        <nav className="flex items-center gap-8 text-sm font-semibold uppercase tracking-wider">
          <Link href="/stories" className="hover:opacity-60">
            Discoveries
          </Link>

          <Link href={`/story/${random.slug}`} className="hover:opacity-60">
            Random
          </Link>
        </nav>
      </div>
    </header>
  );
}