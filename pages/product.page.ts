import { HeaderFragment } from " tests/fragments/header.fragments";
import { Page, expect } from "@playwright/test";

export class ProductPage {
  private readonly selectors = {
    addToCart: '[data-test="add-to-cart"]',
    cartQuantity: '[data-test="cart-quantity"]',
    cartIcon: '[data-test="nav-cart"]',
  } as const;

  constructor(private page: Page) {
    this.header = new HeaderFragment(page);
  }
  readonly header: HeaderFragment;

  async expectName(name: string) {
    await expect(this.page.getByTestId("product-name")).toHaveText(name);
  }

  async expectPrice(price: string | RegExp) {
    await expect(this.page.getByTestId("unit-price")).toContainText(price);
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
    await expect(
      this.page.getByRole("button", { name: "Add to favourites" })
    ).toBeVisible();
    await this.page.getByTestId("add-to-favorites").click();
    await expect(
      this.page.getByText(
        "Unauthorized, can not add product to your favorite list."
      )
    ).toBeVisible();
  }
}
