import PageShell from "@/components/PageShell";
import { getStory } from "@/lib/getStory";
import { notFound } from "next/navigation";
import type { StoryImage as StoryImageType } from "@/types/story";

function StoryImageBlock({
  image,
  hero = false,
}: {
  image: StoryImageType;
  hero?: boolean;
}) {
  return (
    <figure className={hero ? "my-0" : "my-20"}>
      <div className="overflow-hidden rounded-3xl bg-gray-100">
        <img
          src={image.src}
          alt={image.alt}
          className={hero ? "aspect-video w-full object-cover" : "h-auto w-full"}
        />
      </div>

      <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm italic leading-6 text-gray-500">
        {image.caption}
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

  const imagesByIndex = new Map<number, StoryImageType>();

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
            <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
              <StoryImageBlock image={story.hero} hero />
            </section>
          )}

          <header className="mx-auto max-w-3xl px-5 pb-10 pt-14 text-center sm:px-8">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              {story.category} • {story.readTime}
            </p>

            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              {story.title}
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-gray-600 sm:text-2xl sm:leading-9">
              {story.summary}
            </p>
          </header>

          <section className="mx-auto max-w-2xl px-5 pb-16 pt-4 sm:px-8">
            <div className="space-y-8 text-xl leading-9">
              {story.body.map((paragraph, index) => {
                const imageAfterParagraph = imagesByIndex.get(index);

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

                    {imageAfterParagraph && (
                      <StoryImageBlock image={imageAfterParagraph} />
                    )}
                  </div>
                );
              })}
            </div>

            <hr className="my-20" />

            <section>
              <h2 className="text-4xl font-black">Where Was I?</h2>

              <div className="mt-10 flex gap-4">
                <button className="rounded-xl border px-8 py-4 font-bold">
                  WAIT...
                </button>

                <button className="rounded-xl bg-black px-8 py-4 font-bold text-white">
                  WHAT?!
                </button>
              </div>
            </section>
          </section>
        </article>
      </main>
    </PageShell>
  );
}