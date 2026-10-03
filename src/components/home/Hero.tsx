"use client";

import { motion, useReducedMotion } from "motion/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const ruleVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-col justify-center px-6 py-24 md:px-12 lg:px-20"
    >
      <motion.div
        className="relative mx-auto w-full max-w-6xl"
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          {/* Main copy */}
          <div className="relative">
            {/* Cobalt structural rule */}
            <motion.div
              variants={ruleVariants}
              className="absolute left-0 top-0 hidden h-full w-1 origin-top bg-accent md:block"
              aria-hidden="true"
            />

            <div className="md:pl-8">
              <motion.p
                variants={itemVariants}
                className="font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground"
              >
                [Cybersecurity Graduate Student]
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="mt-6 break-words text-display font-bold leading-[0.85] tracking-tighter text-foreground"
              >
                Kenechukwu
                <br />
                Ekwonu
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-8 max-w-2xl text-h2 font-medium tracking-tight text-foreground md:text-h1"
              >
                Security Operations, Cloud and Technical Support
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-2xl text-body leading-relaxed text-muted-foreground"
              >
                Security operations, SIEM, vulnerability assessment, and cloud
                fundamentals. CompTIA Security+ and eJPT v2 certified.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#about"
                  className="inline-flex h-12 items-center gap-2 bg-primary px-6 text-small font-medium text-primary-foreground transition-colors duration-200 ease-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read profile
                </a>
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center gap-2 border border-border bg-background px-6 text-small font-medium text-foreground transition-colors duration-200 ease-out hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  View work
                </a>
              </motion.div>
            </div>
          </div>

          {/* Metadata column */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-0 md:flex-row md:gap-12 lg:flex-col lg:gap-0"
          >
            <div className="border-t border-border py-5 lg:py-6">
              <p className="font-mono text-micro uppercase tracking-[0.15em] text-muted-foreground">
                Location
              </p>
              <p className="mt-1 text-small font-medium text-foreground">
                Superior Township, MI
              </p>
            </div>
            <div className="border-t border-border py-5 lg:py-6">
              <p className="font-mono text-micro uppercase tracking-[0.15em] text-muted-foreground">
                Contact
              </p>
              <p className="mt-1 text-small font-medium text-foreground">
                kekwonu@emich.edu
              </p>
              <p className="mt-1 text-small font-medium text-foreground">
                (734) 465-6296
              </p>
            </div>
            <div className="border-t border-b border-border py-5 lg:py-6">
              <p className="font-mono text-micro uppercase tracking-[0.15em] text-muted-foreground">
                Certifications
              </p>
              <p className="mt-1 text-small font-medium text-foreground">
                CompTIA Security+
              </p>
              <p className="mt-1 text-small font-medium text-foreground">
                eJPT v2
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
