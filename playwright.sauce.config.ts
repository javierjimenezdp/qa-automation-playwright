import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ajusta si tu carpeta es otra
  testDir: 'test/e2e',

  // opciones generales (no definimos "projects")
  use: {
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'off',
  },
});
