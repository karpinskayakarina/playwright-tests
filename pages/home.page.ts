import { Page } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async openProductByName(name: string) {
    await this.page
      .getByTestId("product-name")
      .filter({ hasText: name })
      .click();
  }
}
