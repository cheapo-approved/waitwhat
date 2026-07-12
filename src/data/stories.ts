import type { Story } from "@/types/story";
import theStones from "@/data/stories/the-stones";
import { romanConcrete } from "@/data/stories/roman-concrete";
import { gameline } from "@/data/stories/gameline";
import { antikythera } from "@/data/stories/antikythera";
import { rcaVideoDisc } from "@/data/stories/rca-video-disc";
import { dancingPlague } from "@/data/stories/dancing-plague";
import { acousticKitty } from "@/data/stories/acoustic-kitty";
import { explodingWhale } from "@/data/stories/exploding-whale";
import { emuWar } from "@/data/stories/emu-war";
import { timothyDexter } from "@/data/stories/timothy-dexter";
import { dymaxion } from "@/data/stories/dymaxion";
import { donaldKendall } from "@/data/stories/donald-kendall";
import { poyais } from "@/data/stories/poyais";
import { thomasCrapper } from "@/data/stories/thomas-crapper";
import { hitchbot } from "./stories/hitchbot";
import { brat } from "./stories/brat";

export const stories: Story[] = [
  brat,
  hitchbot,
  brat,
  thomasCrapper,
  poyais,
  donaldKendall,
  timothyDexter,
  explodingWhale,
  gameline,
  acousticKitty,
  romanConcrete,
  antikythera,
  theStones,
  emuWar,
  dancingPlague,
  rcaVideoDisc,
  dymaxion,
];