import { test as base, expect, request } from "@playwright/test";
import { AllPages } from "@pages/allPages";
import { VALID_USER } from "./credentials";
import { API_BASE_URL } from "tests/config/api.config";

type Fixtures = {
  app: AllPages;
  loggedInApp: AllPages;
};

type LoginResponse = {
  accessToken: string;
  // якщо бекенд повертає ще refreshToken / user — додай їх сюди
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await use(app);
  },

  loggedInApp: async ({ page }, use) => {
    const api = await request.newContext({ baseURL: API_BASE_URL });

    const resp = await api.post("/users/login", {
      data: { email: VALID_USER.email, password: VALID_USER.password },
    });
    expect(resp.ok()).toBeTruthy();

    const { accessToken } = (await resp.json()) as LoginResponse; // ✅ типізація

    await page.addInitScript((token: string) => {
      localStorage.setItem("token", token);
    }, accessToken);

    const app = new AllPages(page);
    await use(app);
  },
});

export { expect } from "@playwright/test";
