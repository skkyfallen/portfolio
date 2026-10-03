import { test, expect } from "@playwright/test";

/**
 * Core user flows: navigation, scroll-spy, resume modal, contact form, theme.
 */

const SECTIONS = ["home", "about", "resume", "projects", "contact"];

test.describe("navigation", () => {
  test("rail anchors scroll to each section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(400);

    const rail = page.locator("nav[aria-label='Sections']").first();

    for (const id of SECTIONS) {
      await rail.locator(`a[href='#${id}']`).click();
      await page.waitForTimeout(900);

      const top = await page.evaluate(
        (s) => document.getElementById(s)?.getBoundingClientRect().top ?? null,
        id,
      );
      // Section should be near the top of the viewport (scroll-mt offset).
      expect(top, `#${id} not found`).not.toBeNull();
      expect(Math.abs(top!), `#${id} did not scroll into view (top=${top})`).toBeLessThan(140);
    }
  });

  test("scroll-spy marks the section in view as current", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(400);

    const rail = page.locator("nav[aria-label='Sections']").first();

    // This regressed once: IntersectionObserver's intersectionRatio is
    // normalised by section height, so a short section (Resume) permanently
    // outranked a tall one (Projects) and the indicator lagged a section behind.
    for (const id of ["about", "projects", "contact"]) {
      await page.evaluate((s) => {
        const el = document.getElementById(s)!;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      }, id);
      await page.waitForTimeout(500);

      const current = await rail.locator("a[aria-current]").getAttribute("href");
      expect(current, `scroll-spy wrong after scrolling to #${id}`).toBe(`#${id}`);
    }
  });

  test("legacy routes are declared in _redirects for Cloudflare", async ({ request }) => {
    // The site is a static export, so Next DROPS next.config `redirects()`.
    // The rules live in public/_redirects, which Cloudflare applies at the edge.
    //
    // `next dev` does NOT interpret _redirects -- it is a Cloudflare Pages /
    // Workers feature -- so these cannot be asserted as a live 308 against the
    // dev server. Assert the deployed artefact instead.
    const res = await request.get("/_redirects");
    expect(res.status(), "_redirects must be served from the export").toBe(200);
    const body = await res.text();

    // Parse "source destination code" lines; skip blanks and comments.
    const rules = body
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => line.split(/\s+/));

    for (const [route, anchor] of [
      ["about", "#about"],
      ["resume", "#resume"],
      ["contact", "#contact"],
    ]) {
      // Cloudflare treats /about and /about/ as distinct sources, so both
      // variants must be declared.
      for (const source of [`/${route}`, `/${route}/`]) {
        const match = rules.find(
          (parts) => parts[0] === source && parts[1] === `/${anchor}` && parts[2] === "308",
        );
        expect(
          match,
          `missing rule: ${source} -> /${anchor} 308 (parsed ${rules.length} rules)`,
        ).toBeTruthy();
      }
    }
  });
});

test.describe("resume modal", () => {
  test("opens, renders the PDF, and closes on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");

    await page.getByRole("button", { name: /open resume/i }).click();

    // react-pdf must paint to a canvas.
    await expect(page.locator(".react-pdf__Page canvas")).toBeVisible({ timeout: 20_000 });

    await page.keyboard.press("Escape");
    await expect(page.locator(".react-pdf__Page canvas")).toBeHidden();
  });

  test("exposes a download link", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: /open resume/i }).click();
    await expect(page.locator(".react-pdf__Page canvas")).toBeVisible({ timeout: 20_000 });

    const link = page.locator("a[download]").first();
    await expect(link).toHaveAttribute("href", "/resume.pdf");
  });

  test("the pdf itself is served", async ({ request }) => {
    const res = await request.get("/resume.pdf");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("pdf");
  });
});

test.describe("contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.evaluate(() => {
      const el = document.getElementById("contact")!;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    });
    await page.waitForTimeout(500);
  });

  test("blocks submission and reports required fields", async ({ page }) => {
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/please enter your name/i)).toBeVisible();
    await expect(page.getByText(/please enter your email/i)).toBeVisible();
    await expect(page.getByText(/please enter a message/i)).toBeVisible();
  });

  test("rejects a malformed email", async ({ page }) => {
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test User");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("not-an-email");
    await page.getByRole("textbox", { name: "Message" }).fill("Hello");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  // Live-delivery tests are opt-in.
  //
  // These POST to the real provider and really email the site owner. Running
  // them by default means every `npm run test:e2e` sends mail and quickly trips
  // Web3Forms' rate limiting, which made the suite flaky for reasons unrelated
  // to this site's code.
  //
  // Run explicitly with:  LIVE_FORM_TEST=1 npm run test:e2e
  const liveDelivery = process.env.LIVE_FORM_TEST === "1";
  test.skip(!liveDelivery, "set LIVE_FORM_TEST=1 to send real submissions");

  test("valid input is accepted and delivered", async ({ page }) => {
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test User");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("test@example.com");
    await page.getByRole("textbox", { name: "Message" }).fill("Hello there");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/form not connected/i)).toHaveCount(0);
  });

  test("honeypot never blocks a real submission", async ({ page }) => {
    await page.getByRole("textbox", { name: "Name", exact: true }).fill("Test User");
    await page.getByRole("textbox", { name: "Email", exact: true }).fill("test@example.com");
    await page.getByRole("textbox", { name: "Message" }).fill("Hello there");
    // Honeypot left empty, as a human would.
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 20_000 });
  });

  test("honeypot is hidden from assistive tech", async ({ page }) => {
    const hp = page.locator("input[name='company']");
    await expect(hp).toHaveCount(1);
    await expect(hp).toHaveAttribute("tabindex", "-1");
    const hiddenAncestor = await hp.evaluate(
      (el) => el.closest("[aria-hidden='true']") !== null,
    );
    expect(hiddenAncestor).toBe(true);
  });
});

test.describe("theme", () => {
  test("toggles between dark and light and persists", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(400);

    const html = page.locator("html");
    const initial = await html.getAttribute("class");

    await page.getByRole("button", { name: /switch to (light|dark) mode|toggle theme/i }).first().click();
    await page.waitForTimeout(400);
    const afterToggle = await html.getAttribute("class");
    expect(afterToggle).not.toBe(initial);

    await page.reload();
    await page.waitForTimeout(500);
    expect(await html.getAttribute("class")).toBe(afterToggle);
  });
});