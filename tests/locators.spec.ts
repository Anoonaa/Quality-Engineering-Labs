import { test, expect } from '@playwright/test';

// =============================================================================
// LOCATORS — Demonstrates different ways to find elements on the page
// =============================================================================

test.describe('Locator Strategies', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/form.html');
  });

  // --- By data-testid ---
  test('find elements by data-testid', async ({ page }) => {
    const nameInput = page.getByTestId('input-fullname');
    await expect(nameInput).toBeVisible();

    const emailInput = page.getByTestId('input-email');
    await expect(emailInput).toBeVisible();

    const submitBtn = page.getByTestId('submit-btn');
    await expect(submitBtn).toBeVisible();
  });

  // --- By role ---
  test('find elements by ARIA role', async ({ page }) => {
    // Buttons
    const submitBtn = page.getByRole('button', { name: 'Submit' });
    await expect(submitBtn).toBeVisible();

    const resetBtn = page.getByRole('button', { name: 'Reset' });
    await expect(resetBtn).toBeVisible();

    // Navigation
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    // Links
    const homeLink = page.getByRole('link', { name: /Home/ });
    await expect(homeLink).toBeVisible();

    // Textbox
    const nameInput = page.getByRole('textbox', { name: 'Full Name' });
    await expect(nameInput).toBeVisible();

    // Combobox / select
    const roleSelect = page.getByRole('combobox', { name: 'Select role' });
    await expect(roleSelect).toBeVisible();

    // Radio buttons
    const juniorRadio = page.getByRole('radio', { name: 'Junior' });
    await expect(juniorRadio).toBeVisible();

    // Checkboxes
    const jsCheck = page.getByRole('checkbox', { name: 'JavaScript' });
    await expect(jsCheck).toBeVisible();
  });

  // --- By label ---
  test('find elements by label text', async ({ page }) => {
    const nameInput = page.getByLabel('Full Name');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');

    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toBeVisible();
  });

  // --- By placeholder ---
  test('find elements by placeholder', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Enter your full name');
    await expect(nameInput).toBeVisible();

    const emailInput = page.getByPlaceholder('you@example.com');
    await expect(emailInput).toBeVisible();

    const bioInput = page.getByPlaceholder('Tell us about yourself');
    await expect(bioInput).toBeVisible();
  });

  // --- By text ---
  test('find elements by text content', async ({ page }) => {
    const heading = page.getByText('Form Playground');
    await expect(heading).toBeVisible();

    const desc = page.getByText('A rich form with many input types');
    await expect(desc).toBeVisible();

    const disabledBtn = page.getByText('Disabled Button');
    await expect(disabledBtn).toBeVisible();
  });

  // --- By CSS selector ---
  test('find elements by CSS selector', async ({ page }) => {
    const form = page.locator('#playground-form');
    await expect(form).toBeVisible();

    const inputs = page.locator('.form-group input[type="text"]');
    await expect(inputs.first()).toBeVisible();

    const radioGroup = page.locator('[data-testid="radio-experience"]');
    await expect(radioGroup).toBeVisible();
  });

  // --- Chained / filtered locators ---
  test('use chained and filtered locators', async ({ page }) => {
    // Chain: find a button inside form-actions
    const formActions = page.locator('.form-actions');
    const submitInActions = formActions.getByRole('button', { name: 'Submit' });
    await expect(submitInActions).toBeVisible();

    // Filter: get all checkboxes, filter to the Playwright one
    const allCheckboxes = page.getByRole('checkbox');
    const playwrightCheck = allCheckboxes.filter({ hasText: 'Playwright' });
    // The locator finds the label that wraps the checkbox
    await expect(playwrightCheck).toBeVisible();
  });

  // --- Nth locator ---
  test('use nth() to select specific elements', async ({ page }) => {
    // Get the navigation links
    const navLinks = page.locator('.nav-link');
    await expect(navLinks.first()).toBeVisible();
    await expect(navLinks.nth(1)).toBeVisible();

    // Count
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
