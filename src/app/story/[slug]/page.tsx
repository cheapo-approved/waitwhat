import Image from "next/image";
import VoteButtons from "@/components/VoteButtons";
import PageShell from "@/components/PageShell";
import { getStory } from "@/lib/getStory";
import { getVoteCounts } from "@/lib/votes";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

function StoryImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-16">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-gray-100">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
      <figcaption className="mt-4 text-center text-sm italic text-gray-500">
        {caption}
      </figcaption>
    </figure>
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
  const cookieStore = await cookies();
  const userVote = cookieStore.get(`waitwhat-voted-${story.slug}`)?.value as
    | "WAIT"
    | "WHAT"
    | undefined;

  const images = story.images ?? [];

  return (
    <PageShell>
      <main>
        <article>
          {story.hero && (
            <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
              <StoryImage {...story.hero} />
            </section>
          )}

          <header className="mx-auto max-w-3xl px-5 pb-8 pt-4 text-center sm:px-8">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              {story.category} • {story.readTime}
            </p>

            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              {story.title}
            </h1>

            <p className="mt-8 text-xl leading-8 text-gray-600 sm:text-2xl sm:leading-9">
              {story.summary}
            </p>
          </header>

          <section className="mx-auto max-w-2xl px-5 pb-16 pt-8 sm:px-8">
            <div className="space-y-7 text-xl leading-9">
              {story.body.map((paragraph, index) => {
                const showImage =
                  (index === 21 && images[0]) ||
                  (index === 38 && images[1]) ||
                  (index === 63 && images[2]);

                return (
                  <div key={index}>
                    <p
                      className={
                        paragraph === "Wait..." ||
                        paragraph === "What?" ||
                        paragraph === "Thunk."
                          ? "text-3xl font-black"
                          : ""
                      }
                    >
                      {paragraph}
                    </p>

                    {showImage && (
                      <StoryImage
                        src={
                          index === 21
                            ? images[0].src
                            : index === 38
                              ? images[1].src
                              : images[2].src
                        }
                        alt={
                          index === 21
                            ? images[0].alt
                            : index === 38
                              ? images[1].alt
                              : images[2].alt
                        }
                        caption={
                          index === 21
                            ? images[0].caption
                            : index === 38
                              ? images[1].caption
                              : images[2].caption
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <hr className="my-16" />

            <h2 className="text-4xl font-black">Where Was I?</h2>

            <VoteButtons
              storySlug={story.slug}
              counts={counts}
              userVote={userVote}
            />
          </section>
        </article>
      </main>
    </PageShell>
  );
}