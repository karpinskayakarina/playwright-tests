import { Page, expect } from "@playwright/test";

export class AccountPage {
  constructor(private page: Page) {}

  private heading = this.page.getByRole("heading", { name: /my account/i });

  async goto() {
    await this.page.goto("/account");
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
  }

  async assertBasics() {
    await expect(this.page).toHaveURL("/account");
    await expect(this.page.locator("h1")).toContainText("My account");
    await expect(this.page.getByRole("navigation")).toContainText(/jane doe/i);
  }
}
