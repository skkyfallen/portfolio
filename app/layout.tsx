import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/layout/ThemeProvider";
import { RightNav } from "@/src/components/layout/RightNav";
import { MotionProvider } from "@/src/components/layout/MotionProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/src/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kenechukwu Ekwonu — Cybersecurity Graduate Student",
    template: "%s — Kenechukwu Ekwonu",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "cybersecurity",
    "information assurance",
    "security operations",
    "SIEM",
    "vulnerability assessment",
    "Active Directory",
    "AWS",
    "Python",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "Kenechukwu Ekwonu — Cybersecurity Graduate Student",
    description: SITE_DESCRIPTION,
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kenechukwu Ekwonu — Cybersecurity Graduate Student",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenechukwu Ekwonu — Cybersecurity Graduate Student",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kenechukwu Ekwonu — Cybersecurity Graduate Student",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-background px-4 py-2 text-small font-medium text-foreground ring-1 ring-border focus:not-sr-only focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Skip to content
          </a>
          <RightNav />
          <div className="min-h-full pb-20 md:pb-0 md:pr-16">
            <main id="main">
              <MotionProvider>{children}</MotionProvider>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
