import { stories } from "@/data/stories";

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getAllStories() {
  return stories;
}