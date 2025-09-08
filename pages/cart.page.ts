import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async expectOnCheckoutPage() {
    await expect(this.page).toHaveURL("/checkout");
  }

  async expectOnCartPage() {
    await expect(this.page).toHaveURL("/cart");
  }

  async expectProductTitleEquals(title: string) {
    await expect(this.page.getByTestId("product-title")).toHaveText(title);
  }

  async expectProceedToCheckoutVisible() {
    await expect(
      this.page.getByRole("button", { name: /proceed to checkout/i })
    ).toBeVisible();
  }

  async expectAlreadyLoggedIn(username: string) {
    await expect(
      this.page.getByText(
        `Hello ${username}, you are already logged in. You can proceed to checkout.`
      )
    ).toBeVisible();
  }

  async clickProceedToCheckout() {
    await Promise.all([
      this.page.waitForURL("/checkout"),
      this.page.getByRole("button", { name: /proceed to checkout/i }).click(),
    ]);
  }

  async fillAddressIfEmpty({
    street,
    city,
    country,
    postalCode,
  }: {
    street?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  }): Promise<void> {
    const fields: Record<string, string | undefined> = {
      street,
      city,
      country,
      postal_code: postalCode,
    };

    for (const [testId, value] of Object.entries(fields)) {
      if (value) {
        await this.page.getByTestId(testId).fill(value);
      }
    }
  }
}
