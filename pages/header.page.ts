import { Page, expect } from "@playwright/test";

export class HeaderPage {
  constructor(private page: Page) {}

  async expectCartCount(expectedCount: string) {
    await expect(this.page.locator('[data-test="cart-quantity"]')).toHaveText(
      expectedCount
    );
  }
}
