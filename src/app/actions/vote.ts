"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { addVote, getVoteCounts } from "@/lib/votes";

async function getOrCreateVoterId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("waitwhat_voter_id")?.value;

  if (existing) return existing;

  const voterId = crypto.randomUUID();

  cookieStore.set("waitwhat_voter_id", voterId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });

  return voterId;
}

export async function submitVote(storySlug: string, vote: "WAIT" | "WHAT") {
  const voterId = await getOrCreateVoterId();

  await addVote(storySlug, vote, voterId);

  const counts = await getVoteCounts(storySlug);

  revalidatePath(`/story/${storySlug}`);
  revalidatePath("/");

  return {
    counts,
    userVote: vote,
  };
}