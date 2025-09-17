import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration
 * and https://github.com/motdotla/dotenv for env variables
 */

const UI_BASE_URL =
  process.env.UI_BASE_URL ?? "https://practicesoftwaretesting.com";

export default defineConfig({
  testDir: "./tests",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { open: "never" }],
    ["dot"],
    ["json", { outputFile: "reports/report.json" }],
  ],

  /* Shared settings for all the projects below. */
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",

    testIdAttribute: "data-test",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    storageState: { cookies: [], origins: [] },
    contextOptions: { serviceWorkers: "block" },

    /* Collect trace when retrying the failed test. */
    trace: "on-first-retry",
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "perform-login",
      testMatch: /auth-setup\.spec\.ts/,
      use: { baseURL: UI_BASE_URL },
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["perform-login"],
    },
    {
      name: "chromium-smoke",
      grep: /@smoke/,
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["perform-login"],
    },
    {
      name: "chromium-regression",
      grep: /@regression/,
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["perform-login"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      dependencies: ["perform-login"],
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    // {
    //   name: "Google Chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "npm run start",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
