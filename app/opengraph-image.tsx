import { ImageResponse } from "next/og";
import { SITE_LOCATION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/src/lib/site";

export const alt = "Kenechukwu Ekwonu — Cybersecurity Graduate Student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered at build time rather than per request. Required for `output: "export"`
// (the Cloudflare static deployment target), which rejects any route that is not
// explicitly static.
export const dynamic = "force-static";

const hostname = new URL(SITE_URL).host;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#f2f0e9",
          padding: "80px",
          fontFamily: "geist, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            color: "#a3a3a3",
            fontFamily: "geist-mono, monospace",
          }}
        >
          <span>PORTFOLIO</span>
          <span>{hostname}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 80,
              height: 8,
              backgroundColor: "#2563eb",
              marginBottom: 36,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 92,
              letterSpacing: -3,
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 34,
              color: "#f2f0e9",
            }}
          >
            Cybersecurity Graduate Student
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 26,
              color: "#a3a3a3",
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #262626",
            paddingTop: 32,
            fontSize: 22,
            color: "#a3a3a3",
            fontFamily: "geist-mono, monospace",
          }}
        >
          <span>{SITE_LOCATION}</span>
          <span>Security Operations, Cloud, Technical Support</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
