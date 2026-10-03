import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/site";

// The site is now a single-page application. All content lives on `/`.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
