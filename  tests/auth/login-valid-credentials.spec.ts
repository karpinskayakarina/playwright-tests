import { test, expect } from "@playwright/test";

test("Verify login with valid credentials", async ({ page }) => {
  await page.goto("/auth/login");

  await page.getByTestId("email").fill("customer@practicesoftwaretesting.com");
  await page.getByTestId("password").fill("welcome01");
  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL("/account");

  await expect(page.locator("h1")).toHaveText("My account");
  await expect(page.locator("nav")).toContainText("Jane Doe");
});
