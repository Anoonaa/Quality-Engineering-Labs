import { test as base, expect, Page } from '@playwright/test';

/**
 * Custom fixture type for authenticatedPage
 */
type AuthFixtures = {
  authenticatedPage: Page;
};

/**
 * Authenticated page fixture - logs in with admin credentials
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to login page
    await page.goto('/login.html');

    // Fill username field using test-id locator
    await page.fill('[data-testid="login-username"]', 'admin');

    // Fill password field using test-id locator
    await page.fill('[data-testid="login-password"]', 'password123');

    // Click Sign In button using role-based locator
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Wait for dashboard to confirm login success
    await page.waitForSelector('[data-testid="dashboard-section"]', { state: 'visible' });

    // Use the authenticated page in the test
    await use(page);
  },
});

export { expect };
