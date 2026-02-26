import { test, expect } from '@playwright/test';

// =============================================================================
// ASSERTIONS — Demonstrates various Playwright assertion types
// =============================================================================

test.describe('Page-level Assertions', () => {

  test('assert page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Playwright Testing Playground');
  });

  test('assert page URL', async ({ page }) => {
    await page.goto('/form.html');
    await expect(page).toHaveURL(/form\.html/);
  });
});

test.describe('Visibility & Display Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toBeVisible — hero section is displayed', async ({ page }) => {
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await expect(page.getByTestId('hero-title')).toBeVisible();
  });

  test('toBeHidden — logout button is hidden when not logged in', async ({ page }) => {
    await expect(page.getByTestId('logout-btn')).toBeHidden();
  });
});

test.describe('Text Content Assertions', () => {

  test('toHaveText — exact text match', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('counter-value')).toHaveText('0');
  });

  test('toContainText — partial text match', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('hero-subtitle')).toContainText('Playwright');
  });
});

test.describe('Input Value Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/form.html');
  });

  test('toHaveValue — check input value after fill', async ({ page }) => {
    const input = page.getByTestId('input-fullname');
    await input.fill('Jane Smith');
    await expect(input).toHaveValue('Jane Smith');
  });

  test('toHaveValue — check select value', async ({ page }) => {
    const select = page.getByTestId('select-role');
    await select.selectOption('tester');
    await expect(select).toHaveValue('tester');
  });

  test('toHaveValue — check range slider', async ({ page }) => {
    const range = page.getByTestId('input-range');
    await expect(range).toHaveValue('50');

    await range.fill('75');
    await expect(range).toHaveValue('75');
  });
});

test.describe('Checked / Enabled / Disabled Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/form.html');
  });

  test('toBeChecked — checkbox and radio', async ({ page }) => {
    const jsCheckbox = page.getByTestId('check-js');
    await expect(jsCheckbox).not.toBeChecked();

    await jsCheckbox.check();
    await expect(jsCheckbox).toBeChecked();

    const juniorRadio = page.getByTestId('radio-junior');
    await juniorRadio.check();
    await expect(juniorRadio).toBeChecked();
  });

  test('toBeEnabled / toBeDisabled', async ({ page }) => {
    await expect(page.getByTestId('submit-btn')).toBeEnabled();
    await expect(page.getByTestId('disable-btn')).toBeDisabled();
  });
});

test.describe('Attribute & CSS Assertions', () => {

  test('toHaveAttribute', async ({ page }) => {
    await page.goto('/form.html');
    await expect(page.getByTestId('input-email')).toHaveAttribute('type', 'email');
    await expect(page.getByTestId('input-password')).toHaveAttribute('type', 'password');
    await expect(page.getByTestId('input-fullname')).toHaveAttribute('placeholder', 'Enter your full name');
  });

  test('toHaveClass', async ({ page }) => {
    await page.goto('/');
    const activeLink = page.locator('.nav-link.active');
    await expect(activeLink).toHaveClass(/active/);
  });
});

test.describe('Count Assertions', () => {

  test('toHaveCount — number of feature cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(6);
  });

  test('toHaveCount — navigation links', async ({ page }) => {
    await page.goto('/');
    const navLinks = page.locator('.nav-link');
    await expect(navLinks).toHaveCount(5);
  });
});

test.describe('Counter State Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('increment updates the counter', async ({ page }) => {
    await page.getByTestId('increment-btn').click();
    await expect(page.getByTestId('counter-value')).toHaveText('1');

    await page.getByTestId('increment-btn').click();
    await page.getByTestId('increment-btn').click();
    await expect(page.getByTestId('counter-value')).toHaveText('3');
  });

  test('decrement updates the counter', async ({ page }) => {
    await page.getByTestId('decrement-btn').click();
    await expect(page.getByTestId('counter-value')).toHaveText('-1');
  });

  test('reset sets counter back to 0', async ({ page }) => {
    await page.getByTestId('increment-btn').click();
    await page.getByTestId('increment-btn').click();
    await expect(page.getByTestId('counter-value')).toHaveText('2');

    await page.getByTestId('reset-btn').click();
    await expect(page.getByTestId('counter-value')).toHaveText('0');
  });
});

test.describe('Negated Assertions (not)', () => {

  test('not.toBeVisible, not.toHaveText', async ({ page }) => {
    await page.goto('/form.html');
    await expect(page.getByTestId('form-success')).not.toBeVisible();
    await expect(page.getByTestId('error-fullname')).not.toHaveText('Full name is required');
  });
});

test.describe('Soft Assertions', () => {

  test('collect multiple assertion failures', async ({ page }) => {
    await page.goto('/');

    // Soft assertions don't stop the test on failure
    await expect.soft(page.getByTestId('hero-title')).toBeVisible();
    await expect.soft(page.getByTestId('counter-value')).toHaveText('0');
    await expect.soft(page.getByTestId('counter-section')).toBeVisible();
    await expect.soft(page.getByTestId('joke-section')).toBeVisible();
  });
});
