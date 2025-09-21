import { loggedInTestApi as test, expect } from "@fixtures/fixtures";
import { CreditCardDetails } from "../data/card";
import { makeAddress } from "../data/address";
import { plus3MonthsMMYYYY } from "../utils/date";

test(
  "Checkout happy path (loggedInApp)",
  { tag: "@smoke" },
  async ({ loggedInViaApi: app }) => {
    await test.step("Open home page", async () => {
      await app.homePage.goto();
    });

    const name =
      await test.step("Open first product and verify PDP header/price", async () => {
        const { name, priceText } = await app.homePage.getFirstProductMeta();
        await app.homePage.openProductByName(name);

        await expect(app.productPage.name).toHaveText(name);
        await app.productPage.expectUnitPriceEquals(priceText);

        return name;
      });

    await test.step("Add to cart and verify toast", async () => {
      await app.productPage.addToCart();
      await expect(app.productPage.addToast).toBeVisible();
      await expect(app.productPage.addToast).toHaveText(
        "Product added to shopping cart."
      );
      await expect(app.productPage.addToast).toBeHidden({ timeout: 8000 });
    });

    await test.step("Go to cart and verify product title", async () => {
      await app.productPage.openCart();
      await app.cartPage.expectOnCheckoutPage();
      await app.cartPage.expectProductTitleEquals(name);
    });

    await test.step("Proceed through address step (already logged in)", async () => {
      await app.cartPage.clickProceedToCheckout();
      await app.cartPage.expectAlreadyLoggedIn("Jane Doe");
      await app.cartPage.clickProceedToCheckout();
      await app.cartPage.fillAddress(makeAddress());
      await app.cartPage.clickProceedToCheckout();
    });

    await test.step("Pay with Credit Card", async () => {
      await app.paymentPage.selectPaymentMethod("Credit Card");
      await app.paymentPage.fillCreditCardDetails({
        ...CreditCardDetails,
        expirationDate: plus3MonthsMMYYYY(),
      });
    });

    await test.step("Confirm order and expect success", async () => {
      await app.paymentPage.clickOnConfirmButton();
      await app.paymentPage.expectSuccessHeadingVisible();
    });
  }
);
