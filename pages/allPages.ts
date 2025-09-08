import { Page } from "@playwright/test";
import { HomePage } from "./home.page";
import { LoginPage } from "./login.page";
import { AccountPage } from "./account.page";
import { ProductPage } from "./product.page";
import { CartPage } from "./cart.page";
import { PaymentPage } from "./payment.page";

export class AllPages {
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;
  readonly accountPage: AccountPage;
  readonly productPage: ProductPage;
  readonly cartPage: CartPage;
  readonly paymentPage: PaymentPage;

  constructor(page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.accountPage = new AccountPage(page);
    this.productPage = new ProductPage(page);
    this.cartPage = new CartPage(page);
    this.paymentPage = new PaymentPage(page);
  }
}
