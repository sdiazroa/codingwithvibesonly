import { architecture } from "@/content/lessons/4-architecture";
import { build } from "@/content/lessons/5-build";
import { design } from "@/content/lessons/3-design";
import { getReady } from "@/content/lessons/1-get-ready";
import { grow } from "@/content/lessons/7-grow";
import { product } from "@/content/lessons/2-product";
import { ship } from "@/content/lessons/6-ship";
import type { Part } from "@/lib/types";

// The course, in order. The order is the lesson: product, design and architecture come before the build.
export const parts: Part[] = [getReady, product, design, architecture, build, ship, grow];
