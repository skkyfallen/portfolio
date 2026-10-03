import type { NextConfig } from "next";

/**
 * Fully static export, deployed to Cloudflare Workers Static Assets.
 *
 * `output: "export"` writes plain HTML/CSS/JS to `out/`, which Cloudflare
 * serves directly. No Worker script, no adapter, no runtime.
 *
 * NOTE: `headers()` and `redirects()` are deliberately absent. Next silently
 * drops both under `output: "export"`. They are implemented in `public/_headers`
 * and `public/_redirects`, which Next copies verbatim into `out/` and
 * Cloudflare parses natively.
 *
 * The site uses no `next/image`, so `images.unoptimized` is not required.
 */
const nextConfig: NextConfig = {
  output: "export",
};

export default nextConfig;