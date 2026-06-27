import Link from "next/link";
import { getAllStories } from "@/lib/getStory";

export default function StoriesPage() {
    const stories = getAllStories();  
    return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-8 py-20">
        <Link href="/" className="text-sm text-gray-500">
          ← WAITWHAT
        </Link>

        <h1 className="mt-10 text-5xl font-black">Discoveries</h1>

        <div className="mt-12 space-y-6">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/story/${story.slug}`}
              className="block rounded-2xl border p-6 hover:bg-gray-50"
            >
              <p className="text-sm uppercase tracking-widest text-gray-500">
                {story.category}
              </p>
              <h2 className="mt-2 text-3xl font-black">{story.title}</h2>
              <p className="mt-2 text-gray-500">{story.readTime}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}