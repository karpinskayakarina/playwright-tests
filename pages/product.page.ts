import { HeaderFragment } from " tests/fragments/header.fragments";
import { Page, expect } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {
    this.header = new HeaderFragment(page);
  }
  readonly header: HeaderFragment;

  private selectors = {
    addToCart: '[data-test="add-to-cart"]',
    addToFavorites: '[data-test="add-to-favorites"]',
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

  async addToCart() {
    await expect(
      this.page.getByRole("button", { name: "Add to cart" })
    ).toBeVisible();
    await this.page.locator('[data-test="add-to-cart"]').click();
    await expect(
      this.page.getByText("Product added to shopping cart.")
    ).toBeVisible();
  }

  async addToFavorites() {
    await expect(
      this.page.getByRole("button", { name: "Add to favourites" })
    ).toBeVisible();
    await this.page.locator('[data-test="add-to-favorites"]').click();
    await expect(
      this.page.getByText(
        "Unauthorized, can not add product to your favorite list."
      )
    ).toBeVisible();
  }
}
