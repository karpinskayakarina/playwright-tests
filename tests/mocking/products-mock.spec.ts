import { test, expect } from "@fixtures/fixtures";
import { mockProductsResponse } from "../utils/mocking";
import { API_BASE_URL } from "../config/api.config";

test(
  "Verify products quantity by mocking",
  {
    tag: "@regression",
  },
  async ({ page, app }) => {
    await test.step("Mock GET /products API", async () => {
      await page.route(`${API_BASE_URL}/products**`, mockProductsResponse);
    });

    await test.step("Open home page", async () => {
      await app.homePage.goto();
    });

    await test.step("Assert 20 products are rendered", async () => {
      await expect(page.getByTestId("product-name")).toHaveCount(20);
    });
  }
);
