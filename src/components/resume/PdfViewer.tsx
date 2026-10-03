"use client";

import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function usePageWidth() {
  const [width, setWidth] = useState(() =>
    Math.min(800, typeof window !== "undefined" ? window.innerWidth - 64 : 800)
  );

  useEffect(() => {
    const update = () => {
      setWidth(Math.min(800, window.innerWidth - 64));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return width;
}

export default function PdfViewer() {
  const width = usePageWidth();

  return (
    <Document
      file="/resume.pdf"
      // react-pdf v11 defaults `suspense` to true, which makes the loader
      // suspend and propagates load/parse errors to the nearest React error
      // boundary. This app has no boundary, so a failure (or the first paint
      // before the worker is ready) threw and blanked the modal instead of
      // using the `loading`/`error` props below. Opting out restores them.
      suspense={false}
      loading={
        <div className="flex h-[60vh] items-center justify-center text-small text-muted-foreground">
          Loading resume…
        </div>
      }
      error={
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center text-small text-muted-foreground">
          <p>Could not load the resume.</p>
          <a
            href="/resume.pdf"
            download="Kenechukwu-Ekwonu-Resume.pdf"
            className="inline-flex h-11 items-center rounded-md bg-primary px-4 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Download PDF
          </a>
        </div>
      }
    >
      <Page
        pageNumber={1}
        width={width}
        renderTextLayer={false}
        renderAnnotationLayer={false}
      />
    </Document>
  );
}
