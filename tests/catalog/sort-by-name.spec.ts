import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { SortLabel, SortOrder } from "../enums/sorting";
import { sortByName } from "../utils/sort";

const cases: ReadonlyArray<{ label: SortLabel; order: SortOrder }> = [
  { label: SortLabel.AscendingByName, order: SortOrder.Ascending },
  { label: SortLabel.DescendingByName, order: SortOrder.Descending },
];

test.describe(
  "Sort by name",
  {
    tag: "@regression",
  },
  () => {
    for (const c of cases) {
      test(`sort by name ${c.order}`, async ({ page }) => {
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

        await test.step("Wait for names to change and stabilize", async () => {
          await home.waitUntilNamesChange(before);
          await home.waitUntilNamesStable();
        });

        const actual =
          await test.step("Get product names (actual)", async () => {
            return await home.getProductNames();
          });

        const expected = await test.step("Compute expected order", () => {
          return sortByName(actual, c.order);
        });

        await test.step("Assert sorted order", () => {
          expect(actual).toEqual(expected);
        });
      });
    }
  }
);
