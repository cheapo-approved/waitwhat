import PageShell from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-gray-500">
          About
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          We chase the stories that make you stop mid-scroll.
        </h1>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-gray-800">
          <p>
            Wait...What?! is about forgotten ideas, strange history, lost
            futures, and discoveries that make the world feel a little weirder
            than it did five minutes ago.
          </p>

          <p>
            We are not here to lecture. We are here to hand you a rabbit hole
            and say, “Okay...you’re not gonna believe this.”
          </p>

          <p>
            The goal is simple: leave the world a little more curious than we
            found it.
          </p>
        </div>
      </main>
    </PageShell>
  );
}