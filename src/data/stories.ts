import type { Story } from "@/types/story";
import theStones from "@/data/stories/the-stones";
import { romanConcrete } from "@/data/stories/roman-concrete";
import { gameline } from "@/data/stories/gameline";
import { antikythera } from "@/data/stories/antikythera";
import { rcaVideoDisc } from "@/data/stories/rca-video-disc";

export const stories: Story[] = [
  rcaVideoDisc,
  theStones,
  romanConcrete,
  gameline,
  antikythera,
];