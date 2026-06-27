import Link from "next/link";
import type { Story } from "@/types/story";

export default function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/story/${story.slug}`}
      className="block rounded-2xl border p-6 transition hover:bg-gray-50"
    >
      <p className="text-sm uppercase tracking-widest text-gray-500">
        {story.category}
      </p>

      <h2 className="mt-2 text-3xl font-black">
        {story.title}
      </h2>

      <p className="mt-3 text-lg text-gray-700">
        {story.summary}
      </p>

      <p className="mt-4 text-sm text-gray-500">
        {story.readTime}
      </p>
    </Link>
  );
}