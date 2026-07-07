import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('link', { name: 'Open Open leads from Zoho' }).click();
  await page.getByLabel('308Open leads from Zoho').getByText('Loan/ Lead Req. Details').click();
  await page.getByRole('cell', { name: 'LD202606151' }).click();
  await page.getByText('Funder Selection & In-').click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('.funBox > .ng-star-inserted > img').first().click();
  await page.locator('#logo1 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo2 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo3 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo4 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo5 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo11 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo10 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo9 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo7 > .funBox > .ng-star-inserted > img').click();
  await page.locator('#logo6 > .funBox > .ng-star-inserted > img').click();
  await page.getByRole('button', { name: 'Save' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Send To Financier' }).click();
});