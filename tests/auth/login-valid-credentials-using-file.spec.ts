import { test } from "@playwright/test";
import { AccountPage } from "@pages/account.page";
import path from "path";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test.use({ storageState: authFile });

test("Verify login with valid credentials", async ({ page }) => {
  const account = new AccountPage(page);

  await account.goto();

  await account.assertBasics();
});
