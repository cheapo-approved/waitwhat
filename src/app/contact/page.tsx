import PageShell from "@/components/PageShell";

export default function ContactPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-gray-500">
          Contact
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          Know a story we should dig into?
        </h1>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-gray-800">
          <p>
            We're always looking for forgotten inventions, bizarre history,
            unbelievable true stories, lost knowledge, strange documents, and
            the kind of discoveries that make people stop mid-conversation and
            say...
          </p>

          <p className="text-2xl font-black">
            Wait...What?!
          </p>

          <p>
            Have a story idea? Found an interesting rabbit hole? Just want to
            say hello?
          </p>

          <p>
            Reach us at{" "}
            <a
              href="mailto:hello@waitwhat.media"
              className="font-black underline decoration-2 underline-offset-4 hover:text-black"
            >
              hello@waitwhat.media
            </a>
          </p>

          <hr className="my-10 border-gray-200" />

          <h2 className="text-2xl font-black tracking-tight">
            Found an error?
          </h2>

          <p>
            Tell us.
          </p>

          <p>
            We'd rather be accurate than first. If we've missed something,
            misunderstood a source, or got a fact wrong, we'll gladly take
            another look.
          </p>
        </div>
      </main>
    </PageShell>
  );
}