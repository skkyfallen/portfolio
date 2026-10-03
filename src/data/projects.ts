export interface Project {
  id: string;
  title: string;
  /** What form the project takes — e.g. "Browser extension", "Web app". */
  kind: string;
  /** Optional project URL. Omitted for private repositories, since linking
   *  them would hand every visitor a 404. */
  href?: string;
  /** Optional time span, when one is known. */
  period?: string;
  description: string;
  tags: string[];
}

/**
 * Project portfolio. Only verified project data belongs here.
 *
 * - Genesys — platform for training junior developers in industry-standard
 *   software practices; led a cross-functional intern team at Tenece.
 * - trialguard — free-trial tracker Chrome extension (private repo).
 * - pentest-hub — pentest command assistant and structured note-taking web app.
 * - AUTOPWNr — bash automation for lab recon and exploitation.
 *
 * Add future projects using the same shape.
 */
export const projects: Project[] = [
  {
    id: "trialguard",
    title: "Trialguard",
    kind: "Chrome extension",
    description:
      "A browser extension that automatically scans pages for free trial information, lets you add trial details manually when a page isn't recognised, and then sets up automatic reminders so a subscription is never missed before it renews.",
    tags: ["JavaScript", "Browser Extension", "Automation", "Reminders"],
  },
  {
    id: "pentest-hub",
    title: "Pentest Hub",
    kind: "Web app",
    description:
      "A JSON-tree powered note-taking and penetration testing assistant. It generates custom pentest commands from your findings or the established phases of an engagement, suggests relevant commands for the current phase, and keeps findings in structured, saveable notes.",
    tags: ["JavaScript", "Web App", "Penetration Testing", "Structured Notes"],
  },
  {
    id: "autopwnr",
    title: "AUTOPWNr",
    kind: "Bash tool",
    href: "https://github.com/skkyfallen/AUTOPWNr",
    description:
      "A bash automation tool for authorised lab work. It runs an Nmap service and version scan, parses the open ports out of the XML output, cross-references them against Searchsploit, writes a consolidated findings report, and hands off to Metasploit for validation.",
    tags: ["Bash", "Nmap", "Metasploit", "Searchsploit", "Reconnaissance"],
  },
  {
    id: "genesys",
    title: "Genesys",
    kind: "Team project",
    period: "Jan 2023 – Jul 2023",
    description:
      "A platform designed to train young developers in industry-standard software practices. Led a cross-functional intern team and architected CI/CD pipelines to automate build, test, and deployment workflows.",
    tags: ["CI/CD", "Team Leadership", "Pipeline Architecture", "DevOps"],
  },
];