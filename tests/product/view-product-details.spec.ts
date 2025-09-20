import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { ProductPage } from "../../pages/product.page";
import { PRODUCTS } from "../data/products";

const P = PRODUCTS.COMBINATION_PLIERS;

test.describe("Product details", () => {
  test(
    "Verify price, add to cart and add to favorites",
    {
      tag: "@regression",
    },
    async ({ page }) => {
      const home = new HomePage(page);
      const product = new ProductPage(page);

      await home.goto();
      await home.openProductByName(P.name);

      await expect(product.name).toHaveText("Combination Pliers");
      await expect(product.unitPrice).toContainText("14.15");

      await product.addToCart();
      await expect(product.addToast).toBeVisible();
      await expect(product.addToast).toHaveText(
        "Product added to shopping cart."
      );
      await expect(product.addToast).toBeHidden({ timeout: 8000 });

      await expect(product.addToFavoritesButton).toBeVisible();
      await product.clickAddToFavorites();
      await expect(product.favoritesUnauthorizedToast).toBeVisible();

      await product.header.expectCartCount(1);
    }
  );
});
