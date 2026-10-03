import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/about",
      destination: "/#about",
      permanent: true,
    },
    {
      source: "/resume",
      destination: "/#resume",
      permanent: true,
    },
    {
      source: "/contact",
      destination: "/#contact",
      permanent: true,
    },
  ],
};

export default nextConfig;
