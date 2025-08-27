import { Category } from " tests/enums/product.categories";
import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly titles: Locator;

  constructor(private readonly page: Page) {
    this.titles = page.getByTestId("product-name");
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async openProductByName(name: string): Promise<void> {
    await this.titles.filter({ hasText: name }).click();
  }

  async selectSort(label: string): Promise<void> {
    const names: Locator = this.titles;

    const before = (await names.allTextContents()).join("|");

    await this.page.getByTestId("sort").selectOption({ label });

    await expect
      .poll(async () => (await names.allTextContents()).join("|"))
      .not.toBe(before);

    await expect
      .poll(async () => {
        const a = (await names.allTextContents()).join("|");
        await this.page.waitForTimeout(50);
        const b = (await names.allTextContents()).join("|");
        return a === b;
      })
      .toBe(true);
  }

  async getProductNames(): Promise<string[]> {
    const texts = await this.titles.allTextContents();
    return texts.map((s) => s.trim());
  }

  async clickCategory(category: Category): Promise<void> {
    const checkbox = this.page.getByRole("checkbox", {
      name: new RegExp(`^\\s*${category}\\s*$`, "i"),
    });
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
  }
}
