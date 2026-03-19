import { test as base, expect, Page } from '@playwright/test';

// Authenticated page fixture — sets auth state via localStorage
type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.setItem('token', 'fixture-test-token-12345');
      localStorage.setItem('user', 'admin');
      localStorage.setItem('loginTime', new Date().toLocaleString());
      sessionStorage.setItem('sessionId', 'fixture-session-abc');
    });
    await page.reload();
    await use(page);
  },
});

export { expect };
