"use client";

import { useOptimistic, useTransition } from "react";
import { submitVote } from "@/app/actions/vote";

type Vote = "WAIT" | "WHAT";

const whatFragments = [
  "/images/vote/what-fragment-1.png",
  "/images/vote/what-fragment-2.png",
  "/images/vote/what-fragment-3.png",
  "/images/vote/what-fragment-4.png",
  "/images/vote/what-fragment-5.png",
];

export default function VoteButtons({
  storySlug,
  counts,
  userVote,
}: {
  storySlug: string;
  counts: { WAIT: number; WHAT: number };
  userVote?: Vote;
}) {
  const [pending, startTransition] = useTransition();

  const [optimistic, addVote] = useOptimistic(
    { counts, userVote },
    (state, vote: Vote) => {
      const next = { counts: { ...state.counts }, userVote: vote };
      if (state.userVote) next.counts[state.userVote]--;
      next.counts[vote]++;
      return next;
    }
  );

  function vote(v: Vote) {
    if (pending) return;

    startTransition(async () => {
      addVote(v);
      await submitVote(storySlug, v);
    });
  }

  const total = optimistic.counts.WAIT + optimistic.counts.WHAT;

  function percent(v: Vote) {
    if (total === 0) return 0;
    return Math.round((optimistic.counts[v] / total) * 100);
  }

  function SymbolMeter({
    type,
    percentValue,
  }: {
    type: Vote;
    percentValue: number;
  }) {
    const totalSymbols = 14;
    const filledSymbols = Math.max(
      1,
      Math.round((percentValue / 100) * totalSymbols)
    );

    return (
      <div className="flex flex-1 items-center gap-1 overflow-hidden">
        {Array.from({ length: totalSymbols }).map((_, index) => {
          const filled = index < filledSymbols;
          const src =
            type === "WAIT"
              ? "/images/vote/wait-pawn.png"
              : whatFragments[index % whatFragments.length];

          return (
            <img
              key={index}
              src={src}
              alt=""
              className={`h-3.5 w-3.5 shrink-0 object-contain transition-all duration-500 sm:h-4 sm:w-4 ${
                filled ? "opacity-90" : "opacity-15"
              }`}
            />
          );
        })}
      </div>
    );
  }

  function VoteChoice({
    voteType,
    logoSrc,
    logoAlt,
    description,
  }: {
    voteType: Vote;
    logoSrc: string;
    logoAlt: string;
    description: string;
  }) {
    const selected = optimistic.userVote === voteType;
    const otherSelected = optimistic.userVote && !selected;
    const percentValue = percent(voteType);

    return (
      <button
        onClick={() => vote(voteType)}
        disabled={pending}
        className={`w-full rounded-3xl border px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed ${
          selected
            ? "border-black bg-white shadow-lg ring-2 ring-black"
            : "border-stone-200 bg-white"
        } ${otherSelected ? "opacity-60" : ""}`}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-[4.6rem] w-auto max-w-full object-contain object-left sm:h-[5.6rem]"
        />

        <div className="mt-4 flex items-center gap-3">
          <p className="min-w-10 text-lg font-black text-gray-900 sm:min-w-12 sm:text-xl">
            {percentValue}%
          </p>

          <SymbolMeter type={voteType} percentValue={percentValue} />
        </div>

        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-3xl border border-stone-200 bg-stone-50/40 p-4 shadow-sm sm:p-5">
      <div className="space-y-3">
        <VoteChoice
          voteType="WAIT"
          logoSrc="/images/vote/wait.png"
          logoAlt="WAIT..."
          description="I saw that coming."
        />

        <VoteChoice
          voteType="WHAT"
          logoSrc="/images/vote/what.png"
          logoAlt="WHAT?!"
          description="No... not in my timeline."
        />
      </div>
    </div>
  );
}