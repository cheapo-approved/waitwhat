import { submitVote } from "@/app/actions/vote";

export default function VoteButtons({
  storySlug,
  counts,
}: {
  storySlug: string;
  counts: {
    WAIT: number;
    WHAT: number;
  };
}) {
  return (
    <div className="mt-10 flex gap-4">
      <form action={submitVote.bind(null, storySlug, "WAIT")}>
        <button className="rounded-xl border px-8 py-4 font-bold">
          WAIT {counts.WAIT}
        </button>
      </form>

      <form action={submitVote.bind(null, storySlug, "WHAT")}>
        <button className="rounded-xl bg-black px-8 py-4 font-bold text-white">
          WHAT {counts.WHAT}
        </button>
      </form>
    </div>
  );
}