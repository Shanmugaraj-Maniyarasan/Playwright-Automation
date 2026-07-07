import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByText('Sales & Loan Details').click();
  await page.getByRole('button', { name: 'Open Loan details' }).click();
  await page.locator('#aldLoanCategory').selectOption('101@T');
  await page.locator('input[name="dealValue"]').click();
  await page.locator('input[name="dealValue"]').fill('600000');
  await page.locator('input[name="marginInCash"]').click();
  await page.locator('input[name="marginInCash"]').fill('200000');
  await page.locator('#yesNo').getByText('Yes').click();
  await page.locator('input[name="aldValOldTracter"]').click();
  await page.locator('input[name="aldValOldTracter"]').fill('20000');
  await page.locator('#tenuremonths').getByRole('combobox').selectOption('48');
  await page.locator('#modeemi').getByRole('combobox').selectOption('M');
  await page.getByText('Free').click();
  await page.locator('input[name="aldNomOwnership"]').click();
  await page.locator('input[name="aldNomOwnership"]').fill('1');
  await page.getByText('No', { exact: true }).nth(1).click();
  await page.getByRole('button', { name: 'Save' }).click();
});