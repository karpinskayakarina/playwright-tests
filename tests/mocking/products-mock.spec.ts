import { expect } from "@playwright/test";
import { test } from "@fixtures/fixtures";
import { mockProductsResponse } from "../utils/mocking";

test("Verify products quantity by mocking", async ({ page, app }) => {
  await page.route("**/products?**", mockProductsResponse);

  await app.homePage.goto();
  await expect(app.homePage.card).toHaveCount(20);
});
