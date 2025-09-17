import { test } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import path from "path";

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

    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;

    await login.goto();
    await login.performSuccessLogin(email, password);

    await page.context().storageState({ path: authFile });
  }
);
