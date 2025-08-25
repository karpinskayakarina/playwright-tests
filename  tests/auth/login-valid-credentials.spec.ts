import { test } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { AccountPage } from "@pages/account.page";
import { VALID_USER } from "../fixtures/credentials";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

test("Verify login with valid credentials", async ({ page }) => {
  const login = new LoginPage(page);
  const account = new AccountPage(page);

  await login.goto();
  await login.login(VALID_USER.email, VALID_USER.password);
  await account.assertBasics();
});
