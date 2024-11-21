import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    baseURL: "http://localhost:3001", // ou a porta do seu Vite
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "npm run init:db-test", // Comando para iniciar o json-server
      port: 3002, // Porta do json-server (ajuste se necessário)
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "npm run dev", // Comando para iniciar o Vite
      port: 3001, // Porta do Vite
      reuseExistingServer: !process.env.CI,
    },
  ],
});
