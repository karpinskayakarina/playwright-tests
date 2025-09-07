import { Page, Locator, expect } from "@playwright/test";

export class PaymentPage {
  private readonly paymentMethod: Locator;
  private readonly creditCardNumber: Locator;
  private readonly expirationDate: Locator;
  private readonly cvv: Locator;
  private readonly cardHolderName: Locator;
  private readonly finish: Locator;
  private readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.paymentMethod = page.getByTestId("payment-method");
    this.creditCardNumber = page.getByTestId("credit_card_number");
    this.expirationDate = page.getByTestId("expiration_date");
    this.cvv = page.getByTestId("cvv");
    this.cardHolderName = page.getByTestId("card_holder_name");
    this.finish = page.getByTestId("finish");
    this.successMessage = page.getByTestId("payment-success-message");
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.paymentMethod.selectOption(method);
  }

  async fillCreditCard({
    number,
    expDate,
    cvv,
    holder,
  }: {
    number: string;
    expDate: string;
    cvv: string;
    holder: string;
  }): Promise<void> {
    await this.creditCardNumber.fill(number);
    await this.expirationDate.fill(expDate);
    await this.cvv.fill(cvv);
    await this.cardHolderName.fill(holder);
  }

  async confirmAndExpectSuccess(): Promise<void> {
    await this.finish.click();
    await expect(this.successMessage).toContainText("Payment was successful");
  }
}
