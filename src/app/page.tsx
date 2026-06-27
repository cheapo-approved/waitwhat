import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import { getAllStories } from "@/lib/getStory";

export default function Home() {
  const stories = getAllStories();
  const featured = stories.find((story) => story.featured) ?? stories[0];

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-5xl px-8 py-20">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Recover wonder. One discovery at a time.
        </p>

        <h1 className="mt-3 text-7xl font-black tracking-tight">
          WAITWHAT
        </h1>

        <p className="mt-8 text-2xl">
          Stories that break your timeline.
        </p>

        <div className="mt-16">
          <h2 className="mb-6 text-4xl font-black">Featured Discovery</h2>

          <StoryCard story={featured} />
        </div>

        <div className="mt-12">
          <Link
            href="/stories"
            className="rounded-xl border px-6 py-3 font-bold hover:bg-gray-50"
          >
            Browse all discoveries →
          </Link>
        </div>
      </div>
    </main>
  );
}