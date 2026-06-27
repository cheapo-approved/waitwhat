export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-3xl px-8 py-20">

        <p className="text-sm uppercase tracking-widest text-gray-500">
          Engineering & Science
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Moon Trees
        </h1>

        <p className="mt-2 text-gray-500">
          4 min read
        </p>

        <div className="mt-12 space-y-6 text-xl leading-9">

          <p>
            In 1971, NASA quietly sent hundreds of tree seeds to the Moon.
          </p>

          <p>
            They orbited the Moon aboard Apollo 14 while astronaut Stuart Roosa
            carried them as part of a forestry experiment.
          </p>

          <p>
            After returning to Earth, the seeds were planted across the United
            States.
          </p>

          <p>
            Many are still alive today.
          </p>

          <p className="font-bold text-2xl">
            There are trees growing today that have been to the Moon.
          </p>

        </div>

        <hr className="my-16" />

        <h2 className="text-3xl font-bold">
          Where was I?
        </h2>

        <div className="mt-10 flex gap-4">

          <button className="rounded-xl border px-8 py-4">
            WAIT
          </button>

          <button className="rounded-xl bg-black px-8 py-4 text-white">
            WHAT
          </button>

        </div>

      </div>
    </main>
  );
}