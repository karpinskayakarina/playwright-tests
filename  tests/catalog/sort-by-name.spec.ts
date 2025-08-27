import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { SortLabel, SortOrder } from " tests/enums/sorting";

const collator = new Intl.Collator("en", { sensitivity: "base" });
const collate = (a: string, b: string) => collator.compare(a, b);

const cases: ReadonlyArray<{ label: SortLabel; order: SortOrder }> = [
  { label: SortLabel.AscendingByName, order: SortOrder.Ascending },
  { label: SortLabel.DescendingByName, order: SortOrder.Descending },
];

test.describe("Sort by name", () => {
  for (const c of cases) {
    test(`sort by name ${c.order}`, async ({ page }) => {
      const home = new HomePage(page);

      await home.goto();
      await home.selectSort(c.label);

      const names = page.getByTestId("product-title").locator(":visible");

      const actual = (await names.allInnerTexts()).map((s) => s.trim());
      const expected = [...actual].sort((a, b) =>
        c.order === SortOrder.Ascending ? collate(a, b) : collate(b, a)
      );

      await expect(names).toHaveText(expected, { useInnerText: true });
    });
  }
});
