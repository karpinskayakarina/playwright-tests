import { test as base, expect, request } from "@playwright/test";
import { AllPages } from "@pages/allPages";
import { API_BASE_URL } from "tests/config/api.config";

type App = {
  app: AllPages;
};

type LoggedInApp = {
  loggedInApp: AllPages;
};

type LoginResponse = {
  access_token: string;
};

type LoggedInViaApi = {
  loggedInViaApi: AllPages;
};

export const test = base.extend<App>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },
});

export const loggedInTest = base.extend<LoggedInApp>({
  loggedInApp: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ".auth/user.json",
    });
    const page = await context.newPage();
    const app = new AllPages(page);
    await use(app);
    await context.close();
  },
});

export const loggedInTestApi = base.extend<LoggedInViaApi>({
  loggedInViaApi: async ({ page }, use) => {
    const api = await request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: { Accept: "application/json" },
    });

    const resp = await api.post("/users/login", {
      data: { email: process.env.EMAIL, password: process.env.PASSWORD },
    });

    expect(
      resp.ok(),
      `Login failed: ${resp.status()} ${await resp.text()}`
    ).toBeTruthy();
    const { access_token } = (await resp.json()) as LoginResponse;

    await page.addInitScript((token: string) => {
      localStorage.setItem("auth-token", token);
    }, access_token);

    const app = new AllPages(page);
    await use(app);
  },
});

export { expect } from "@playwright/test";
