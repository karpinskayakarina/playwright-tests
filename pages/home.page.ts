import { Categories } from " tests/catalog/categories";
import { Page, expect } from "@playwright/test";
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async openProductByName(name: string) {
    await this.page
      .getByTestId("product-name")
      .filter({ hasText: name })
      .click();
  }

  async selectSort(label: string) {
    const names = this.page.getByTestId("product-name");
    const before = await names.allTextContents();

    await this.page.getByTestId("sort").selectOption({ label });

    await expect.poll(() => names.allTextContents()).not.toEqual(before);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('[data-test="product-name"]').allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return this.page.locator('[data-test="product-price"]').allTextContents();
  }

  async clickCategory(category: Categories) {
    const categoryLocator = this.page.getByLabel(
      new RegExp(`^\\s*${category}\\s*$`, "i")
    );
    await categoryLocator.scrollIntoViewIfNeeded();
    await categoryLocator.check({ force: true });
  }
}
