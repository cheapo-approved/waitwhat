import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import PageShell from "@/components/PageShell";
import VoteButtons from "@/components/VoteButtons";
import ShareButtons from "@/components/ShareButtons";
import { getAllStories, getStory } from "@/lib/getStory";
import { getVoteCounts, getUserVote } from "@/lib/votes";
import { notFound } from "next/navigation";
import type { StoryImage as StoryImageType } from "@/types/story";

const siteUrl = "https://waitwhat.media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) {
    return { title: "Story Not Found" };
  }

  const imageUrl = story.hero?.src
    ? `${siteUrl}${story.hero.src}`
    : `${siteUrl}/brand/waitwhat-logo.png`;

  const storyUrl = `${siteUrl}/story/${story.slug}`;

  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: storyUrl },
    openGraph: {
      title: story.title,
      description: story.summary,
      url: storyUrl,
      siteName: "Wait...What?!",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: story.hero?.alt ?? story.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.summary,
      images: [imageUrl],
    },
  };
}

const imageKindLabels: Record<string, string> = {
  curator: "Curator's Note",
  archive: "From the Archive",
  field: "Field Photograph",
  reconstruction: "Artist's Reconstruction",
  artifact: "Museum Collection",
};

const imageKindStyles: Record<string, string> = {
  curator: "text-stone-500",
  archive: "text-amber-700",
  field: "text-emerald-700",
  reconstruction: "text-sky-700",
  artifact: "text-violet-700",
};

function StoryImageBlock({
  image,
}: {
  image: StoryImageType & { kind?: string };
}) {
  const imageKind = image.kind;
  const label = imageKind ? imageKindLabels[imageKind] : undefined;
  const labelStyle = imageKind
    ? imageKindStyles[imageKind] ?? "text-stone-500"
    : "text-stone-500";

  return (
    <figure className="my-6 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm sm:my-8">
      <div className="overflow-hidden bg-stone-100 p-2 sm:p-3">
        <img
          src={image.src}
          alt={image.alt}
          className="h-auto w-full rounded-2xl"
        />
      </div>

      <figcaption className="border-t border-stone-200 px-5 py-3 text-center sm:px-6 sm:py-4">
        {label && (
          <p
            className={`text-[0.68rem] font-bold uppercase tracking-[0.22em] ${labelStyle}`}
          >
            {label}
          </p>
        )}

        <p
          className={
            label
              ? "mx-auto mt-2 max-w-2xl text-sm italic leading-6 text-stone-600"
              : "mx-auto max-w-2xl text-sm italic leading-6 text-stone-600"
          }
        >
          {image.caption}
        </p>
      </figcaption>
    </figure>
  );
}

function cleanParagraph(paragraph: string) {
  return paragraph.replace(/\*\*/g, "");
}

function isImpactLine(paragraph: string) {
  const cleaned = cleanParagraph(paragraph);

  return (
    cleaned === "Wait...What?!" ||
    cleaned === "Wait...What?" ||
    cleaned === "Wait..." ||
    cleaned === "What?" ||
    cleaned === "Thunk."
  );
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStory(slug);

  if (!story) notFound();

  const cookieStore = await cookies();
  const voterId = cookieStore.get("waitwhat_voter_id")?.value;

  const counts = await getVoteCounts(story.slug);
  const userVote = await getUserVote(story.slug, voterId);

  const otherStories = getAllStories().filter(
    (item) => item.slug !== story.slug
  );

  const nextStory =
    otherStories.length > 0
      ? otherStories[Math.floor(Math.random() * otherStories.length)]
      : undefined;

  const imagesByIndex = new Map<number, StoryImageType & { kind?: string }>();

  for (const image of story.images ?? []) {
    if (typeof image.after === "number") {
      imagesByIndex.set(image.after, image);
    }
  }

  return (
    <PageShell>
      <main className="bg-white text-gray-900">
        <article>
          {story.hero && (
            <section className="mx-auto max-w-6xl px-5 pt-4 sm:px-8 sm:pt-8">
              <div className="block sm:hidden">
                <div className="overflow-hidden rounded-3xl bg-black shadow-sm">
                  <img
                    src={story.hero.src}
                    alt={story.hero.alt}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>

                <div className="mt-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-stone-500">
                    {story.category} • {story.readTime}
                  </p>

                  <h1 className="mt-2 text-4xl font-black leading-[0.95] tracking-tight text-stone-900">
                    {story.title}
                  </h1>

                  <p className="mt-3 text-lg leading-7 text-stone-600">
                    {story.summary}
                  </p>
                </div>
              </div>

              <div className="relative hidden overflow-hidden rounded-3xl bg-black shadow-sm sm:block">
                <img
                  src={story.hero.src}
                  alt={story.hero.alt}
                  className="aspect-[16/9] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                <div className="absolute inset-0 flex items-end p-12">
                  <div className="max-w-3xl text-white drop-shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/80">
                      {story.category} • {story.readTime}
                    </p>

                    <h1 className="mt-4 text-7xl font-black leading-none tracking-tight">
                      {story.title}
                    </h1>

                    <p className="mt-5 max-w-xl text-2xl font-medium leading-9 text-white/90">
                      {story.summary}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="mx-auto max-w-2xl bg-white px-5 pb-8 pt-10 text-gray-900 sm:px-8 sm:pb-10 sm:pt-12">
            <div className="space-y-3 text-lg leading-7 text-gray-900 sm:text-[1.08rem] sm:leading-8">
              {story.body.map((paragraph, index) => {
                const imageAfterParagraph = imagesByIndex.get(index);
                const cleanedParagraph = cleanParagraph(paragraph);
                const impact = isImpactLine(paragraph);

                return (
                  <div key={index}>
                    <p
                      className={
                        impact
                          ? "pt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl"
                          : ""
                      }
                    >
                      {cleanedParagraph}
                    </p>

                    {imageAfterParagraph && (
                      <StoryImageBlock image={imageAfterParagraph} />
                    )}
                  </div>
                );
              })}
            </div>

            <section className="mt-8">
              <h2 className="text-2xl font-black tracking-tight">
                What's your take?
              </h2>

              <VoteButtons
                storySlug={story.slug}
                counts={counts}
                userVote={userVote}
              />
            </section>

            <section className="mt-4 border-t border-stone-200 pt-4">
              <ShareButtons title={story.title} slug={story.slug} />
            </section>

            {nextStory && (
              <section className="mt-6 border-t border-stone-200 pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-stone-500">
                  Next Discovery
                </p>

                <Link
                  href={`/story/${nextStory.slug}`}
                  className="group mt-2 flex items-center justify-between gap-4 text-3xl font-black tracking-tight transition sm:text-4xl"
                >
                  <span>{nextStory.title}</span>

                  <span className="shrink-0 text-stone-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-black">
                    →
                  </span>
                </Link>
              </section>
            )}
          </section>
        </article>
      </main>
    </PageShell>
  );
}
