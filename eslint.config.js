import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginJest from "eslint-plugin-jest";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import eslintParser from "@typescript-eslint/parser";

export default [
  // Language options, including parser and globals
  {
    languageOptions: {
      parser: eslintParser,
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: "module",
      },
      globals: {
        node: true,
        es6: true,
        jest: true,
      },
    },

    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      jest: eslintPluginJest,
      prettier: eslintPluginPrettier,
    },

    // Rules for TypeScript and general ESLint setup
    rules: {
      "no-console": "warn", // Example rule from eslint:recommended
      "@typescript-eslint/no-unused-vars": "warn", // Example rule from @typescript-eslint/recommended
      "prettier/prettier": "warn", // Example rule from prettier/recommended
    },

    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },
];
