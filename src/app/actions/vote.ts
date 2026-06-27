"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { addVote } from "@/lib/votes";

export async function submitVote(storySlug: string, vote: "WAIT" | "WHAT") {
  const cookieStore = await cookies();
  const cookieName = `waitwhat-voted-${storySlug}`;

  const existingVote = cookieStore.get(cookieName);

  if (existingVote) {
    return;
  }

  await addVote(storySlug, vote);

  cookieStore.set(cookieName, vote, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath(`/story/${storySlug}`);
}