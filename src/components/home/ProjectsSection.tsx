"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/src/data/projects";

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="scroll-mt-8 border-t border-border px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[360px_1fr]">
          <motion.div
            className="overflow-hidden"
            initial={shouldReduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <p className="font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground">
              [Work]
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <h2 className="text-h1 font-bold tracking-tight text-foreground">
                Projects
              </h2>
              <span
                className="font-mono text-display font-bold leading-[0.8] text-muted-foreground"
                aria-hidden="true"
              >
                03
              </span>
            </div>
            <div className="mt-6 h-1 w-12 bg-accent" aria-hidden="true" />
          </motion.div>

          <div className="space-y-6">
            {projects.map((project) => {
              const title = (
                <span className="inline-flex items-center gap-3">
                  {project.title}
                  {project.href && (
                    <ArrowUpRight
                      className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-background"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                  )}
                </span>
              );

              return (
                <motion.article
                  key={project.id}
                  initial={shouldReduceMotion ? "visible" : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={revealVariants}
                  className="group border border-border bg-background p-6 transition-colors duration-200 ease-out hover:bg-foreground hover:text-background md:p-8"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="text-h2 font-semibold tracking-tight text-foreground group-hover:text-background">
                        {project.href ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          >
                            {title}
                            <span className="sr-only">
                              {" "}
                              (opens in a new tab)
                            </span>
                          </a>
                        ) : (
                          title
                        )}
                      </h3>

                      <p className="mt-4 text-body leading-relaxed text-foreground group-hover:text-background">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center border border-border px-2.5 py-1 font-mono text-micro uppercase tracking-wider text-muted-foreground transition-colors duration-200 group-hover:border-background group-hover:text-background"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2 md:text-right">
                      <p className="font-mono text-micro uppercase tracking-widest text-muted-foreground group-hover:text-background">
                        {project.kind}
                      </p>
                      {project.period && (
                        <p className="font-mono text-micro uppercase tracking-wider text-muted-foreground group-hover:text-background">
                          {project.period}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
