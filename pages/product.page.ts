import { HeaderFragment } from "tests/fragments/header.fragments";
import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly header: HeaderFragment;

  constructor(private readonly page: Page) {
    this.header = new HeaderFragment(page);
  }

  get name(): Locator {
    return this.page.getByTestId("product-name");
  }

  get unitPrice(): Locator {
    return this.page.getByTestId("unit-price");
  }

  get addToast(): Locator {
    return this.page.getByText("Product added to shopping cart.");
  }

  get addToFavoritesButton(): Locator {
    return this.page.getByRole("button", { name: /add to favourites/i });
  }

  get favoritesUnauthorizedToast(): Locator {
    return this.page.getByText(
      "Unauthorized, can not add product to your favorite list."
    );
  }

  get cartQuantity(): Locator {
    return this.page.getByTestId("cart-quantity");
  }

  async addToCart(): Promise<void> {
    await this.page.getByTestId("add-to-cart").click();
  }

  async openCart(): Promise<void> {
    await this.page.getByTestId("nav-cart").click();
  }

  async clickAddToFavorites(): Promise<void> {
    await this.page.getByTestId("add-to-favorites").click();
  }

  async expectUnitPriceEquals(expectedWithCurrency: string) {
    const numeric = expectedWithCurrency.replace(/[^\d.,]/g, "");
    await expect(this.unitPrice).toHaveText(
      new RegExp(`^\\s*\\$?\\s*${numeric}\\s*$`)
    );
  }
}
