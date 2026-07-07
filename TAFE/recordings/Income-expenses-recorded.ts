import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByText('Income & Expenses').click();
  await page.getByText('Owned').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('2');
  await page.getByText('Free Land').click();
  await page.getByText('Irrigated ?').click();
  await page.locator('.existingSearch').click();
  await page.locator('#cropCheck6').check();
  await page.locator('#cropCheck7').check();
  await page.locator('#cropModel').getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('#incomeSlideId').click();
  await page.locator('#fotherIncomesBasicid input[name="oiedGrossIncome1"]').click();
  await page.locator('#fotherIncomesBasicid input[name="oiedGrossIncome1"]').fill('600000');
  await page.locator('#fotherIncomesBasicid input[name="oiedEmiRepay1"]').click();
  await page.locator('#fotherIncomesBasicid input[name="oiedEmiRepay1"]').fill('1000');
  await page.locator('#oiedBankCodeFldB > .existingSearch > .landseachicon > .fa').click();
  await page.getByRole('cell', { name: 'STATE BANK OF INDIA' }).click();
  await page.locator('#oiedExistingBankDeskB > .existingSearch > .landseachicon > .fa').click();
  await page.locator('#bank').getByRole('textbox').click();
  await page.locator('#bank').getByRole('textbox').fill('not applicable');
  await page.locator('#bnkCheck0').check();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
});