import { loggedInTestApi as test, expect } from "@fixtures/fixtures";
import { CreditCardDetails } from "../data/card";
import { makeAddress } from "../data/address";
import { plus3MonthsMMYYYY } from "../utils/date";

test(
  "Checkout happy path (loggedInApp)",
  {
    tag: "@smoke",
  },
  async ({ loggedInViaApi: app }) => {
    await app.homePage.goto();

    const { name, priceText } = await app.homePage.getFirstProductMeta();
    await app.homePage.openProductByName(name);

    await expect(app.productPage.name).toHaveText(name);
    await app.productPage.expectUnitPriceEquals(priceText);

    await app.productPage.addToCart();
    await expect(app.productPage.addToast).toBeVisible();
    await expect(app.productPage.addToast).toHaveText(
      "Product added to shopping cart."
    );
    await expect(app.productPage.addToast).toBeHidden({ timeout: 8000 });

    await app.productPage.openCart();
    await app.cartPage.expectOnCheckoutPage();
    await app.cartPage.expectProductTitleEquals(name);

    await app.cartPage.clickProceedToCheckout();
    await app.cartPage.expectAlreadyLoggedIn("Jane Doe");
    await app.cartPage.clickProceedToCheckout();
    await app.cartPage.fillAddress(makeAddress());

    await app.cartPage.clickProceedToCheckout();

    await app.paymentPage.selectPaymentMethod("Credit Card");
    await app.paymentPage.fillCreditCardDetails({
      ...CreditCardDetails,
      expirationDate: plus3MonthsMMYYYY(),
    });

    await app.paymentPage.clickOnConfirmButton();
    await app.paymentPage.expectSuccessHeadingVisible();
  }
);
