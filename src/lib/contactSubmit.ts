/**
 * ============================================================================
 * CONTACT SUBMISSION PROVIDER ADAPTER
 * ============================================================================
 *
 * The author has not yet chosen a form provider (PRD §18.1: Formspree vs
 * Netlify Forms vs EmailJS). All provider-specific logic lives in this file so
 * `ContactForm.tsx` stays provider-agnostic: it just awaits
 * `submitContactForm(...)` and renders the result.
 *
 * TO SWITCH PROVIDERS:
 *   1. Change `CONTACT_PROVIDER` (below) to "formspree" | "netlify" | "emailjs".
 *   2. Fill in the matching block of `CONTACT_PROVIDER_CONFIG` with your
 *      provider credentials. Nothing else in the app needs to change.
 *
 * No `dangerouslySetInnerHTML` is used anywhere (PRD §8.5.3).
 */

/** Values collected by the contact form. `honeypot` should be empty for humans. */
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  /** Spam trap. Bots fill it; real users never see it. */
  honeypot?: string;
}

export type ContactProvider =
  | "placeholder"
  | "web3forms"
  | "formspree"
  | "netlify"
  | "emailjs";

/**
 * Result of a submission attempt.
 *
 * `delivered: false` means the submission was accepted by the UI but NOT
 * actually sent anywhere — only the placeholder adapter does this. The form
 * surfaces this distinction so nobody is misled into thinking mail was sent.
 */
export type ContactSubmitResult =
  | { ok: true; delivered: boolean }
  | { ok: false; message: string };

/**
 * ====================== CHANGE THIS ONE LINE ======================
 * Which provider to submit through. Selects the adapter at the bottom of
 * this file. Default is the deliberately-fake placeholder.
 */
export const CONTACT_PROVIDER: ContactProvider = "web3forms";
/** ================================================================== */

/**
 * Provider credentials/identifiers. Fill in the block for the provider you
 * select above; the other blocks can stay empty.
 */
export const CONTACT_PROVIDER_CONFIG = {
  web3forms: {
    /**
     * Web3Forms "access key", from https://web3forms.com/ dashboard.
     *
     * NOT A SECRET. Web3Forms publishes this client-side by design: it is a
     * public identifier that routes mail to your inbox, not a credential that
     * grants account access. It is safe in source control and in the browser
     * bundle. Anyone holding it can post to your endpoint, which is exactly why
     * the honeypot and Web3Forms' own spam filtering matter.
     */
    accessKey: "4d410802-67c5-407c-a326-cf86abea3d31",
    /** Subject line for the notification email. */
    subject: "New message from your portfolio",
  },
  formspree: {
    /** The ID from https://formspree.io/f/<id> (e.g. "xabcdefg"). */
    formId: "",
  },
  netlify: {
    /** Must match the `name` attribute of the Netlify-enabled form. */
    formName: "contact",
  },
  emailjs: {
    serviceId: "",
    templateId: "",
    publicKey: "",
  },
} as const;

/** Fields actually sent to the provider, after trimming. */
type SanitizedPayload = Pick<ContactPayload, "name" | "email" | "message">;

/**
 * Submit the contact form. This is the ONLY entry point the UI calls.
 */
export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactSubmitResult> {
  // Honeypot tripped: silently report success so bots do not retry. This is
  // checked before any provider runs and never blocks a real (empty) value.
  if (payload.honeypot && payload.honeypot.trim() !== "") {
    return { ok: true, delivered: true };
  }

  const data: SanitizedPayload = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    message: payload.message.trim(),
  };

  try {
    switch (CONTACT_PROVIDER) {
      case "web3forms":
        return await submitWithWeb3Forms(data);
      case "formspree":
        return await submitWithFormspree(data);
      case "netlify":
        return await submitWithNetlify(data);
      case "emailjs":
        return await submitWithEmailJS(data);
      case "placeholder":
      default:
        return await submitWithPlaceholder();
    }
  } catch {
    return {
      ok: false,
      message: "Something went wrong while sending. Please try again.",
    };
  }
}

/* -------------------------------------------------------------------------- */
/* Provider adapters                                                          */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ PLACEHOLDER — THIS DOES NOT SEND ANY MAIL. ⚠️
 *
 * It simulates a short network round-trip and resolves successfully so the UI
 * can be built and reviewed before a provider is chosen (PRD §18.1). It
 * returns `delivered: false`, which the form surfaces as a visible
 * "not connected" notice.
 *
 * To send real messages: pick a provider above, set `CONTACT_PROVIDER`, and
 * fill its `CONTACT_PROVIDER_CONFIG` block. Then delete nothing else — the
 * switch statement already routes to the real adapter.
 */
async function submitWithPlaceholder(): Promise<ContactSubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, delivered: false };
}

async function submitWithWeb3Forms(
  data: SanitizedPayload,
): Promise<ContactSubmitResult> {
  const { accessKey, subject } = CONTACT_PROVIDER_CONFIG.web3forms;

  if (!accessKey) {
    return {
      ok: false,
      message: "The form is not configured yet. Please email me directly.",
    };
  }

  // `botcheck` is Web3Forms' own honeypot field. Our own honeypot already
  // short-circuits before this runs, but sending it explicitly means Web3Forms
  // applies its filtering too rather than treating the field as absent.
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      name: data.name,
      email: data.email,
      message: data.message,
      from_name: data.name,
      reply_to: data.email,
      botcheck: "",
    }),
  });

  // Web3Forms answers 200 even for some failures, so the body's `success`
  // flag is the authority — not the HTTP status.
  let payload: { success?: boolean; message?: string } = {};
  try {
    payload = await response.json();
  } catch {
    // Non-JSON response (e.g. a gateway error page); fall through to generic.
  }

  if (!response.ok || payload.success !== true) {
    return {
      ok: false,
      message:
        payload.message ||
        "Your message could not be sent. Please try again, or email me directly.",
    };
  }

  return { ok: true, delivered: true };
}

async function submitWithFormspree(
  data: SanitizedPayload,
): Promise<ContactSubmitResult> {
  const { formId } = CONTACT_PROVIDER_CONFIG.formspree;
  if (!formId) {
    return {
      ok: false,
      message: "The form is not configured yet. Please email me directly.",
    };
  }

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Your message could not be sent. Please try again.",
    };
  }
  return { ok: true, delivered: true };
}

/**
 * Netlify Forms. Only functional once deployed on Netlify with a matching
 * `data-netlify="true"` form. Netlify intercepts url-encoded POSTs to "/".
 */
async function submitWithNetlify(
  data: SanitizedPayload,
): Promise<ContactSubmitResult> {
  const { formName } = CONTACT_PROVIDER_CONFIG.netlify;
  const body = new URLSearchParams({
    "form-name": formName,
    ...data,
  });

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Your message could not be sent. Please try again.",
    };
  }
  return { ok: true, delivered: true };
}

/**
 * EmailJS via its REST API. Uses `fetch` directly so no extra dependency is
 * required. Template variables: from_name, reply_to, message.
 */
async function submitWithEmailJS(
  data: SanitizedPayload,
): Promise<ContactSubmitResult> {
  const { serviceId, templateId, publicKey } = CONTACT_PROVIDER_CONFIG.emailjs;
  if (!serviceId || !templateId || !publicKey) {
    return {
      ok: false,
      message: "The form is not configured yet. Please email me directly.",
    };
  }

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: data.name,
        reply_to: data.email,
        message: data.message,
      },
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Your message could not be sent. Please try again.",
    };
  }
  return { ok: true, delivered: true };
}
