import { redirect } from "next/navigation";
import { getAllStories } from "@/lib/getStory";

export const dynamic = "force-dynamic";

export default function RandomPage() {
  const stories = getAllStories();
  const randomStory = stories[Math.floor(Math.random() * stories.length)];

  redirect(`/story/${randomStory.slug}`);
}