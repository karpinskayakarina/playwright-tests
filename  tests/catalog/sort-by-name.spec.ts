import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";

const cases = [
  { label: "Name (A - Z)", order: "asc" as const },
  { label: "Name (Z - A)", order: "desc" as const },
];

const norm = (s: string) => s.trim().toLocaleLowerCase("en");

test.describe("Sort by name", () => {
  for (const { label, order } of cases) {
    test(`sort by name ${order}`, async ({ page }) => {
      const home = new HomePage(page);

      await home.goto();
      await home.selectSort(label);

      const actual = (await home.getProductNames()).map(norm);
      const expected = [...actual].sort();
      if (order === "desc") expected.reverse();

      expect(actual).toEqual(expected);
    });
  }
});
