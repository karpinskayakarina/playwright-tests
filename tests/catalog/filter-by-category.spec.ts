import { PowerTools } from "../enums/product.categories";
import { HomePage } from "@pages/home.page";
import { test, expect } from "@playwright/test";

test("Filter products by Power Tools category (Sander)", async ({ page }) => {
  const home = new HomePage(page);
  await page.goto("/");

  await home.clickCategory(PowerTools.Sander);

  await expect
    .poll(() => home.areProductsFilteredBy(PowerTools.Sander))
    .toBe(true);
});
