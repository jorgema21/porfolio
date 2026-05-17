import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

export default ts.config(
  {
    // Reemplaza por completo al archivo .eslintignore
    ignores: ["node_modules/", ".svelte-kit/", "build/", "dist/"],
  },

  // JS base
  js.configs.recommended,

  // TS base
  ...ts.configs.recommended,

  // Svelte base
  ...svelte.configs["flat/recommended"],

  // Configuración global y de entorno
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Configuración de parseadores para Svelte 5 (Componentes y Archivos de Estado)
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

  // Tus reglas personalizadas
  {
    rules: {
      "svelte/require-each-key": "error",
      "svelte/no-dupe-else-if-blocks": "error",
      "svelte/no-unused-svelte-ignore": "warn",
      "svelte/no-ignored-unsubscribe": "warn",
      "svelte/no-navigation-without-resolve": "off",

      // Ignora variables sin usar si empiezan con un guion bajo
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
