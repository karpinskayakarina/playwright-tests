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
}
