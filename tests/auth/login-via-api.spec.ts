import { loggedInTestApi as test } from "@fixtures/fixtures";

test(
  "Login test with valid credentials via API",
  { tag: "@smoke" },
  async ({ loggedInViaApi: app }) => {
    await test.step("Open account page", async () => {
      await app.accountPage.goto();
    });

    await test.step("Verify account page loaded", async () => {
      await app.accountPage.expectLoaded();
    });

    await test.step("Assert account basics", async () => {
      await app.accountPage.assertBasics();
    });
  }
);
