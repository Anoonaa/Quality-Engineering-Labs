import { test as base, expect, Page } from '@playwright/test';

// =============================================================================
// FIXTURES — Demonstrates custom Playwright fixtures
// =============================================================================

// --- Custom fixture: Pre-filled form page ---
type FormFixtures = {
  formPage: Page;
};

const test = base.extend<FormFixtures>({
  formPage: async ({ page }, use) => {
    // Navigate to the form and pre-fill with data
    await page.goto('/form.html');
    await page.getByTestId('input-fullname').fill('Test User');
    await page.getByTestId('input-email').fill('test@example.com');
    await page.getByTestId('input-password').fill('secret123');
    await page.getByTestId('select-role').selectOption('developer');
    await page.getByTestId('radio-mid').check();
    await page.getByTestId('check-js').check();
    await page.getByTestId('check-ts').check();

    // Provide the pre-configured page to the test
    await use(page);
  },
});

test.describe('Custom Fixtures', () => {

  test('formPage fixture pre-fills the form', async ({ formPage }) => {
    // All these values were set up by the fixture
    await expect(formPage.getByTestId('input-fullname')).toHaveValue('Test User');
    await expect(formPage.getByTestId('input-email')).toHaveValue('test@example.com');
    await expect(formPage.getByTestId('input-password')).toHaveValue('secret123');
    await expect(formPage.getByTestId('select-role')).toHaveValue('developer');
    await expect(formPage.getByTestId('radio-mid')).toBeChecked();
    await expect(formPage.getByTestId('check-js')).toBeChecked();
    await expect(formPage.getByTestId('check-ts')).toBeChecked();
  });

  test('submit pre-filled form from fixture', async ({ formPage }) => {
    // Accept terms and submit
    await formPage.getByTestId('check-terms').check();
    await formPage.getByTestId('submit-btn').click();

    // Verify success
    await expect(formPage.getByTestId('form-success')).toBeVisible();
    await expect(formPage.getByTestId('submitted-data')).toBeVisible();

    // Verify submitted JSON contains our fixture data
    const json = await formPage.getByTestId('submitted-json').textContent();
    expect(json).toContain('Test User');
    expect(json).toContain('test@example.com');
    expect(json).toContain('developer');
  });
});

// --- Custom fixture: Authenticated page ---
type AuthFixtures = {
  authenticatedPage: Page;
};

const authTest = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Set auth state directly via localStorage (no UI interaction needed)
    await page.goto('/login.html');
    await page.evaluate(() => {
      localStorage.setItem('token', 'fixture-test-token-12345');
      localStorage.setItem('user', 'admin');
      localStorage.setItem('loginTime', new Date().toLocaleString());
      sessionStorage.setItem('sessionId', 'fixture-session-abc');
    });
    // Reload to pick up the stored auth
    await page.reload();

    await use(page);
  },
});

authTest.describe('Authenticated Fixture', () => {

  authTest('dashboard is visible after auth fixture setup', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByTestId('dashboard-section')).toBeVisible();
    await expect(authenticatedPage.getByTestId('login-section')).toBeHidden();
  });

  authTest('session info shows fixture data', async ({ authenticatedPage }) => {
    await expect(authenticatedPage.getByTestId('session-username')).toHaveText('admin');
    await expect(authenticatedPage.getByTestId('session-token')).toHaveText('fixture-test-token-12345');
    await expect(authenticatedPage.getByTestId('session-id')).toHaveText('fixture-session-abc');
  });
});

// --- Custom fixture: Todo page with mocked API ---
type TodoFixtures = {
  todoPage: Page;
};

const todoTest = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    // Mock the JSONPlaceholder API with controlled data
    await page.route('**/jsonplaceholder.typicode.com/todos**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, title: 'Fixture todo one', completed: false },
          { id: 2, title: 'Fixture todo two', completed: true },
          { id: 3, title: 'Fixture todo three', completed: false },
        ]),
      });
    });

    await page.goto('/todos.html');

    // Wait for todos to render
    await expect(page.getByTestId('todo-list')).toBeVisible();

    await use(page);
  },
});

todoTest.describe('Mocked Todo Fixture', () => {

  todoTest('renders exactly 3 mocked todos', async ({ todoPage }) => {
    await expect(todoPage.locator('.todo-item')).toHaveCount(3);
  });

  todoTest('mocked todo content is correct', async ({ todoPage }) => {
    await expect(todoPage.getByTestId('todo-text-1')).toHaveText('Fixture todo one');
    await expect(todoPage.getByTestId('todo-text-2')).toHaveText('Fixture todo two');
    await expect(todoPage.getByTestId('todo-text-3')).toHaveText('Fixture todo three');
  });

  todoTest('mocked todo completed state is correct', async ({ todoPage }) => {
    await expect(todoPage.getByTestId('todo-checkbox-1')).not.toBeChecked();
    await expect(todoPage.getByTestId('todo-checkbox-2')).toBeChecked();
    await expect(todoPage.getByTestId('todo-checkbox-3')).not.toBeChecked();
  });
});
