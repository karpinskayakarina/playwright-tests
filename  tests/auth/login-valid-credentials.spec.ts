import { test, expect } from "@playwright/test";
import { VALID_USER } from "../fixtures/credentials";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

test("Verify login with valid credentials", async ({ page }) => {
  await page.goto("/auth/login");

  await page.fill('[data-test="email"]', VALID_USER.email);
  await page.fill('[data-test="password"]', VALID_USER.password);
  await page.click('[data-test="login-submit"]');

  await expect(page).toHaveURL("/account");

  await expect(page.locator("h1")).toHaveText("My account");
  await expect(page.locator("nav")).toContainText("Jane Doe");
});
