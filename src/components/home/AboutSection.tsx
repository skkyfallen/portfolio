"use client";

import { motion } from "motion/react";
import { GraduationCap, Award, Shield } from "lucide-react";

const skillCategories = [
  {
    title: "Cybersecurity and Security Operations",
    items: [
      "Security operations",
      "SIEM concepts",
      "Active Directory management",
      "Linux security",
      "Vulnerability assessment",
      "Incident response readiness",
    ],
  },
  {
    title: "Networking",
    items: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "HTTP/HTTPS",
      "SSH",
      "FTP",
      "VPN",
      "SMB",
    ],
  },
  {
    title: "Security Tools and Labs",
    items: ["Nmap", "Hack The Box", "picoCTF"],
  },
  {
    title: "Programming and Web",
    items: ["Python scripting", "JavaScript", "React", "Next.js", "Supabase", "Firebase"],
  },
  {
    title: "Cloud, DevOps, and Systems",
    items: [
      "AWS",
      "GitHub",
      "CI/CD",
      "Linux",
      "Windows Server",
      "Network troubleshooting",
      "Diagnostic remediation",
      "AI and agentic automation",
    ],
  },
] as const;

type EducationEntry = {
  degree: string;
  school: string;
  location: string;
  date: string;
  note?: string;
};

const education: EducationEntry[] = [
  {
    degree: "M.S. Cybersecurity, Information Assurance",
    school: "Eastern Michigan University",
    location: "Ypsilanti, MI",
    date: "Expected December 2027",
    note: "Offensive Security, Defensive Security, Cloud Fundamentals",
  },
  {
    degree: "B.Sc. Software Engineering",
    school: "Babcock University",
    location: "Lagos, Nigeria",
    date: "August 2024",
  },
];

const certifications = [
  { name: "CompTIA Security+", year: "2025" },
  { name: "eJPT v2", year: "2026" },
  { name: "AWS Solutions Architect Associate", year: "In progress, 2026" },
] as const;

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function AboutSection() {

  return (
    <section
      id="about"
      className="scroll-mt-8 border-t border-border px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[360px_1fr]">
          {/* Section index / heading */}
          <motion.div
            className="overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
          >
            <p className="font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground">
              [Profile]
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <h2 className="text-h1 font-bold tracking-tight text-foreground">
                About
              </h2>
              <span
                className="font-mono text-display font-bold leading-[0.8] text-muted-foreground"
                aria-hidden="true"
              >
                01
              </span>
            </div>
            <div className="mt-6 h-1 w-12 bg-accent" aria-hidden="true" />
          </motion.div>

          {/* Content */}
          <div className="space-y-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <p className="max-w-[68ch] text-body leading-relaxed text-foreground">
                Cybersecurity graduate student pursuing an M.S. in Information
                Assurance with foundational experience in security operations,
                Security Information and Event Management (SIEM) concepts, Active
                Directory, Linux security, networking, vulnerability assessment,
                and cloud and DevOps practices. Hands-on background in Python
                scripting, continuous integration and continuous deployment
                (CI/CD), technical troubleshooting, event operations, and
                documentation. CompTIA Security+ and eJPT v2 certified; seeking a
                cybersecurity internship, an entry-level security operations
                role, or an entry-level cloud and IT help desk role.
              </p>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
              >
                <h3 className="flex items-center gap-2 text-h3 font-semibold text-foreground">
                  <GraduationCap
                    className="h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  Education
                </h3>
                <ul className="mt-6 space-y-0">
                  {education.map((entry) => (
                    <li
                      key={entry.degree}
                      className="border-t border-border py-5 first:border-t-0 first:pt-0"
                    >
                      <p className="font-medium text-foreground">
                        {entry.degree}
                      </p>
                      <p className="mt-1 text-small text-muted-foreground">
                        {entry.school} — {entry.location}
                      </p>
                      <p className="mt-1 font-mono text-micro uppercase tracking-wider text-muted-foreground">
                        {entry.date}
                      </p>
                      {entry.note && (
                        <p className="mt-2 text-small text-muted-foreground">
                          {entry.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={revealVariants}
              >
                <h3 className="flex items-center gap-2 text-h3 font-semibold text-foreground">
                  <Award
                    className="h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  Certifications
                </h3>
                <ul className="mt-6 space-y-0">
                  {certifications.map((cert) => (
                    <li
                      key={cert.name}
                      className="flex items-center justify-between gap-4 border-t border-border py-5 first:border-t-0 first:pt-0"
                    >
                      <span className="text-foreground">{cert.name}</span>
                      <span className="shrink-0 font-mono text-micro uppercase tracking-wider text-muted-foreground">
                        {cert.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
            >
              <h3 className="flex items-center gap-2 text-h3 font-semibold text-foreground">
                <Shield
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                Skills
              </h3>
              <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                {skillCategories.map((category) => (
                  <div
                    key={category.title}
                    className="bg-background p-5"
                  >
                    <h4 className="text-small font-semibold text-foreground">
                      {category.title}
                    </h4>
                    <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                      {category.items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
