import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";
import { ProductPage } from "../../pages/product.page";
import { CartPage } from "../../pages/cart.page";
import { PRODUCTS } from "../data/products";

const P = PRODUCTS.SLIP_JOINT_PLIERS;

test(
  "Verify user can add product to cart",
  {
    tag: "@regression",
  },
  async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await test.step("Open home and navigate to product", async () => {
      await home.goto();
      await home.openProductByName(P.name);
    });

    await test.step("Verify PDP name and price", async () => {
      await expect(product.name).toHaveText(P.name);
      await expect(product.unitPrice).toContainText(P.price);
    });

    await test.step("Add to cart and verify toast", async () => {
      await product.addToCart();
      await expect(product.addToast).toBeVisible();
      await expect(product.addToast).toHaveText(
        "Product added to shopping cart."
      );
      await expect(product.addToast).toBeHidden({ timeout: 8000 });
    });

    await test.step("Verify cart badge and open cart", async () => {
      await product.header.expectCartCount(1);
      await product.openCart();
    });

    await test.step("Verify checkout page and product row", async () => {
      await cart.expectOnCheckoutPage();
      await cart.expectProductTitleEquals(P.name);
      await cart.expectProceedToCheckoutVisible();
    });
  }
);
