import { test as base } from "@playwright/test";
import { AllPages } from "@pages/allPages";

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
    await app.loginPage.gotoLogin();
    await app.loginPage.performSuccessLogin();
    await use(app);
  },
});

export { expect } from "@playwright/test";
