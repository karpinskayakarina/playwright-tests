import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async expectOnCheckoutPage() {
    await expect(this.page).toHaveURL("/checkout");
  }

  async expectProductTitle(title: string) {
    await expect(this.page.getByTestId("product-title")).toHaveText(title);
  }

  async expectProceedToCheckoutVisible() {
    await expect(
      this.page.getByRole("button", { name: /proceed to checkout/i })
    ).toBeVisible();
  }
}
