import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import VoteButtons from "@/components/VoteButtons";
import ShareButtons from "@/components/ShareButtons";
import { getStory } from "@/lib/getStory";
import { getVoteCounts } from "@/lib/votes";
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
    return {
      title: "Story Not Found",
    };
  }

  const imageUrl = story.hero?.src
    ? `${siteUrl}${story.hero.src}`
    : `${siteUrl}/brand/waitwhat-logo.png`;

  const storyUrl = `${siteUrl}/story/${story.slug}`;

  return {
    title: story.title,
    description: story.summary,
    alternates: {
      canonical: storyUrl,
    },
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
    <figure className="my-6 overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 shadow-sm sm:my-8">
      <div className="overflow-hidden bg-stone-100">
        <img src={image.src} alt={image.alt} className="h-auto w-full" />
      </div>

      <figcaption className="border-t border-stone-200 px-5 py-3 sm:px-6 sm:py-4">
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
              ? "mt-2 text-sm leading-6 text-stone-600"
              : "text-sm leading-6 text-stone-600"
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

  const counts = await getVoteCounts(story.slug);

  const imagesByIndex = new Map<number, StoryImageType & { kind?: string }>();

  for (const image of story.images ?? []) {
    if (typeof image.after === "number") {
      imagesByIndex.set(image.after, image);
    }
  }

  return (
    <PageShell>
      <main>
        <article>
          {story.hero && (
            <section className="mx-auto max-w-6xl px-5 pt-4 sm:px-8 sm:pt-8">
              <div className="relative overflow-hidden rounded-3xl bg-black shadow-sm">
                <img
                  src={story.hero.src}
                  alt={story.hero.alt}
                  className="aspect-[16/10] w-full object-cover object-center sm:aspect-[16/9]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="absolute inset-0 flex items-end p-5 pb-5 sm:p-12">
                  <div className="max-w-[92%] text-white drop-shadow-sm sm:max-w-3xl">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-white/80 sm:text-xs sm:tracking-[0.28em]">
                      {story.category} • {story.readTime}
                    </p>

                    <h1 className="mt-2 text-[2.45rem] font-black leading-[0.9] tracking-tight sm:mt-4 sm:text-7xl sm:leading-none">
                      {story.title}
                    </h1>

                    <p className="mt-3 max-w-xl text-sm font-medium leading-5 text-white/90 sm:mt-5 sm:text-2xl sm:leading-9">
                      {story.summary}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="mx-auto max-w-2xl px-5 pb-16 pt-10 sm:px-8 sm:pt-12">
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

            <section className="mt-12">
              <h2 className="text-2xl font-black tracking-tight">
                What's your take?
              </h2>

              <VoteButtons
                storySlug={story.slug}
                counts={counts}
                userVote={undefined}
              />
            </section>

            <ShareButtons title={story.title} slug={story.slug} />
          </section>
        </article>
      </main>
    </PageShell>
  );
}
