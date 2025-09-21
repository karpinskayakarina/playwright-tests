import { PowerTools } from "../enums/product.categories";
import { HomePage } from "@pages/home.page";
import { test, expect } from "@playwright/test";

test(
  "Filter products by Power Tools category (Sander)",
  {
    tag: "@regression",
  },
  async ({ page }) => {
    const home = new HomePage(page);

    await test.step("Open home page", async () => {
      await page.goto("/");
    });

    await test.step("Filter by Power Tools → Sander", async () => {
      await home.clickCategory(PowerTools.Sander);
    });

    await test.step("Verify products are filtered by Sander", async () => {
      await expect
        .poll(() => home.areProductsFilteredBy(PowerTools.Sander))
        .toBe(true);
    });
  }
);
