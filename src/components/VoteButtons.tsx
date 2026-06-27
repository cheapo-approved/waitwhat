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
            className="rounded-xl border px-8 py-4 font-bold disabled:opacity-50"
          >
            WAIT... {counts.WAIT}
          </button>
        </form>

        <form action={submitVote.bind(null, storySlug, "WHAT")}>
          <button
            disabled={!!userVote}
            className="rounded-xl bg-black px-8 py-4 font-bold text-white disabled:opacity-50"
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