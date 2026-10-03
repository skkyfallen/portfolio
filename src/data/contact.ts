/**
 * Contact details for the portfolio site.
 *
 * Single source of truth for the Contact view. Values are the author's real,
 * verified contact details — do not embellish. `href` is only present when the
 * value can be linked (mailto:, tel:). Location is plain text on purpose.
 */

export type ContactDetailId = "email" | "phone" | "location";

export type SocialLinkId = "github" | "linkedin";

export interface ContactDetail {
  id: ContactDetailId;
  /** Short human label used for the row heading. */
  label: string;
  /** Display value, exactly as it should be read. */
  value: string;
  /** Optional link target. Must include a scheme (mailto:, tel:, https:). */
  href?: string;
}

export interface SocialLink {
  id: SocialLinkId;
  /** Platform name, used for accessible labels. */
  label: string;
  /** Display handle (without scheme). */
  handle: string;
  /** Absolute URL. The resume omitted https:// — it is added here. */
  href: string;
}

export const contact = {
  name: "Kenechukwu Ekwonu",
  email: "kekwonu@emich.edu",
  phoneDisplay: "(734) 465-6296",
  phoneHref: "tel:+17344656296",
  location: "Superior Township, MI",
} as const;

export const contactDetails: ContactDetail[] = [
  {
    id: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    id: "phone",
    label: "Phone",
    value: contact.phoneDisplay,
    href: contact.phoneHref,
  },
  {
    id: "location",
    label: "Location",
    value: contact.location,
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "github.com/skkyfallen",
    href: "https://github.com/skkyfallen",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "linkedin.com/in/ekwonu-kenechukwu-945520235",
    href: "https://www.linkedin.com/in/ekwonu-kenechukwu-945520235",
  },
];
