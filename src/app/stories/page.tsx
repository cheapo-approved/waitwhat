import Link from "next/link";
import StoryCard from "@/components/StoryCard";
import { getAllStories } from "@/lib/getStory";

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-8 py-20">
        <Link href="/" className="text-sm text-gray-500">
          ← WAITWHAT
        </Link>

        <h1 className="mt-10 text-5xl font-black">
          Discoveries
        </h1>

        <div className="mt-12 space-y-6">
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </div>
    </main>
  );
}