import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  private emailInput = this.page.getByTestId("email");
  private passwordInput = this.page.getByTestId("password");
  private submitBtn = this.page.getByTestId("login-submit");

  async goto() {
    await this.page.goto("/auth/login");
  }

  async performSuccessLogin(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL("/account"),
      this.submitBtn.click(),
    ]);
  }
}
