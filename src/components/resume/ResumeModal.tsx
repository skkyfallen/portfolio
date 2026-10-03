"use client";

import dynamic from "next/dynamic";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Download } from "lucide-react";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[60vh] items-center justify-center text-small text-muted-foreground">
      Loading viewer…
    </div>
  ),
});

export function ResumeModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex h-[90vh] w-[calc(100vw-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col border border-border bg-background shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-6">
            <div>
              <Dialog.Title className="text-h3 font-semibold text-foreground">
                Resume
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                View or download Kenechukwu Ekwonu&apos;s resume.
              </Dialog.Description>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/resume.pdf"
                download="Kenechukwu-Ekwonu-Resume.pdf"
                className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-small font-medium text-primary-foreground transition-colors duration-200 ease-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download
              </a>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close resume"
                  className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors duration-200 ease-out hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 md:p-6">
            {open && <PdfViewer />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
