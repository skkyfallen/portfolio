import type { MetadataRoute } from "next";
// Static metadata route: required for `output: "export"` (Cloudflare).
export const dynamic = "force-static";
import { SITE_URL } from "@/src/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
