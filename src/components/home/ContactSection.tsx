"use client";

import type { ComponentType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import {
  contactDetails,
  socialLinks,
  type ContactDetailId,
  type SocialLinkId,
} from "@/src/data/contact";
import { GitHubIcon, LinkedInIcon } from "@/src/components/contact/SocialIcons";
import { ContactForm } from "@/src/components/contact/ContactForm";

const detailIcons: Record<ContactDetailId, LucideIcon> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
};

const socialIcons: Record<SocialLinkId, ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
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
              [Reach out]
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <h2 className="text-h1 font-bold tracking-tight text-foreground">
                Contact
              </h2>
              <span
                className="font-mono text-display font-bold leading-[0.8] text-muted-foreground"
                aria-hidden="true"
              >
                04
              </span>
            </div>
            <div className="mt-6 h-1 w-12 bg-accent" aria-hidden="true" />
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <motion.div
              initial={shouldReduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <p className="max-w-md text-body leading-relaxed text-muted-foreground">
                Send a message with the form, or reach me directly through any of
                the details below.
              </p>

              <address className="not-italic mt-10">
                <ul className="space-y-0">
                  {contactDetails.map((detail) => {
                    const Icon = detailIcons[detail.id];

                    return (
                      <li
                        key={detail.id}
                        className="flex items-start gap-4 border-t border-border py-6 first:border-t-0 first:pt-0"
                      >
                        <Icon
                          className="mt-1 h-5 w-5 shrink-0 text-muted-foreground"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="flex min-w-0 flex-col">
                          <span className="font-mono text-micro uppercase tracking-[0.15em] text-muted-foreground">
                            {detail.label}
                          </span>
                          {detail.href ? (
                            <a
                              href={detail.href}
                              className="flex min-h-11 flex-col justify-center break-all text-h3 font-semibold text-foreground underline-offset-4 transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              {detail.value}
                            </a>
                          ) : (
                            <span className="flex min-h-11 flex-col justify-center break-all text-h3 font-semibold text-foreground">
                              {detail.value}
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </address>

              <div className="mt-10">
                <h3 className="font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground">
                  [Elsewhere]
                </h3>
                <ul className="mt-4 flex flex-wrap items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = socialIcons[social.id];

                    return (
                      <li key={social.id}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${social.label} (opens in a new tab)`}
                          title={social.handle}
                          className="inline-flex h-12 w-12 items-center justify-center border border-border bg-background text-foreground transition-all duration-200 ease-out hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
