import { test, expect } from "@playwright/test";

/**
 * Accessibility and semantics.
 *
 * Catches structural regressions that are invisible in a screenshot but fatal
 * for keyboard and screen-reader users.
 */

test.describe("structure", () => {
  test("exactly one h1, and no skipped heading levels", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(400);

    const result = await page.evaluate(() => {
      const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
      const levels = headings.map((h) => ({
        level: Number(h.tagName[1]),
        text: (h.textContent || "").trim().slice(0, 40),
      }));
      return {
        h1Count: levels.filter((l) => l.level === 1).length,
        levels,
      };
    });

    expect(result.h1Count, "page must have exactly one h1").toBe(1);

    let previous = 0;
    for (const { level, text } of result.levels) {
      if (previous !== 0) {
        expect(
          level - previous,
          `skipped heading level: h${previous} -> h${level} at "${text}"`,
        ).toBeLessThanOrEqual(1);
      }
      previous = level;
    }
  });

  test("landmarks are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toHaveCount(1);
    expect(await page.locator("nav[aria-label='Sections']").count()).toBeGreaterThan(0);
  });

  test("every icon-only control has an accessible name", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(400);

    const unnamed = await page.evaluate(() => {
      const controls = [...document.querySelectorAll("button, a")];
      return controls
        .filter((el) => {
          const text = (el.textContent || "").trim();
          const label = el.getAttribute("aria-label") || el.getAttribute("title");
          const hasImgAlt = !!el.querySelector("img[alt]:not([alt=''])");
          // A control showing only an icon has no visible text.
          const isIconOnly = text.length === 0 && !hasImgAlt;
          return isIconOnly && !label;
        })
        .map((el) => el.outerHTML.slice(0, 100));
    });

    expect(unnamed, "icon-only controls without an accessible name").toEqual([]);
  });

  test("every form input has an associated label", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.evaluate(() => {
      const el = document.getElementById("contact")!;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
    });
    await page.waitForTimeout(400);

    const unlabelled = await page.evaluate(() =>
      [...document.querySelectorAll("input:not([type='hidden']), textarea")]
        .filter((el) => {
          const id = el.getAttribute("id");
          const hasLabelFor = id ? !!document.querySelector(`label[for="${id}"]`) : false;
          const wrapped = !!el.closest("label");
          const aria = el.getAttribute("aria-label") || el.getAttribute("aria-labelledby");
          return !hasLabelFor && !wrapped && !aria;
        })
        .map((el) => el.outerHTML.slice(0, 80)),
    );

    expect(unlabelled, "form inputs without labels").toEqual([]);
  });

  test("external links are safe", async ({ page }) => {
    await page.goto("/");
    const unsafe = await page.evaluate(() =>
      [...document.querySelectorAll('a[target="_blank"]')]
        .filter((a) => {
          const rel = a.getAttribute("rel") || "";
          return !rel.includes("noopener");
        })
        .map((a) => a.getAttribute("href")),
    );
    expect(unsafe, "target=_blank without rel=noopener").toEqual([]);
  });
});

test.describe("keyboard", () => {
  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "iOS WebKit requires 'full keyboard access' to Tab between elements",
  );

  test("a skip link is the first tab stop and moves focus to content", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(300);

    await page.keyboard.press("Tab");

    const first = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        text: (el?.textContent || "").trim(),
        href: el?.getAttribute("href"),
        tag: el?.tagName,
      };
    });

    expect(
      first.text + (first.href || ""),
      "first tab stop should be the skip link",
    ).toMatch(/skip/i);
  });

  test("rail items are focusable and show a visible focus ring", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(300);

    const link = page.locator("nav[aria-label='Sections']").first().locator("a").first();
    await link.focus();

    const outline = await link.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        outlineWidth: s.outlineWidth,
        boxShadow: s.boxShadow,
        ring: s.getPropertyValue("--tw-ring-shadow"),
      };
    });

    const hasIndicator =
      (outline.boxShadow && outline.boxShadow !== "none") ||
      (outline.outlineWidth && outline.outlineWidth !== "0px") ||
      outline.ring !== "";
    expect(hasIndicator, "focused rail link has no visible focus indicator").toBe(true);
  });

  test("focusing a rail item expands it (hover-only nav would be a trap)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(300);

    const nav = page.locator("nav[aria-label='Sections']").first();
    const before = await nav.getAttribute("data-expanded");

    await nav.locator("a").first().focus();
    await page.waitForTimeout(400);
    const after = await nav.getAttribute("data-expanded");

    expect(after, "rail should expand on keyboard focus").not.toBe(before);
  });
});

test.describe("motion", () => {
  test("respects prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(600);

    // With reduced motion the rail must not animate its expansion.
    const nav = page.locator("nav[aria-label='Sections']").first();
    await nav.locator("a").first().hover();
    await page.waitForTimeout(300);

    const transition = await nav.evaluate((el) => getComputedStyle(el).transitionDuration);
    const durations = transition.split(",").map((d) => parseFloat(d));
    expect(
      Math.max(...durations),
      `rail should not animate under reduced motion (got ${transition})`,
    ).toBeLessThan(0.05);
  });

  test("content is not permanently hidden when motion is reduced", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    // Scroll the form itself into view, not just the section top: on mobile the
    // form stacks below the info column and its reveal would otherwise not fire.
    await page.getByRole("heading", { name: /send a message/i }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);

    // Scope to the form. Jumping straight to the form can skip past the
    // section's heading column, whose `once: true` reveal then never fires —
    // a real visitor scrolling gradually would trigger it.
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("#contact form *")]
        // The honeypot is deliberately invisible; it is not content.
        .filter((el) => !el.closest("[aria-hidden='true']"))
        .filter(
          (el) =>
            parseFloat(getComputedStyle(el).opacity) < 0.05 &&
            (el.textContent || "").trim().length > 3,
        ).length,
    );
    expect(hidden, "contact content invisible under reduced motion").toBe(0);
  });
});