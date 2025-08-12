import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";

const priceCases = [
  { label: "Price (Low - High)", order: "asc" as const },
  { label: "Price (High - Low)", order: "desc" as const },
];

test.describe("Sort by price", () => {
  for (const c of priceCases) {
    test(`sort by price ${c.order}`, async ({ page }) => {
      const home = new HomePage(page);

      await home.goto();
      await home.selectSort(c.label);

      const prices = await home.getProductPrices();

      const parsedPrices = prices.map((p) =>
        parseFloat(p.replace(/[^\d.]/g, ""))
      );

      const expected = [...parsedPrices].sort((a, b) => a - b);
      if (c.order === "desc") expected.reverse();

      expect(parsedPrices).toEqual(expected);
    });
  }
});
