import { test } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { ProductPage } from "../../pages/product.page";

test.describe("Product details", () => {
  test("Verify price, add to cart and add to favorites", async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);

    await home.goto();
    await home.openProductByName("Combination Pliers");

    await product.expectName("Combination Pliers");
    await product.expectPrice("14.15");

    await product.addToCartAndCheckMessage();
    await product.addToFavorites();

    await product.header.expectCartCount("1");
  });
});
