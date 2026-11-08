import type { MetadataRoute } from "next";
import { lessons } from "@/lib/course";

const base = "https://www.codingwithvibesonly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/prompts", ...lessons.map((l) => `/lessons/${l.slug}`)].map((path) => ({ url: `${base}${path}` }));
}
