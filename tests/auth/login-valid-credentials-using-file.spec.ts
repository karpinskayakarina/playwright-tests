import { test } from "@playwright/test";
import { AccountPage } from "@pages/account.page";
import path from "path";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

const authFile = path.join(process.cwd(), "playwright/.auth/user.json");

test.use({ storageState: authFile });

test(
  "Verify login with valid credentials",
  { tag: "@smoke" },
  async ({ page }) => {
    const account = new AccountPage(page);

    await test.step("Open account page", async () => {
      await account.goto();
    });

    await test.step("Assert account basics are visible", async () => {
      await account.assertBasics();
    });
  }
);
