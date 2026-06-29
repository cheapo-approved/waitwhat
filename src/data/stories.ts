import type { Story } from "@/types/story";
import theStones from "@/data/stories/the-stones";
import { romanConcrete } from "@/data/stories/roman-concrete";
import { gameline } from "@/data/stories/gameline";
import { antikythera } from "@/data/stories/antikythera";
import { rcaVideoDisc } from "@/data/stories/rca-video-disc";
import { dancingPlague } from "@/data/stories/dancing-plague";

export const stories: Story[] = [
  dancingPlague,
  rcaVideoDisc,
  theStones,
  romanConcrete,
  gameline,
  antikythera,
];