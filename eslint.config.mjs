/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default [
  { ignores: ["playwright-report/**", "node_modules/**", "dist/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["tests/**/*.{ts,tsx}"],
    plugins: { playwright },
    ...playwright.configs["flat/recommended"],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
];
