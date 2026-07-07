import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Open Open leads from Zoho' }).click();
  await page.getByLabel('308Open leads from Zoho').getByText('New / Open Cases').click();
  await page.getByLabel('308Open leads from Zoho').getByText('Lead Prioritization').click();
  await page.getByLabel('308Open leads from Zoho').getByText('Loan/ Lead Req. Details').click();
  await page.getByLabel('308Open leads from Zoho').getByText('R4 - Case Referred to').click();
  await page.getByLabel('308Open leads from Zoho').getByText('R5 - In-Principle Offer from').click();
  await page.getByLabel('308Open leads from Zoho').getByText('R6 - Case referred to').click();
  await page.getByLabel('308Open leads from Zoho').getByText('R9 - Credit Approval').click();
  await page.getByLabel('308Open leads from Zoho').getByText('R10 - Final Document').click();
  await page.getByLabel('308Open leads from Zoho').getByText('R11 - Bank Disbursement').click();
});