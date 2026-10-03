"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { submitContactForm } from "@/src/lib/contactSubmit";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    // Top-level `z.email()` (Zod v4) after the required check, so an empty
    // field reports "required" rather than "invalid".
    .pipe(z.email("Please enter a valid email address.")),
  message: z.string().trim().min(1, "Please enter a message."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type SubmitState =
  | { status: "idle" }
  | { status: "success"; delivered: boolean }
  | { status: "error"; message: string };

const inputClasses =
  "h-12 w-full border border-border bg-background px-4 text-body text-foreground transition-colors duration-200 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const textareaClasses =
  "min-h-36 w-full resize-y border border-border bg-background px-4 py-3 text-body leading-relaxed text-foreground transition-colors duration-200 ease-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  // Honeypot is intentionally OUTSIDE react-hook-form / the zod schema so it
  // can never fail validation and block a real submission. Read on submit.
  // Kept in state (not a ref) so it is never read during render.
  const [honeypot, setHoneypot] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitState({ status: "idle" });

    const result = await submitContactForm({
      ...values,
      honeypot,
    });

    if (result.ok) {
      reset();
      setHoneypot("");
      setSubmitState({ status: "success", delivered: result.delivered });
    } else {
      setSubmitState({ status: "error", message: result.message });
    }
  };

  const busy = isSubmitting;

  return (
    <section aria-labelledby="contact-form-heading">
      <h3
        id="contact-form-heading"
        className="text-h3 font-semibold tracking-tight text-foreground"
      >
        Send a message
      </h3>
      <p className="mt-3 max-w-md text-small leading-relaxed text-muted-foreground">
        All fields are required.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-8 space-y-6"
      >
        {/* Honeypot: hidden from humans and assistive tech, ignored off-screen. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
        >
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <div>
          <Label
            htmlFor="contact-name"
            className="text-small font-medium text-foreground"
          >
            Name
          </Label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(inputClasses, "mt-2", errors.name && "border-foreground")}
            {...register("name")}
          />
          {errors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-2 flex items-center gap-1.5 text-small text-foreground"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="contact-email"
            className="text-small font-medium text-foreground"
          >
            Email
          </Label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(
              inputClasses,
              "mt-2",
              errors.email && "border-foreground",
            )}
            {...register("email")}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              role="alert"
              className="mt-2 flex items-center gap-1.5 text-small text-foreground"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label
            htmlFor="contact-message"
            className="text-small font-medium text-foreground"
          >
            Message
          </Label>
          <textarea
            id="contact-message"
            rows={6}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={cn(
              textareaClasses,
              "mt-2",
              errors.message && "border-foreground",
            )}
            {...register("message")}
          />
          {errors.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="mt-2 flex items-center gap-1.5 text-small text-foreground"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {errors.message.message}
            </p>
          )}
        </div>

        {submitState.status === "success" && (
          <div
            role="status"
            aria-live="polite"
          className="flex items-start gap-3 border border-border bg-background p-4"
        >
          <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-small font-medium text-foreground">
                {submitState.delivered ? "Message sent" : "Form not connected"}
              </p>
              <p className="mt-1 text-small leading-relaxed text-muted-foreground">
                {submitState.delivered
                  ? "Thanks — your message is on its way. I will get back to you soon."
                  : "This is a placeholder — no message was sent. Configure a provider in src/lib/contactSubmit.ts to enable delivery."}
              </p>
            </div>
          </div>
        )}

        {submitState.status === "error" && (
          <div
            role="alert"
          className="flex items-start gap-3 border border-border bg-background p-4"
        >
          <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-foreground"
              aria-hidden="true"
            />
            <div>
              <p className="text-small font-medium text-foreground">
                Message not sent
              </p>
              <p className="mt-1 text-small leading-relaxed text-muted-foreground">
                {submitState.message}
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 items-center gap-2 bg-primary px-6 text-small font-semibold text-primary-foreground transition-all duration-200 ease-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send message
            </>
          )}
        </button>
      </form>
    </section>
  );
}
