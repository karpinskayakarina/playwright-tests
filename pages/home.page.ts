import { Category } from "tests/enums/product.categories";
import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly titles: Locator;
  private get prices(): Locator {
    return this.page.getByTestId("product-price").locator(":visible");
  }

  constructor(private readonly page: Page) {
    this.titles = page.getByTestId("product-name");
  }

  async namesSignature(): Promise<string> {
    const texts = await this.titles.allInnerTexts();
    return texts.map((s) => s.trim()).join("|");
  }

  private async nextAnimationFrame(): Promise<void> {
    await this.page.evaluate(
      () => new Promise<void>((r) => requestAnimationFrame(() => r()))
    );
  }

  private async isNamesStableOnce(): Promise<boolean> {
    const a = await this.namesSignature();
    await this.nextAnimationFrame();
    const b = await this.namesSignature();
    return a === b;
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async openProductByName(name: string): Promise<void> {
    await this.titles.filter({ hasText: name }).click();
  }

  async selectSort(label: string): Promise<void> {
    await this.page.getByTestId("sort").selectOption({ label });
  }

  async waitUntilNamesChange(prevSignature: string): Promise<void> {
    await expect
      .poll(async () => this.namesSignature())
      .not.toBe(prevSignature);
  }

  async waitUntilNamesStable(): Promise<void> {
    await expect.poll(async () => this.isNamesStableOnce()).toBe(true);
  }

  async getProductNames(): Promise<string[]> {
    await expect(this.titles.first()).toBeVisible();
    return this.titles.allTextContents();
  }

  async getProductPriceTexts(): Promise<string[]> {
    return this.prices.allInnerTexts();
  }

  async clickCategory(category: Category): Promise<void> {
    const checkbox = this.page.getByRole("checkbox", {
      name: new RegExp(`^\\s*${category}\\s*$`, "i"),
    });
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
  }

  async areProductsFilteredBy(category: Category): Promise<boolean> {
    const texts = (await this.getProductNames()).map((t) => t.toLowerCase());
    return (
      texts.length > 0 && texts.every((t) => t.includes(category.toLowerCase()))
    );
  }
}
