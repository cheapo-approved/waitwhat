import Link from "next/link";
import VoteButtons from "@/components/VoteButtons";
import { getStory } from "@/lib/getStory";
import { notFound } from "next/navigation";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-8 py-20">
        <Link href="/stories" className="text-sm text-gray-500">
          ← Discoveries
        </Link>

        <p className="mt-10 text-sm uppercase tracking-widest text-gray-500">
          {story.category}
        </p>

        <h1 className="mt-3 text-5xl font-black">{story.title}</h1>

        <p className="mt-2 text-gray-500">{story.readTime}</p>

        <div className="mt-12 space-y-6 text-xl leading-9">
          {story.body.map((paragraph, index) => (
            <p
              key={index}
              className={
                index === story.body.length - 1 ? "font-bold text-2xl" : ""
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <hr className="my-16" />

        <h2 className="text-3xl font-bold">Where was I?</h2>

        <VoteButtons />
      </div>
    </main>
  );
}