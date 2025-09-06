import { expect, Page } from "@playwright/test";

export class HeaderFragment {
  constructor(private readonly page: Page) {}

  private readonly cartLink = this.page.getByRole("link", { name: /^cart$/i });

  async expectCartCount(n: string | number) {
    await expect(this.cartLink).toContainText(new RegExp(`\\b${String(n)}\\b`));
  }
}
