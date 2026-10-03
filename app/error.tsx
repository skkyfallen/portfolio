"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary.
 *
 * This page mounts several heavy client islands (lazy react-pdf with a
 * web worker, motion-driven reveals). Any of them can throw at runtime — for
 * example a blocked worker fetch or a PDF parse failure. Without a boundary,
 * React unmounts the whole tree and the visitor gets a blank page.
 *
 * Styled with the same tokens as the rest of the site so it reads as part of
 * the same system rather than a browser default.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the detail in the console for debugging; never show it to visitors.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="text-h2 font-bold tracking-tight text-foreground">
        This section failed to load.
      </h1>
      <p className="max-w-md text-body leading-relaxed text-muted-foreground">
        An unexpected error interrupted the page. You can try again, or jump
        straight to the resume PDF.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center rounded-md bg-primary px-6 text-small font-medium text-primary-foreground transition-colors duration-200 ease-out hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Try again
        </button>
        <a
          href="/resume.pdf"
          download="Kenechukwu-Ekwonu-Resume.pdf"
          className="inline-flex h-12 items-center rounded-md border border-border bg-background px-6 text-small font-medium text-foreground transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Download resume
        </a>
      </div>
    </main>
  );
}