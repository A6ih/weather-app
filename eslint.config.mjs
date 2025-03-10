import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from 'url';
import path from 'path';

import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // Optional, default to process.cwd()
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.extends('eslint-config-airbnb-base'),
  ...compat.plugins("airbnb"),
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
