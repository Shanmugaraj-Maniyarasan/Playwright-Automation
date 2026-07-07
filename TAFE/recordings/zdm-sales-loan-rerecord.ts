import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Open Open leads from Zoho' }).click();
  await page.getByLabel('308Open leads from Zoho').getByText('Lead Prioritization').click();
  await page.getByRole('cell', { name: 'LD202606152' }).click();
  await page.getByText('Sales & Loan Details').click();
  await page.getByRole('button', { name: 'Open Loan details' }).click();
  await page.getByRole('button', { name: 'Check Financier Eligibility' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
});