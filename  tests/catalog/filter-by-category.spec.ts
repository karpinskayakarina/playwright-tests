import { PowerTools } from " tests/enums/product.categories";
import { HomePage } from "@pages/home.page";
import { test, expect } from "@playwright/test";

test("Filter products by Power Tools category (Sander)", async ({ page }) => {
  const home = new HomePage(page);
  await page.goto("/");

  await home.clickCategory(PowerTools.Sander);

  await expect
    .poll(async () => {
      const texts = (await home.getProductNames()).map((t) => t.toLowerCase());
      return texts.length > 0 && texts.every((t) => t.includes("sander"));
    })
    .toBe(true);
});
