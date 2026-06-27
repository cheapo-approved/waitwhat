import { redirect } from "next/navigation";
import { getAllStories } from "@/lib/getStory";

export default function RandomPage() {
  const stories = getAllStories();
  const randomStory = stories[Math.floor(Math.random() * stories.length)];

  redirect(`/story/${randomStory.slug}`);
}