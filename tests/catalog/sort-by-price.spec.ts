import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { SortLabel, SortOrder } from "../enums/sorting";
import { parsePrice, sortPrices } from "../utils/sort";

const cases: ReadonlyArray<{ label: SortLabel; order: SortOrder }> = [
  { label: SortLabel.AscendingByPrice, order: SortOrder.Ascending },
  { label: SortLabel.DescendingByPrice, order: SortOrder.Descending },
];

test.describe("Sort by price", () => {
  for (const c of cases) {
    test(`sort by price ${c.order}`, async ({ page }) => {
      const home = new HomePage(page);

      await home.goto();

      const before = await home.namesSignature();
      await home.selectSort(c.label);
      await home.waitUntilNamesChange(before);
      await home.waitUntilNamesStable();

      const priceTexts = await home.getProductPriceTexts();
      const prices = priceTexts.map(parsePrice);
      const expected = sortPrices(prices, c.order);
      expect(prices).toEqual(expected);
    });
  }
});
