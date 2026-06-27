"use server";

import { revalidatePath } from "next/cache";
import { addVote } from "@/lib/votes";

export async function submitVote(storySlug: string, vote: "WAIT" | "WHAT") {
  await addVote(storySlug, vote);
  revalidatePath(`/story/${storySlug}`);
}