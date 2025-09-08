import { Page, expect } from "@playwright/test";
import { makeAddress, type Address } from "tests/data/address";

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

  async fillAddress(address?: Partial<Address>): Promise<void> {
    const a: Address = makeAddress(address);
    const fields: Record<
      "street" | "city" | "country" | "postal_code",
      string
    > = {
      street: a.street,
      city: a.city,
      country: a.country,
      postal_code: a.postalCode,
    };

    for (const [testId, value] of Object.entries(fields) as Array<
      [keyof typeof fields, string]
    >) {
      await this.page.getByTestId(testId as string).fill(value);
    }
  }
}
