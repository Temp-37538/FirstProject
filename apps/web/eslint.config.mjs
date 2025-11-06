import nextPlugin from "@next/eslint-plugin-next";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  prettier,
  ...nextVitals,
  nextPlugin.configs["core-web-vitals"], 
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
