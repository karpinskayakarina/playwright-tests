import { test } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { VALID_USER } from "../fixtures/credentials";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test("Verify login with valid credentials", async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login(VALID_USER.email, VALID_USER.password);

  await page.context().storageState({ path: authFile });
});
