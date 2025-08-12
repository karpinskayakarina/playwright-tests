import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  private emailInput = this.page.locator('[data-test="email"]');
  private passwordInput = this.page.locator('[data-test="password"]');
  private submitBtn = this.page.locator('[data-test="login-submit"]');

  async goto() {
    await this.page.goto("/auth/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL("/account"),
      this.submitBtn.click(),
    ]);
  }
}
