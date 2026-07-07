import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://uatunnati.tafe.com/lendperfect/#/signin');
  await page.getByRole('link', { name: 'Open Open leads from Zoho' }).click();
  await page.getByLabel('309Open leads from Zoho').getByText('Lead Prioritization').click();
  await page.getByRole('textbox', { name: 'Prospect Id' }).click();
  await page.getByRole('textbox', { name: 'Prospect Id' }).fill('4564747457');
  await page.getByRole('textbox', { name: 'Customer name' }).click();
  await page.getByRole('button', { name: 'Search' }).click();
});