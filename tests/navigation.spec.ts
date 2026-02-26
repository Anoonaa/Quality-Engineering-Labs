import { test, expect } from '@playwright/test';

// =============================================================================
// NAVIGATION — Multi-page navigation, URL assertions, history
// =============================================================================

test.describe('Page Navigation', () => {

  test('navigate to all pages via navbar', async ({ page }) => {
    await page.goto('/');

    // Home -> Todos
    await page.getByRole('link', { name: /Todos/ }).click();
    await expect(page).toHaveURL(/todos\.html/);
    await expect(page.getByTestId('page-title')).toContainText('Todo List');

    // Todos -> Dogs
    await page.getByRole('link', { name: /Dogs/ }).click();
    await expect(page).toHaveURL(/dogs\.html/);
    await expect(page.getByTestId('page-title')).toContainText('Dog Gallery');

    // Dogs -> Form
    await page.getByRole('link', { name: /Form/ }).click();
    await expect(page).toHaveURL(/form\.html/);
    await expect(page.getByTestId('page-title')).toContainText('Form Playground');

    // Form -> Login
    await page.getByRole('link', { name: /Login/ }).click();
    await expect(page).toHaveURL(/login\.html/);
    await expect(page.getByTestId('login-title')).toContainText('Sign In');
  });

  test('active nav link matches current page', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-link.active')).toContainText('Home');

    await page.goto('/todos.html');
    await expect(page.locator('.nav-link.active')).toContainText('Todos');

    await page.goto('/dogs.html');
    await expect(page.locator('.nav-link.active')).toContainText('Dogs');

    await page.goto('/form.html');
    await expect(page.locator('.nav-link.active')).toContainText('Form');

    await page.goto('/login.html');
    await expect(page.locator('.nav-link.active')).toContainText('Login');
  });
});

test.describe('Hero Link Navigation', () => {

  test('click hero links navigates correctly', async ({ page }) => {
    await page.goto('/');

    // Todos hero link -> todos
    const todosLink = page.locator('.hero-links a[href="todos.html"]');
    await todosLink.click();
    await expect(page).toHaveURL(/todos\.html/);

    // Go back
    await page.goBack();
    await expect(page).toHaveURL(/index\.html|\/$/);
  });
});

test.describe('Browser History', () => {

  test('go back and forward through history', async ({ page }) => {
    await page.goto('/');
    await page.goto('/todos.html');
    await page.goto('/dogs.html');

    // Go back to todos
    await page.goBack();
    await expect(page).toHaveURL(/todos\.html/);

    // Go back to home
    await page.goBack();
    await expect(page).toHaveURL(/index\.html|\/$/);

    // Go forward to todos
    await page.goForward();
    await expect(page).toHaveURL(/todos\.html/);

    // Go forward to dogs
    await page.goForward();
    await expect(page).toHaveURL(/dogs\.html/);
  });
});

test.describe('Page Titles', () => {

  test('each page has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Playwright Testing Playground');

    await page.goto('/todos.html');
    await expect(page).toHaveTitle('Todos - Playwright Lab');

    await page.goto('/dogs.html');
    await expect(page).toHaveTitle('Dog Gallery - Playwright Lab');

    await page.goto('/form.html');
    await expect(page).toHaveTitle('Form Playground - Playwright Lab');

    await page.goto('/login.html');
    await expect(page).toHaveTitle('Login - Playwright Lab');
  });
});

test.describe('Waiting for Navigation', () => {

  test('waitForURL after navigation', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /Todos/ }).click();
    await page.waitForURL('**/todos.html');

    // Now we can safely assert post-navigation state
    await expect(page.getByTestId('page-title')).toContainText('Todo List');
  });

  test('waitForLoadState', async ({ page }) => {
    await page.goto('/todos.html');
    await page.waitForLoadState('networkidle');

    // After network idle, todos should be loaded
    await expect(page.getByTestId('todo-list')).toBeVisible();
  });
});

test.describe('Multiple Pages / Tabs', () => {

  test('open link in new tab context', async ({ context }) => {
    const page1 = await context.newPage();
    await page1.goto('http://localhost:4200/');
    await expect(page1).toHaveTitle('Playwright Testing Playground');

    const page2 = await context.newPage();
    await page2.goto('http://localhost:4200/todos.html');
    await expect(page2).toHaveTitle('Todos - Playwright Lab');

    // Both pages exist simultaneously
    await expect(page1.getByTestId('hero-title')).toBeVisible();
    await expect(page2.getByTestId('page-title')).toContainText('Todo List');

    await page1.close();
    await page2.close();
  });
});

test.describe('Reload', () => {

  test('page state resets on reload', async ({ page }) => {
    await page.goto('/');

    // Increment counter
    await page.getByTestId('increment-btn').click();
    await page.getByTestId('increment-btn').click();
    await expect(page.getByTestId('counter-value')).toHaveText('2');

    // Reload resets state
    await page.reload();
    await expect(page.getByTestId('counter-value')).toHaveText('0');
  });
});
