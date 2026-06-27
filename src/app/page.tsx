import Link from "next/link";
import { getAllStories } from "@/lib/getStory";

export default function Home() {
  const firstStory = getAllStories()[0];

  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="max-w-3xl text-center px-8">
        <p className="mb-6 text-sm uppercase tracking-widest text-gray-500">
          Where Was I?
        </p>

        <h1 className="text-7xl font-black tracking-tight">WAITWHAT</h1>

        <p className="mt-8 text-2xl">
          Recover wonder.
          <br />
          One discovery at a time.
        </p>

        <div className="mt-16 flex justify-center gap-4">
          <Link
            href={`/story/${firstStory.slug}`}
            className="rounded-xl bg-black px-8 py-4 text-lg font-bold text-white hover:opacity-90"
          >
            Start Exploring →
          </Link>

          <Link
            href="/stories"
            className="rounded-xl border px-8 py-4 text-lg font-bold hover:bg-gray-50"
          >
            Browse
          </Link>
        </div>
      </div>
    </main>
  );
}