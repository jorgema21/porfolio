import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

export default ts.config(
  {
    ignores: ["node_modules/", ".svelte-kit/", "build/", "dist/"],
  },

  js.configs.recommended,

  ...ts.configs.recommended,

  ...svelte.configs["flat/recommended"],

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parser: svelte.parser,
      parserOptions: {
        parser: ts.parser,
        extraFileExtensions: [".svelte"],
        projectService: true,
      },
    },
  },

  {
    rules: {
      "svelte/require-each-key": "error",
      "svelte/no-dupe-else-if-blocks": "error",
      "svelte/no-unused-svelte-ignore": "warn",
      "svelte/no-ignored-unsubscribe": "warn",
      "svelte/no-navigation-without-resolve": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
);
