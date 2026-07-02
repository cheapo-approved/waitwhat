import StoryCard from "@/components/StoryCard";
import PageShell from "@/components/PageShell";
import { getStory, getAllStories } from "@/lib/getStory";

export default function Home() {
  const stories = getAllStories();
  const featured = stories.find((story) => story.featured) ?? stories[0];
  const remaining = stories.filter((story) => story.slug !== featured.slug);

  return (
    <PageShell>
      <main>
        <div className="mx-auto max-w-5xl px-5 py-3 sm:px-8 sm:py-4">

          <section className="mt-3">
            <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-gray-700">
              Featured Discovery
            </h2>

            <div className="mt-3">
              <StoryCard story={featured} featured />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-bold uppercase tracking-[0.12em] text-gray-700">
              More Discoveries
            </h2>

            <div className="mt-3 grid gap-6 md:grid-cols-2">
              {remaining.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </section>

        </div>
      </main>
    </PageShell>
  );
}