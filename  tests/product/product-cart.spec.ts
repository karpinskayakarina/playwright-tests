import { test } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { ProductPage } from "../../pages/product.page";
import { CartPage } from "../../pages/cart.page";

test("Verify user can add product to cart", async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.goto();

  await home.openProductByName("Slip Joint Pliers");

  await product.expectName("Slip Joint Pliers");
  await product.expectPrice("9.17");

  await product.addToCartAndCheckMessage();

  await product.header.expectCartCount("1");

  await product.openCart();

  await cart.expectOnCheckoutPage();
  await cart.expectProductTitle("Slip Joint Pliers");
  await cart.expectProceedToCheckoutVisible();
});
