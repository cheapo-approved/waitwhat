import PageShell from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
          The world hasn't become less interesting.
        </h1>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-gray-800">
          <p>
            We've just stopped looking.
          </p>

          <p>
            Wait...What?! is an independent publication dedicated to uncovering
            true stories that surprise, entertain, and make you see the world a
            little differently.
          </p>

          <p>
            Every story is carefully researched and written because we genuinely
            believe it's worth your time.
          </p>

          <p>
            No clickbait.
            <br />
            No conspiracy theories.
            <br />
            Just great stories.
          </p>

          <p>
            We hope you'll discover something that makes you stop...
            <br />
            smile...
            <br />
            and say...
          </p>

          <p className="text-2xl font-black">
            Wait...What?!
          </p>

          <p>
            Thanks for stopping by.
          </p>
        </div>
      </main>
    </PageShell>
  );
}