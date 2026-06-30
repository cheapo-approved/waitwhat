"use client";

import { useState } from "react";

export default function ShareButtons({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/story/${slug}`
      : `https://waitwhat.media/story/${slug}`;

  async function share() {
    if (navigator.share) {
      await navigator.share({
        title,
        text: `Wait...what?! ${title}`,
        url,
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3 border-t border-stone-200 pt-6">
      <button
        onClick={share}
        className="rounded-full border border-stone-300 px-5 py-2 text-sm font-bold uppercase tracking-[0.15em] text-gray-800 transition hover:bg-black hover:text-white"
      >
        Share
      </button>

      <button
        onClick={copyLink}
        className="rounded-full border border-stone-300 px-5 py-2 text-sm font-bold uppercase tracking-[0.15em] text-gray-800 transition hover:bg-black hover:text-white"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}