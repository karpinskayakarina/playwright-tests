import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { SortLabel, SortOrder } from " tests/enums/sorting";

const cases = [
  { label: SortLabel.AscendingByPrice, order: SortOrder.Ascending },
  { label: SortLabel.DescendingByPrice, order: SortOrder.Descending },
] as const;

test.describe("Sort by price", () => {
  for (const c of cases) {
    test(`sort by price ${c.order}`, async ({ page }) => {
      const home = new HomePage(page);

      await home.goto();
      await home.selectSort(c.label);

      const pricesLoc = page.getByTestId("product-price").locator(":visible");
      const prices = (await pricesLoc.allInnerTexts()).map((s) =>
        Number(s.replace(/[^\d,.-]+/g, "").replace(",", "."))
      );

      const expected = [...prices].sort((a, b) =>
        c.order === SortOrder.Ascending ? a - b : b - a
      );

      expect(prices).toEqual(expected);
    });
  }
});
