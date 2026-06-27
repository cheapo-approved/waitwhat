import StoryCard from "@/components/StoryCard";
import PageShell from "@/components/PageShell";
import { getAllStories } from "@/lib/getStory";

export default function Home() {
  const stories = getAllStories();
  const featured = stories.find((story) => story.featured) ?? stories[0];
  const otherStories = stories.filter((story) => story.slug !== featured.slug);

  return (
    <PageShell>
      <main>
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Recover wonder. One discovery at a time.
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-7xl">
            WAITWHAT
          </h1>

          <p className="mt-8 text-xl sm:text-2xl">
            Stories that break your timeline.
          </p>

          <div className="mt-14 sm:mt-16">
            <h2 className="mb-6 text-3xl font-black sm:text-4xl">
              Featured Discovery
            </h2>
            <StoryCard story={featured} />
          </div>

          {otherStories.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-3xl font-black sm:text-4xl">
                More Discoveries
              </h2>

              <div className="space-y-6">
                {otherStories.map((story) => (
                  <StoryCard key={story.slug} story={story} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </PageShell>
  );
}