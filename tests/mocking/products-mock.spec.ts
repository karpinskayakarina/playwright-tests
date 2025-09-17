import { test, expect } from "@fixtures/fixtures";
import { mockProductsResponse } from "../utils/mocking";
import { API_BASE_URL } from "../config/api.config";

test(
  "Verify products quantity by mocking",
  {
    tag: "@regression",
  },
  async ({ page, app }) => {
    await page.route(`${API_BASE_URL}/products**`, mockProductsResponse);

    await app.homePage.goto();

    await expect(page.getByTestId("product-name")).toHaveCount(20);
  }
);
