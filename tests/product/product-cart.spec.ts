import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { ProductPage } from "../../pages/product.page";
import { CartPage } from "../../pages/cart.page";
import { PRODUCTS } from "../data/products";

const P = PRODUCTS.SLIP_JOINT_PLIERS;

test("Verify user can add product to cart", async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await home.goto();
  await home.openProductByName(P.name);

  await expect(product.name).toHaveText(P.name);
  await expect(product.unitPrice).toContainText(P.price);

  await product.addToCart();
  await expect(product.addToast).toBeVisible();
  await expect(product.addToast).toHaveText("Product added to shopping cart.");
  await expect(product.addToast).toBeHidden({ timeout: 8000 });

  await product.header.expectCartCount(1);
  await product.openCart();

  await cart.expectOnCheckoutPage();
  await cart.expectProductTitle(P.name);
  await cart.expectProceedToCheckoutVisible();
});
