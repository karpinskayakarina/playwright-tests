import { test } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import path from "path";
import { VALID_USER } from "../fixtures/credentials";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test(
  "Verify login with valid credentials",
  { tag: "@smoke" },
  async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.performSuccessLogin(VALID_USER.email, VALID_USER.password);
    await page.context().storageState({ path: authFile });
  }
);
