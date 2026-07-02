import type { Story } from "@/types/story";
import theStones from "@/data/stories/the-stones";
//import { romanConcrete } from "@/data/stories/roman-concrete";
import { gameline } from "@/data/stories/gameline";
import { antikythera } from "@/data/stories/antikythera";
import { rcaVideoDisc } from "@/data/stories/rca-video-disc";
import { dancingPlague } from "@/data/stories/dancing-plague";
import { acousticKitty } from "@/data/stories/acoustic-kitty";
import { explodingWhale } from "@/data/stories/exploding-whale";
import { emuWar } from "@/data/stories/emu-war";
import { timothyDexter } from "@/data/stories/timothy-dexter";
import { dymaxion } from "@/data/stories/dymaxion";

export const stories: Story[] = [
  dymaxion,
  timothyDexter,
  emuWar,
  explodingWhale,
  acousticKitty,
  dancingPlague,
  rcaVideoDisc,
  theStones,
  //romanConcrete,
  gameline,
  antikythera,
];