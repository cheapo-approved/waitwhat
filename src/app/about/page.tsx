import PageShell from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-gray-500">
          About
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          Why does Wait...What?! exist?
        </h1>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-gray-800">
          <p>
            The world hasn't become less interesting.
          </p>

          <p>
            We've just stopped looking.
          </p>

          <p>
            Wait...What?! exists to help people rediscover wonder.
          </p>

          <p>
            Every story begins with a question.
          </p>

          <p>
            Every discovery ends with another.
          </p>

          <p>
            We don't chase outrage.
          </p>

          <p>
            We don't chase breaking news.
          </p>

          <p>
            We chase the moments that make you stop...
            <br />
            smile...
            <br />
            and say...
          </p>

          <p className="text-2xl font-black">
            Wait...What?!
          </p>

          <p>
            Welcome.
          </p>

          <p>
            Let's go find something unbelievable.
          </p>
        </div>
      </main>
    </PageShell>
  );
}