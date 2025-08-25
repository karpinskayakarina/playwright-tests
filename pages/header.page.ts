import { Page, expect } from "@playwright/test";

export class HeaderPage {
  constructor(private page: Page) {}

  async expectCartCount(expectedCount: string) {
    await expect(this.page.getByTestId("cart-quantity")).toHaveText(
      expectedCount
    );
  }
}
