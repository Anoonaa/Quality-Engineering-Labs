import { test, expect } from '@playwright/test';

// =============================================================================
// STATE MANAGEMENT — localStorage, sessionStorage, cookies, auth flows
// =============================================================================

test.describe('Login Flow', () => {

  test.beforeEach(async ({ page }) => {
    // Clear all storage before each test
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();
  });

  test('shows login form when unauthenticated', async ({ page }) => {
    await expect(page.getByTestId('login-section')).toBeVisible();
    await expect(page.getByTestId('dashboard-section')).toBeHidden();
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.getByTestId('login-username').fill('wrong');
    await page.getByTestId('login-password').fill('wrong');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('login-error')).toBeVisible();
  });

  test('successful login navigates to dashboard', async ({ page }) => {
    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    // Dashboard should be visible
    await expect(page.getByTestId('dashboard-section')).toBeVisible();
    await expect(page.getByTestId('login-section')).toBeHidden();
    await expect(page.getByTestId('dashboard-title')).toBeVisible();
  });
});

test.describe('localStorage', () => {

  test('login sets token in localStorage', async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('dashboard-section')).toBeVisible();

    // Verify localStorage values
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
    expect(token).toContain('fake-jwt-token-');

    const user = await page.evaluate(() => localStorage.getItem('user'));
    expect(user).toBe('admin');

    const loginTime = await page.evaluate(() => localStorage.getItem('loginTime'));
    expect(loginTime).toBeTruthy();
  });

  test('persist auth state across page reload', async ({ page }) => {
    await page.goto('/login.html');

    // Set auth state manually
    await page.evaluate(() => {
      localStorage.setItem('token', 'test-persist-token');
      localStorage.setItem('user', 'admin');
      localStorage.setItem('loginTime', 'test-time');
      sessionStorage.setItem('sessionId', 'test-session');
    });

    // Reload — should still be on dashboard
    await page.reload();
    await expect(page.getByTestId('dashboard-section')).toBeVisible();
    await expect(page.getByTestId('session-token')).toHaveText('test-persist-token');
  });

  test('clearing localStorage logs user out', async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.setItem('token', 'some-token');
      localStorage.setItem('user', 'admin');
    });
    await page.reload();
    await expect(page.getByTestId('dashboard-section')).toBeVisible();

    // Clear token and reload
    await page.evaluate(() => localStorage.removeItem('token'));
    await page.reload();
    await expect(page.getByTestId('login-section')).toBeVisible();
  });
});

test.describe('sessionStorage', () => {

  test('login sets sessionId in sessionStorage', async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();

    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('dashboard-section')).toBeVisible();

    const sessionId = await page.evaluate(() => sessionStorage.getItem('sessionId'));
    expect(sessionId).toBeTruthy();
    expect(sessionId).toContain('session-');
  });
});

test.describe('Cookies', () => {

  test('remember-me sets a cookie', async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('remember-me').check();
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('dashboard-section')).toBeVisible();

    // Check cookies
    const cookies = await page.context().cookies();
    const rememberCookie = cookies.find(c => c.name === 'rememberMe');
    expect(rememberCookie).toBeTruthy();
    expect(rememberCookie!.value).toBe('true');
  });

  test('no cookie when remember-me is unchecked', async ({ page }) => {
    await page.goto('/login.html');
    await page.evaluate(() => localStorage.clear());
    await page.reload();

    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password123');
    // Don't check remember-me
    await page.getByTestId('login-submit').click();

    await expect(page.getByTestId('dashboard-section')).toBeVisible();

    const cookies = await page.context().cookies();
    const rememberCookie = cookies.find(c => c.name === 'rememberMe');
    expect(rememberCookie).toBeUndefined();
  });
});

test.describe('Logout', () => {

  test('logout clears auth and shows login', async ({ page }) => {
    // Setup auth
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.setItem('token', 'logout-test-token');
      localStorage.setItem('user', 'admin');
      localStorage.setItem('loginTime', 'test');
      sessionStorage.setItem('sessionId', 'test');
    });
    await page.reload();

    await expect(page.getByTestId('dashboard-section')).toBeVisible();

    // Click logout
    await page.getByTestId('logout-btn').click();

    // Should redirect to login page
    await expect(page).toHaveURL(/login\.html/);

    // Storage should be cleared
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });
});

test.describe('Storage State (storageState)', () => {

  test('can save and restore storage state', async ({ page, context }) => {
    // Login
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.reload();

    await page.getByTestId('login-username').fill('admin');
    await page.getByTestId('login-password').fill('password123');
    await page.getByTestId('login-submit').click();
    await expect(page.getByTestId('dashboard-section')).toBeVisible();

    // Save storage state
    const storageState = await context.storageState();
    expect(storageState.origins.length).toBeGreaterThan(0);

    // Verify the storage state contains our auth data
    const origin = storageState.origins[0];
    const tokenEntry = origin.localStorage.find(e => e.name === 'token');
    expect(tokenEntry).toBeTruthy();
    expect(tokenEntry!.value).toContain('fake-jwt-token-');
  });
});
