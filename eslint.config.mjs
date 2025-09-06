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
        project: ["./tsconfig.eslint.json"],
        projectService: { allowDefaultProject: ["eslint.config.mjs"] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ["tests/**/*.{ts,tsx}"],
    plugins: { playwright },
    rules: {
      ...playwright.configs["flat/recommended"].rules,

      "playwright/no-skipped-test": ["warn", { allowConditional: true }],

      "playwright/no-conditional-in-test": "off",
    },
  },

  {
    files: ["tests/auth/**/*.spec.ts"],
    rules: {
      "playwright/expect-expect": "off",
    },
  },

  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
];
