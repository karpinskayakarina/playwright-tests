import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { SortLabel, SortOrder } from "../enums/sorting";
import { parsePrice, sortPrices } from "../utils/sort";

const cases: ReadonlyArray<{ label: SortLabel; order: SortOrder }> = [
  { label: SortLabel.AscendingByPrice, order: SortOrder.Ascending },
  { label: SortLabel.DescendingByPrice, order: SortOrder.Descending },
];

test.describe(
  "Sort by price",
  {
    tag: "@regression",
  },
  () => {
    for (const c of cases) {
      test(`sort by price ${c.order}`, async ({ page }) => {
        const home = new HomePage(page);

        await test.step("Open home page", async () => {
          await home.goto();
        });

        const before =
          await test.step("Capture initial names signature", async () => {
            return await home.namesSignature();
          });

        await test.step(`Apply sort: ${c.label}`, async () => {
          await home.selectSort(c.label);
        });

        await test.step("Wait for list to change and stabilize", async () => {
          await home.waitUntilNamesChange(before);
          await home.waitUntilNamesStable();
        });

        const priceTexts =
          await test.step("Read product prices (raw text)", async () => {
            return await home.getProductPriceTexts();
          });

        const prices = await test.step("Parse prices to numbers", () => {
          return priceTexts.map(parsePrice);
        });

        const expected =
          await test.step("Compute expected sorted prices", () => {
            return sortPrices(prices, c.order);
          });

        await test.step("Assert prices are sorted as expected", () => {
          expect(prices).toEqual(expected);
        });
      });
    }
  }
);
