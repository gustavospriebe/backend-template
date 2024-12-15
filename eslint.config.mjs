import pluginJs from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import vitest from "eslint-plugin-vitest"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["build/", "node_modules/"] },
  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  {
    files: ["tests/**"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/max-nested-describe": ["error", { max: 3 }],
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  eslintConfigPrettier,
]
