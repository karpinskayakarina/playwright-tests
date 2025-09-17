import { loggedInTestApi as test } from "@fixtures/fixtures";

test(
  "Login test with valid credentials via API",
  {
    tag: "@smoke",
  },
  async ({ loggedInViaApi: app }) => {
    await app.accountPage.goto();

    await app.accountPage.expectLoaded();

    await app.accountPage.assertBasics();
  }
);
