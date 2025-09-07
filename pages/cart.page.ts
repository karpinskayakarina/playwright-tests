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

  async expectAlreadyLoggedIn() {
    await expect(
      this.page.getByText(
        "Hello Jane Doe, you are already logged in. You can proceed to checkout."
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
  }) {
    if (street) {
      const streetInput = this.page.getByTestId("street");
      if ((await streetInput.inputValue()).trim() === "") {
        await streetInput.fill(street);
      }
    }

    if (city) {
      const cityInput = this.page.getByTestId("city");
      if ((await cityInput.inputValue()).trim() === "") {
        await cityInput.fill(city);
      }
    }

    if (country) {
      const countryInput = this.page.getByTestId("country");
      if ((await countryInput.inputValue()).trim() === "") {
        await countryInput.fill(country);
      }
    }

    if (postalCode) {
      const postalInput = this.page.getByTestId("postal_code");
      if ((await postalInput.inputValue()).trim() === "") {
        await postalInput.fill(postalCode);
      }
    }
  }
}
