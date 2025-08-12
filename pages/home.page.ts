import { Categories } from " tests/catalog/categories";
import { Page, expect } from "@playwright/test";
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async openProductByName(name: string) {
    await this.page
      .locator('[data-test="product-name"]', { hasText: name })
      .click();
  }

  async expectCartCount(expectedCount: string) {
    await expect(this.page.locator('[data-test="cart-quantity"]')).toHaveText(
      expectedCount
    );
  }

  async selectSort(optionLabel: string) {
    await this.page
      .locator('[data-test="sort"]')
      .selectOption({ label: optionLabel });
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
