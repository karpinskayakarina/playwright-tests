import { test, expect } from "@fixtures/fixtures";

function plus3MonthsMMYYYY(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${yyyy}`;
}

test("Checkout happy path (loggedInApp)", async ({ loggedInApp: app }) => {
  // 1) Додати перший товар з домашньої, зберегти назву і ціну
  await app.homePage.goto();
  const { name, priceText } = await app.homePage.getFirstProductMeta();
  await app.homePage.openFirstProduct();

  // Перестрахуємось на сторінці товару
  await expect(app.productPage.name).toHaveText(name);
  await expect(app.productPage.unitPrice).toContainText(priceText);

  await app.productPage.addToCart();
  await expect(app.productPage.addToast).toBeVisible();
  await expect(app.productPage.addToast).toHaveText(
    "Product added to shopping cart."
  );
  await expect(app.productPage.addToast).toBeHidden({ timeout: 8000 });

  // 2) Відкрити кошик і звірити назву/ціну/суму
  await app.productPage.openCart();
  await app.cartPage.expectOnCheckoutPage();
  await app.cartPage.expectProductTitle(name);
  await app.cartPage.expectProductAndTotals(priceText);

  // 3) Proceed to checkout
  await app.cartPage.expectProceedToCheckoutVisible();
  await app.cartPage.proceedToCheckoutStep1();

  // 4) Переконатися, що юзер вже залогінений
  await app.cartPage.expectAlreadyLoggedIn();
  await app.cartPage.proceedToCheckoutStep2();

  // 5) Ввести відсутні поля Billing Address
  await app.cartPage.fillShippingAddress("Some State", "1111");
  await app.cartPage.proceedToCheckoutStep3();

  // 6) Оплата: Credit Card + дані, Expiration = +3 місяці
  await app.paymentPage.selectPaymentMethod("credit-card");
  await app.paymentPage.fillCreditCard({
    number: "1111-1111-1111-1111",
    expDate: plus3MonthsMMYYYY(),
    cvv: "111",
    holder: "Any Name",
  });

  // 7) Підтвердити і перевірити успіх
  await app.paymentPage.confirmAndExpectSuccess();
});
