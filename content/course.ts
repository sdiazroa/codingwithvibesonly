import { architecture } from "@/content/lessons/4-architecture";
import { build } from "@/content/lessons/5-build";
import { design } from "@/content/lessons/3-design";
import { getReady } from "@/content/lessons/1-get-ready";
import { grow } from "@/content/lessons/7-grow";
import { habitTracker } from "@/content/lessons/1b-habit-tracker";
import { product } from "@/content/lessons/2-product";
import { ship } from "@/content/lessons/6-ship";
import type { Part } from "@/lib/types";

// Set up, build one example together, then do it for real with your own idea.
export const parts: Part[] = [getReady, habitTracker, product, design, architecture, build, ship, grow];
