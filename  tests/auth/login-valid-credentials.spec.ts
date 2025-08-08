import { test, expect } from "@playwright/test";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

test("Verify login with valid credentials", async ({ page }) => {
  await page.goto("/auth/login");

  await page.fill(
    '[data-test="email"]',
    "customer@practicesoftwaretesting.com"
  );
  await page.fill('[data-test="password"]', "welcome01");
  await page.click('[data-test="login-submit"]');

  await expect(page).toHaveURL("/account");

  await expect(page.locator("h1")).toHaveText("My account");
  await expect(page.locator("nav")).toContainText("Jane Doe");
});
