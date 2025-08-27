import { test } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { AccountPage } from "@pages/account.page";
import path from "path";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test.use({ storageState: authFile });

test("Verify login with valid credentials", async ({ page }) => {
  const login = new LoginPage(page);
  const account = new AccountPage(page);

  await login.goto();

  await account.assertBasics();
});
