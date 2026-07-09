import PageShell from "@/components/PageShell";

export default function ContactPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">
          Contact
        </h1>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-gray-800">
          <p>
            Have a story that made you stop and say...
          </p>

          <p className="text-2xl font-black">
            Wait...What?!
          </p>

          <p>
            We'd love to hear about it.
          </p>

          <p>
            Whether it's forgotten history, an unbelievable invention, a strange
            coincidence, or a story that's too good not to share, send it our
            way.
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:hello@waitwhat.media"
              className="underline hover:no-underline"
            >
              hello@waitwhat.media
            </a>
          </p>

          <p>
            We read every message, although we may not be able to respond to
            all of them.
          </p>

          <p>
            Thanks for helping us uncover the next great story.
          </p>
        </div>
      </main>
    </PageShell>
  );
}