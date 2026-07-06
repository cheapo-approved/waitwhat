import { supabase } from "@/lib/supabase";

export type VoteChoice = "WAIT" | "WHAT";

export async function addVote(
  storySlug: string,
  vote: VoteChoice,
  voterId: string
) {
  const { error } = await supabase.from("story_votes").upsert(
    {
      story_slug: storySlug,
      vote: vote.toLowerCase(),
      voter_id: voterId,
    },
    {
      onConflict: "story_slug,voter_id",
    }
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function getVoteCounts(storySlug: string) {
  const { data, error } = await supabase
    .from("story_votes")
    .select("vote")
    .eq("story_slug", storySlug);

  if (error) {
    throw new Error(error.message);
  }

  return {
    WAIT: data.filter((row) => row.vote === "wait").length,
    WHAT: data.filter((row) => row.vote === "what").length,
  };
}

export async function getUserVote(storySlug: string, voterId?: string) {
  if (!voterId) return undefined;

  const { data, error } = await supabase
    .from("story_votes")
    .select("vote")
    .eq("story_slug", storySlug)
    .eq("voter_id", voterId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (data?.vote === "wait") return "WAIT";
  if (data?.vote === "what") return "WHAT";

  return undefined;
}