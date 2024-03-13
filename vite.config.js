/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "https://stefanpython.github.io/ecom-express-frontend",
  plugins: [react()],
  test: {
    globals: true, // Make Vitest globals available in test files
    environment: "jsdom", // Run tests in a simulated browser environment
    setupFiles: "./src/test/setupTest.js", // Run setup code before each test file
    css: true,
  },
});
