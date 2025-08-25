import { test, expect } from "@playwright/test";

test("Filter products by Power Tools category (Sander)", async ({ page }) => {
  await page.goto("/");

  const titles = page.getByTestId("product-name");
  const before = await titles.allTextContents();

  const sander = page.getByRole("checkbox", { name: /^\s*Sander\s*$/i });
  await sander.scrollIntoViewIfNeeded();
  await sander.check();

  await expect.poll(() => titles.allTextContents()).not.toEqual(before);

  const sanderTitles = titles.filter({ hasText: /sander/i });

  await expect(sanderTitles).toHaveCount(await titles.count());

  const all = (await titles.allTextContents()).map((t) => t.toLowerCase());
  expect(all.every((t) => t.includes("sander"))).toBe(true);
});
