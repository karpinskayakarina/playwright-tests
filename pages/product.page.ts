import { HeaderFragment } from " tests/fragments/header.fragments";
import { Page, expect } from "@playwright/test";

export class ProductPage {
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

  async addToCart() {
    await expect(
      this.page.getByRole("button", { name: "Add to cart" })
    ).toBeVisible();
    await this.page.getByTestId("add-to-cart").click();
    await expect(
      this.page.getByText("Product added to shopping cart.")
    ).toBeVisible();
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
