import { submitVote } from "@/app/actions/vote";

export default function VoteButtons({
  storySlug,
  counts,
  userVote,
}: {
  storySlug: string;
  counts: { WAIT: number; WHAT: number };
  userVote?: "WAIT" | "WHAT";
}) {
  const total = counts.WAIT + counts.WHAT;
  const hasVoted = !!userVote;

  const waitPercent =
    total === 0 ? 0 : Math.round((counts.WAIT / total) * 100);

  const whatPercent =
    total === 0 ? 0 : Math.round((counts.WHAT / total) * 100);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-2 gap-4">
        <form action={submitVote.bind(null, storySlug, "WAIT")}>
          <button
            disabled={hasVoted}
            className="w-full cursor-pointer rounded-xl border px-4 py-5 text-center transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            <span className="block text-3xl">🤔</span>
            <span className="mt-2 block font-black">WAIT...</span>
            <span className="mt-1 block text-sm text-gray-500">
              I was thinking.
            </span>
          </button>
        </form>

        <form action={submitVote.bind(null, storySlug, "WHAT")}>
          <button
            disabled={hasVoted}
            className="w-full cursor-pointer rounded-xl bg-black px-4 py-5 text-center text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            <span className="block text-3xl">🤯</span>
            <span className="mt-2 block font-black">WHAT?!</span>
            <span className="mt-1 block text-sm text-gray-300">
              My mind was blown.
            </span>
          </button>
        </form>
      </div>

      {!hasVoted && (
        <p className="mt-4 text-center text-sm text-gray-500">
          Vote to see where everyone else landed.
        </p>
      )}

      {hasVoted && (
        <div className="mt-8 space-y-5">
          <h3 className="text-center text-sm font-black uppercase tracking-widest text-gray-500">
            The Community
          </h3>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span>🤔 WAIT...</span>
              <span>{waitPercent}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gray-900 transition-all duration-500"
                style={{ width: `${waitPercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span>🤯 WHAT?!</span>
              <span>{whatPercent}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gray-500 transition-all duration-500"
                style={{ width: `${whatPercent}%` }}
              />
            </div>
          </div>

          <p className="pt-2 text-center text-sm text-gray-500">
            {total.toLocaleString()}{" "}
            {total === 1 ? "curious person voted." : "curious people voted."}
          </p>

          <p className="text-center text-sm text-gray-500">
            ✓ You voted{" "}
            <strong>{userVote === "WAIT" ? "🤔 WAIT..." : "🤯 WHAT?!"}</strong>
          </p>
        </div>
      )}
    </div>
  );
}