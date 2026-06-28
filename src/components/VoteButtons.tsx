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
  return (
    <div className="mt-10">
      <div className="flex gap-4">
        <form action={submitVote.bind(null, storySlug, "WAIT")}>
          <button
            disabled={!!userVote}
            className="cursor-pointer rounded-xl border px-8 py-4 font-bold transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            WAIT... {counts.WAIT}
          </button>
        </form>

        <form action={submitVote.bind(null, storySlug, "WHAT")}>
          <button
            disabled={!!userVote}
            className="cursor-pointer rounded-xl bg-black px-8 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            WHAT?! {counts.WHAT}
          </button>
        </form>
      </div>

      {userVote && (
        <p className="mt-4 text-sm text-gray-500">
          ✓ You voted{" "}
          <strong>{userVote === "WAIT" ? "WAIT..." : "WHAT?!"}</strong>
        </p>
      )}
    </div>
  );
}