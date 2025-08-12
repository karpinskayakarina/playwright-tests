import { test, expect } from "@playwright/test";

test("Filter products by Power Tools category (Sander)", async ({ page }) => {
  await page.goto("/");

  const titles = page.locator('[data-test="product-name"]');
  const before = await titles.allTextContents();

  const sander = page.getByRole("checkbox", { name: /^\s*Sander\s*$/i });
  await sander.scrollIntoViewIfNeeded();
  await sander.check();

  await expect
    .poll(async () => (await titles.allTextContents()).join("|"))
    .not.toBe(before.join("|"));

  await expect(titles).toContainText(/sander/i);
  const all = (await titles.allTextContents()).map((t) => t.toLowerCase());
  expect(all.length).toBeGreaterThan(0);
  expect(all.every((t) => t.includes("sander"))).toBeTruthy();
});
