import { test, expect } from "@playwright/test";

/**
 * Responsiveness audit.
 *
 * These are the checks that caught real bugs during the build: a CSS Grid
 * `1fr` track that could not shrink below its content's min-content width
 * (84px of horizontal overflow at 1200px), and a mobile tab bar whose labels
 * overflowed their slots at 320px.
 */

const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440, 1920];

test.describe("responsive layout", () => {
  test("no horizontal overflow at any supported width", async ({ page }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      // Let reveals settle so lazy content is laid out.
      await page.waitForTimeout(400);

      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));

      expect(
        scrollWidth,
        `horizontal overflow at ${width}px (scroll ${scrollWidth} > client ${clientWidth})`,
      ).toBeLessThanOrEqual(clientWidth);
    }
  });

  test("display name never overflows its container", async ({ page }) => {
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForTimeout(300);

      const overflow = await page.evaluate(() => {
        const h1 = document.querySelector("#home h1");
        if (!h1) return null;
        const r = h1.getBoundingClientRect();
        return { right: Math.round(r.right), limit: document.documentElement.clientWidth };
      });

      expect(overflow, `h1 not found at ${width}px`).not.toBeNull();
      expect(
        overflow!.right,
        `h1 overflows viewport at ${width}px`,
      ).toBeLessThanOrEqual(overflow!.limit);
    }
  });

  test("rail does not cover content on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/");
    await page.waitForTimeout(400);

    const rail = page.locator("nav[aria-label='Sections']").first();
    await expect(rail).toBeVisible();
    const railBox = await rail.boundingBox();

    // Every metadata cell in the hero must end before the rail begins.
    const collisions = await page.evaluate(() => {
      const railEl = document.querySelector("nav[aria-label='Sections']");
      if (!railEl) return ["rail missing"];
      const railLeft = railEl.getBoundingClientRect().left;
      return [...document.querySelectorAll("#home p, #home a")]
        .filter((el) => el.getBoundingClientRect().right > railLeft + 1)
        .map((el) => (el.textContent || "").trim().slice(0, 40));
    });

    expect(collisions, `content under rail (rail left ${railBox?.x})`).toEqual([]);
  });

  test("mobile uses a bottom bar, desktop uses the right rail", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const bottomBar = page.locator("nav[aria-label='Sections'].fixed");
    await expect(bottomBar).toBeVisible();
    const box = await bottomBar.boundingBox();
    expect(box?.y ?? 0).toBeGreaterThan(300); // anchored to the bottom

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.waitForTimeout(200);
    await expect(bottomBar).toBeHidden();
  });

  test("bottom bar labels fit without clipping", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/");
    await page.waitForTimeout(400);

    const clipped = await page.evaluate(() => {
      const bar = document.querySelector("nav[aria-label='Sections'].fixed");
      if (!bar) return ["bottom bar missing"];
      return [...bar.querySelectorAll("a span")]
        .filter((s) => s.scrollWidth > s.clientWidth + 1)
        .map((s) => s.textContent?.trim());
    });

    expect(clipped, "labels clipped at 320px").toEqual([]);
  });
});