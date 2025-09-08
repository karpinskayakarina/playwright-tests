import { test as base } from "@playwright/test";
import { AllPages } from "@pages/allPages";
import { VALID_USER } from "./credentials";

type Fixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },

  loggedInApp: async ({ app }, use) => {
    await app.loginPage.goto();
    await app.loginPage.performSuccessLogin(
      VALID_USER.email,
      VALID_USER.password
    );
    await use(app);
  },
});

export { expect } from "@playwright/test";
