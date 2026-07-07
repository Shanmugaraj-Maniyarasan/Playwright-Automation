import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Check Financier Eligibility' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.locator('#equiReport').selectOption('2028579');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Generate Equifax report' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
});