import { db } from "@/db";
import { votes } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function addVote(storySlug: string, vote: "WAIT" | "WHAT") {
  await db.insert(votes).values({
    storySlug,
    vote,
    createdAt: new Date(),
  });
}

export async function getVoteCounts(storySlug: string) {
  const rows = await db
    .select({
      vote: votes.vote,
      count: sql<number>`count(*)`,
    })
    .from(votes)
    .where(eq(votes.storySlug, storySlug))
    .groupBy(votes.vote);

  return {
    WAIT: rows.find((row) => row.vote === "WAIT")?.count ?? 0,
    WHAT: rows.find((row) => row.vote === "WHAT")?.count ?? 0,
  };
}