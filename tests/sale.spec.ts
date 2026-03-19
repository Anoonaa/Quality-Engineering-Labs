// imports 
import {test, expect} from './fixtures'
import  testData from './testdata.json'
// data loop for test data 
//precondition for fixture 
//json filename is redeclared
for(const data of testData.testCases) {
  test(data.description, async({authenticatedPage}) => {
    const page = authenticatedPage
    const {customerPhone, product, provider, amount} = data.params


    // Navigate to payment page
  await page.goto('/payment.html')

    // Fill form fields
   await page.getByTestId('input-phone').fill(customerPhone)
   await page.getByTestId('select-product').selectOption(product)
   await page.getByTestId('select-provider').selectOption(provider)
   await page.getByTestId(`quick-R${amount}`).click()
   await page.getByTestId('check-terms').check()


    // Submit form
  //await page.getByRole('button', {name: 'Process Sale'}).click()
  await page.getByTestId('submit-btn').click()
    
    // Verify success
    await expect(page.getByTestId('sale-reciept')).toBeVisible()
    await expect(page.getByTestId('ref-reciept')).toBeVisible()

      })
}