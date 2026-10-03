"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ScanLine, Download } from "lucide-react";
import { ResumeModal } from "@/src/components/resume/ResumeModal";

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ResumeSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="resume"
        className="scroll-mt-8 border-t border-border px-6 py-24 md:px-12 lg:px-20"
      >
        <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[360px_1fr]">
          <motion.div
            className="overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
              <p className="font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground">
                [Experience]
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <h2 className="text-h1 font-bold tracking-tight text-foreground">
                  Resume
                </h2>
                <span
                  className="font-mono text-display font-bold leading-[0.8] text-muted-foreground"
                  aria-hidden="true"
                >
                  02
                </span>
              </div>
              <div className="mt-6 h-1 w-12 bg-accent" aria-hidden="true" />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between"
            >
              <div className="max-w-2xl">
                <p className="text-body leading-relaxed text-foreground">
                  View or download the full resume as a PDF. It covers
                  education, certifications, skills, and hands-on project
                  experience in security operations and cloud support.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex h-14 items-center gap-2 bg-accent px-8 text-small font-semibold text-accent-foreground transition-colors duration-200 ease-out hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <ScanLine
                      className="h-4 w-4"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                    Open resume
                  </button>
                  <a
                    href="/resume.pdf"
                    download="Kenechukwu-Ekwonu-Resume.pdf"
                    className="inline-flex h-14 items-center gap-2 border border-border bg-background px-8 text-small font-semibold text-foreground transition-colors duration-200 ease-out hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Download
                      className="h-4 w-4"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                    Download PDF
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="flex h-36 w-28 flex-col items-center justify-center border border-border bg-background text-muted-foreground">
                  <ScanLine
                    className="h-10 w-10"
                    aria-hidden="true"
                    strokeWidth={1.5}
                  />
                  <span className="mt-3 font-mono text-micro uppercase tracking-widest">
                    PDF
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ResumeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
