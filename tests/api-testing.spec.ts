import { test, expect } from '@playwright/test';

// =============================================================================
// API TESTING — Route mocking, request interception, API assertions
// =============================================================================

test.describe('API Mocking with page.route()', () => {

  test('mock todo API response', async ({ page }) => {
    await page.route('**/jsonplaceholder.typicode.com/todos**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 100, title: 'Mocked todo item', completed: false },
        ]),
      });
    });

    await page.goto('/todos.html');
    await expect(page.getByTestId('todo-text-100')).toHaveText('Mocked todo item');
    await expect(page.locator('.todo-item')).toHaveCount(1);
  });

  test('mock Chuck Norris joke API', async ({ page }) => {
    await page.route('**/api.chucknorris.io/jokes/random', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          value: 'This is a mocked joke for testing!',
        }),
      });
    });

    await page.goto('/');
    await page.getByTestId('fetch-joke-btn').click();
    await expect(page.getByTestId('joke-text')).toHaveText('This is a mocked joke for testing!');
  });

  test('mock dog API response', async ({ page }) => {
    await page.route('**/dog.ceo/api/breeds/image/random/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: [
            'https://images.dog.ceo/breeds/retriever-golden/n02099601_1.jpg',
            'https://images.dog.ceo/breeds/retriever-golden/n02099601_2.jpg',
          ],
        }),
      });
    });

    // Also mock the breeds list
    await page.route('**/dog.ceo/api/breeds/list/all', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          message: { retriever: ['golden'] },
        }),
      });
    });

    await page.goto('/dogs.html');
    await expect(page.getByTestId('dog-gallery')).toBeVisible();
  });

  test('mock API error response', async ({ page }) => {
    await page.route('**/dog.ceo/api/breeds/image/random/**', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'error', message: 'Server error' }),
      });
    });

    // Mock breeds list to prevent issues
    await page.route('**/dog.ceo/api/breeds/list/all', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success', message: {} }),
      });
    });

    await page.goto('/dogs.html');
    await expect(page.getByTestId('dogs-error')).toBeVisible();
  });
});

test.describe('Request Interception & Inspection', () => {

  test('intercept and verify API request was made', async ({ page }) => {
    const requestPromise = page.waitForRequest('**/jsonplaceholder.typicode.com/todos**');

    await page.goto('/todos.html');

    const request = await requestPromise;
    expect(request.url()).toContain('jsonplaceholder.typicode.com/todos');
    expect(request.method()).toBe('GET');
  });

  test('wait for API response and check status', async ({ page }) => {
    const responsePromise = page.waitForResponse('**/jsonplaceholder.typicode.com/todos**');

    await page.goto('/todos.html');

    const response = await responsePromise;
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });

  test('inspect response body', async ({ page }) => {
    const responsePromise = page.waitForResponse('**/jsonplaceholder.typicode.com/todos**');

    await page.goto('/todos.html');

    const response = await responsePromise;
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('completed');
  });
});

test.describe('API Testing with request context', () => {

  test('make direct GET request to JSONPlaceholder', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('completed');
    expect(body.userId).toBe(1);
  });

  test('make POST request to JSONPlaceholder', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/todos', {
      data: {
        title: 'New test todo',
        completed: false,
        userId: 1,
      },
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe('New test todo');
    expect(body.completed).toBe(false);
    expect(body).toHaveProperty('id');
  });

  test('make PUT request to JSONPlaceholder', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/todos/1', {
      data: {
        id: 1,
        title: 'Updated todo title',
        completed: true,
        userId: 1,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.title).toBe('Updated todo title');
    expect(body.completed).toBe(true);
  });

  test('make DELETE request to JSONPlaceholder', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/todos/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('fetch users from JSONPlaceholder', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(response.ok()).toBeTruthy();

    const users = await response.json();
    expect(users).toHaveLength(10);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('address');
  });
});

test.describe('Network Abort & Modify', () => {

  test('abort specific network requests', async ({ page }) => {
    // Block the Lucide icon CDN
    await page.route('**/unpkg.com/lucide**', (route) => route.abort());

    await page.goto('/');
    // Page should still load, just without icons
    await expect(page.getByTestId('hero-title')).toBeVisible();
  });

  test('modify request headers', async ({ page }) => {
    await page.route('**/jsonplaceholder.typicode.com/**', async (route) => {
      await route.continue({
        headers: {
          ...route.request().headers(),
          'X-Custom-Header': 'playwright-test',
        },
      });
    });

    await page.goto('/todos.html');
    await expect(page.getByTestId('todo-list')).toBeVisible();
  });
});
