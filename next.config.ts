import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop browsers from MIME-sniffing a response away from its
          // declared Content-Type (e.g. treating a .json as HTML).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Clickjacking defence. DENY also prevents embedding in iframes.
          { key: "X-Frame-Options", value: "DENY" },
          // Do not leak full URLs (including #section anchors) to third parties.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // This site needs none of these device capabilities.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Only meaningful once served over HTTPS; harmless otherwise.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
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
