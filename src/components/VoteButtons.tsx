"use client";

import { useState, useTransition } from "react";
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
  const [currentCounts, setCurrentCounts] = useState(counts);
  const [currentVote, setCurrentVote] = useState<Vote | undefined>(userVote);

  function vote(v: Vote) {
    if (pending || currentVote === v) return;

    startTransition(async () => {
      const result = await submitVote(storySlug, v);

      setCurrentCounts(result.counts);
      setCurrentVote(result.userVote);
    });
  }

  const total = currentCounts.WAIT + currentCounts.WHAT;

  function percent(v: Vote) {
    if (total === 0) return 0;
    return Math.round((currentCounts[v] / total) * 100);
  }

  function SymbolMeter({
    type,
    percentValue,
  }: {
    type: Vote;
    percentValue: number;
  }) {
    const totalSymbols = 12;
    const filledSymbols =
      percentValue === 0
        ? 0
        : Math.max(1, Math.round((percentValue / 100) * totalSymbols));

    return (
      <div className="flex flex-1 items-center gap-1.5 overflow-hidden">
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
                filled ? "opacity-80" : "opacity-15"
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
    const selected = currentVote === voteType;
    const otherSelected = currentVote && !selected;
    const percentValue = percent(voteType);
    const votingClosed = pending || selected;

    return (
      <button
        type="button"
        onClick={() => vote(voteType)}
        disabled={pending || selected}
        aria-pressed={selected}
        className={`group w-full rounded-xl border px-3.5 py-2 text-left transition-all duration-200 ${
  pending
    ? "cursor-wait"
    : selected
      ? "cursor-default"
      : "cursor-pointer hover:-translate-y-0.5 hover:border-black hover:shadow-md"
} ${
          selected
            ? "border-black bg-black text-white shadow-md"
            : "border-stone-200 bg-white text-gray-900"
        } ${otherSelected ? "opacity-60" : ""}`}
      >
        <div className="flex items-center justify-between gap-4">
          <img
            src={logoSrc}
            alt={logoAlt}
            className={`h-[2.55rem] w-auto max-w-[170px] object-contain object-left sm:h-[3rem] ${
              selected ? "invert" : ""
            }`}
          />

          <span
            className={`text-xl font-black leading-none transition ${
              selected
                ? "text-white"
                : "text-stone-300 group-hover:text-black"
            }`}
          >
            {selected ? "✓" : pending ? "…" : "→"}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2.5">
          <p
            className={`min-w-8 text-sm font-black ${
              selected ? "text-white" : "text-gray-900"
            }`}
          >
            {percentValue}%
          </p>

          <SymbolMeter type={voteType} percentValue={percentValue} />
        </div>

        <p
          className={`mt-1 text-xs ${
            selected ? "text-white/75" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      </button>
    );
  }

  return (
    <div className="mx-auto mt-3 max-w-xl rounded-2xl border border-stone-200 bg-stone-50/40 p-2.5 shadow-sm">
      <div className="space-y-2">
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