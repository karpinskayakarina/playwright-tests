import { Page, expect } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  private selectors = {
    addToCart: '[data-test="add-to-cart"]',
    addToFavorites: '[data-test="add-to-favorites"]',
    cartIcon: '[data-test="nav-cart"]',
    cartQuantity: '[data-test="cart-quantity"]',
  };

  async expectName(name: string) {
    await expect(this.page.locator('[data-test="product-name"]')).toHaveText(
      name
    );
  }

  async expectPrice(price: string | RegExp) {
    await expect(this.page.locator('[data-test="unit-price"]')).toContainText(
      price
    );
  }

  async expectProductButtonsVisible(
    ...buttons: (keyof typeof this.selectors)[]
  ) {
    for (const button of buttons) {
      await expect(
        this.page.locator(this.selectors[button]),
        `Button [${button}] should be visible`
      ).toBeVisible();
    }
  }

  async addToCartAndCheckMessage() {
    await this.page.locator(this.selectors.addToCart).click();

    const alert = this.page.getByText("Product added to shopping cart.");
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText("Product added to shopping cart.");
    await expect(alert).toBeHidden({ timeout: 8000 });
  }

  async expectCartCount(count: string) {
    await expect(this.page.locator(this.selectors.cartQuantity)).toHaveText(
      count
    );
  }

  async openCart() {
    await this.page.locator(this.selectors.cartIcon).click();
  }

  async addToFavorites() {
    await this.page.locator(this.selectors.addToFavorites).click();
    await expect(
      this.page.getByText(
        "Unauthorized, can not add product to your favorite list."
      )
    ).toBeVisible();
  }
}
