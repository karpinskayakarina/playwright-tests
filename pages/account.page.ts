import { Page, expect } from "@playwright/test";

export class AccountPage {
  constructor(private page: Page) {}

  async assertBasics() {
    await expect(this.page.getByRole("navigation")).toContainText(/jane doe/i);
  }
}
