import { test } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import path from "path";
import fs from "fs";

test.skip(
  !!process.env.CI,
  "Test is skipped in CI due to the Cloudflare protection."
);

const authFile = path.join(process.cwd(), "playwright/.auth/user.json");

test(
  "Verify login with valid credentials",
  { tag: "@smoke" },
  async ({ page }) => {
    const login = new LoginPage(page);

    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;

    await test.step("Open login page", async () => {
      await login.goto();
    });

    await test.step("Sign in with valid credentials", async () => {
      await login.performSuccessLogin(email, password);
    });

    await test.step("Persist storage state", async () => {
      fs.mkdirSync(path.dirname(authFile), { recursive: true });
      await page.context().storageState({ path: authFile });
    });
  }
);
