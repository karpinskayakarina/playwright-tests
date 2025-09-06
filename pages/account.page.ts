import { Page, expect } from "@playwright/test";

export class AccountPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/account");
  }

  async assertBasics() {
    await expect(this.page).toHaveURL("/account");
    await expect(this.page.locator("h1")).toContainText("My account");
    await expect(this.page.getByRole("navigation")).toContainText(/jane doe/i);
  }
}
