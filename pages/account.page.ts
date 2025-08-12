import { Page, expect } from "@playwright/test";

export class AccountPage {
  constructor(private page: Page) {}

  async assertBasics() {
    await expect(this.page).toHaveURL("/account");
    await expect(this.page.locator("h1")).toContainText("My account");
    await expect(this.page.locator("nav")).toContainText("Jane Doe");
  }
}
