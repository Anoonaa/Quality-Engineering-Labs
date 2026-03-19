import { test, expect } from './fixtures';


test.describe('Airtime Sale Transaction', () => {
  test('should process an airtime sale with MTN provider for R29', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

  
    // Navigate directly to the payment page
    await page.goto('/payment.html');
    await expect(page.getByTestId('page-title')).toBeVisible();

    // Fill Customer Phone Number using getByLabel locator
    await page.getByLabel('Customer Phone Number').fill('0821234567');

    // Select product 'airtime' using test-id locator
    await page.getByTestId('select-product').selectOption('airtime');

    // Select provider 'MTN' using test-id locator
    await page.getByTestId('select-provider').selectOption('MTN');

    // Select the R29 quick amount button
    await page.getByTestId('quick-R29').click();

    // Check the terms and conditions checkbox
    await page.getByTestId('check-terms').check();

  
    // Verify receipt is generated with reference number

    // Click the Process Sale button
    await page.getByTestId('submit-btn').click();

    // Wait for and assert that receipt container becomes visible
    await expect(page.getByTestId('sale-receipt')).toBeVisible();

    // Assert that receipt reference is present
    await expect(page.getByTestId('receipt-ref')).toBeVisible();
  });
});
