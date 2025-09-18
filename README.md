# QA MASTER — Playwright Automation Roadmap

Public, end-to-end QA stack with **Playwright + TypeScript**. Covers **UI (desktop/mobile + Sauce Labs)**, **API (Restful-Booker)**, and **non-functional** checks (performance, accessibility, reliability).  
I’m sharing each milestone as a **step-by-step Miro board** and keeping this repo updated.

- **Repo:** this project  
- **UI target:** https://automationintesting.online  
- **API target:** https://restful-booker.herokuapp.com/apidoc/index.html#api-Booking-GetBookings

---

## ✨ Current scope

- Playwright config with desktop + mobile projects
- Env strategy: `.env.example` (template), local `.env`, CI Secrets
- Prettier + ignore files
- Basic smoke test + HTML report

> Upcoming: API tests, non-functional checks (perf/a11y), data quality, AI-assisted workflows, **Sauce Labs** matrix, CI/CD.

---

## 🧰 Prerequisites

- **Node.js** ≥ 18  
- Git  
- (Windows) PowerShell or CMD  

---

## 📦 All-in-One Setup & Usage

```markdown
### 📦 Available Scripts
{
  "test": "playwright test",
  "report": "playwright show-report",
  "headed": "playwright test --headed",
  "debug": "playwright test --debug",
  "format": "prettier . --write",
  "pretest": "prettier . --check"
}

### 🚀 Main Commands
Run all tests:
npm run test

Run tests in headed mode (browser visible):
npm run headed

Open the latest HTML report:
npm run report

### 🧪 Example Test
File: tests/home.spec.ts

import { test, expect } from '@playwright/test';

test('home title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Welcome to Shady Meadows B&B');
});

### 📊 Reports
After test execution, Playwright generates an HTML report.
Open it with:
npm run report

### 📌 Notes
- This project uses Prettier for code formatting and style checking.
- Base URL and credentials are managed through environment variables for better security.
