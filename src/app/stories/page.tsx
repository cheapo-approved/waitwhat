import StoryCard from "@/components/StoryCard";
import PageShell from "@/components/PageShell";
import { getAllStories } from "@/lib/getStory";

export default function StoriesPage() {
  const stories = getAllStories();

  return (
    <PageShell>
      <main>
        <div className="mx-auto max-w-4xl px-8 py-20">
          <h1 className="text-5xl font-black">Discoveries</h1>

          <div className="mt-12 space-y-6">
            {stories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </main>
    </PageShell>
  );
}