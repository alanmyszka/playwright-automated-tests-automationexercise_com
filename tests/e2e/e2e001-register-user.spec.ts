import { test, expect } from '@playwright/test';

test.describe('Register user and delete account after tests', () => {
  test('e2e00101 Register User', async ({ page }) => {

    await test.step('Navigate to Automation Exercise', async () => {
      await page.goto('https://automationexercise.com/');

      await expect(page.getByRole('heading', { name: 'Full-Fledged practice website' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Features Items' })).toBeVisible();
    });

    await test.step('Navigate to registration form', async () => {
      await page.getByRole('link', { name: /Signup/ }).click();
      await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    });

    await test.step('Fill in registration form', async () => {
      await page.locator('[data-qa="signup-name"]').fill('TestowyUser');
      await page.locator('[data-qa="signup-email"]').fill('TestowyMail@mail.com');
      await page.locator('[data-qa="signup-button"]').click();
    });

    await test.step('Fill in account details', async () => {
      await expect(page.getByText('Enter Account Information')).toBeVisible();

      await page.locator('[data-qa="title"] #id_gender1').check();
      await page.locator('[data-qa="password"]').fill('TestowyUser');
      await page.locator('[data-qa="days"]').selectOption('11');
      await page.locator('[data-qa="months"]').selectOption('5');
      await page.locator('[data-qa="years"]').selectOption('1989');

      await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
      await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

      await page.locator('[data-qa="first_name"]').fill('FirstName');
      await page.locator('[data-qa="last_name"]').fill('LastName');
      await page.locator('[data-qa="company"]').fill('Company');
      await page.locator('[data-qa="address"]').fill('Address1');
      await page.locator('[data-qa="address2"]').fill('Address2');
      await page.locator('[data-qa="country"]').selectOption('United States');
      await page.locator('[data-qa="state"]').fill('State');
      await page.locator('[data-qa="city"]').fill('City');
      await page.locator('[data-qa="zipcode"]').fill('12345');
      await page.locator('[data-qa="mobile_number"]').fill('5551234567');
    });

    await test.step('Create account', async () => {
      await page.locator('[data-qa="create-account"]').click();
      await expect(page.locator('[data-qa="account-created"]')).toBeVisible();
      await page.locator('[data-qa="continue-button"]').click();
      await expect(page.getByText(/Logged in as TestowyUser/)).toBeVisible();
    });

    await test.step('Delete account', async () => {
      await page.getByRole('link', { name: /Delete Account/ }).click();
      await expect(page.locator('[data-qa="account-deleted"]')).toBeVisible();
      await page.locator('[data-qa="continue-button"]').click();
    });
  });
});