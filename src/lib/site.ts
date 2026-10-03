/**
 * Canonical site facts, shared by metadata, the sitemap, robots.txt, and the
 * generated Open Graph image so those values never drift apart.
 *
 * `SITE_URL` is the single source of truth for every absolute URL on the site:
 * canonical/Open Graph URLs, the sitemap entries, the `Sitemap:` line in
 * robots.txt, and the hostname printed on the OG image. Change it in one place.
 *
 * Format: scheme + host, no trailing slash.
 */
export const SITE_URL = "https://portfolio.hackpath.org";

export const SITE_NAME = "Kenechukwu Ekwonu";

export const SITE_TAGLINE =
  "Cybersecurity Graduate Student | Security Operations | Cloud and Technical Support";

export const SITE_DESCRIPTION =
  "Cybersecurity graduate student pursuing an M.S. in Information Assurance at Eastern Michigan University, with CompTIA Security+ and eJPT v2 certifications. Security operations, SIEM, vulnerability assessment, and cloud fundamentals.";

export const SITE_LOCATION = "Superior Township, MI";
