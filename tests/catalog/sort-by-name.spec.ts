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

        await home.goto();

        const before = await home.namesSignature();
        await home.selectSort(c.label);

        await home.waitUntilNamesChange(before);
        await home.waitUntilNamesStable();

        const actual = await home.getProductNames();
        const expected = sortByName(actual, c.order);

        expect(actual).toEqual(expected);
      });
    }
  }
);
