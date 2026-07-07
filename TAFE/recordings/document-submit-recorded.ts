import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByText('Documents & Submit').click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('#oiedIncomeTaxChecked').check();
  await page.locator('#oiedTractorIncomeChecked').check();
  await page.locator('#oiedRentChecked').check();
  await page.locator('#oiedDairyIncomeChecked').check();
  await page.locator('#oiedAgriIncomeChecked').check();
  await page.locator('#oiedLivestockIncomeChecked').check();
  await page.locator('#oiedGrossIncomeChecked').check();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Add Document' }).click();
  await page.locator('#docs').getByRole('combobox').selectOption('10');
  await page.getByRole('button', { name: 'Choose File' }).click();
  await page.getByRole('button', { name: 'Choose File' }).setInputFiles('image (3).png');
  await page.getByRole('button').nth(2).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Send to Manager/Owner' }).click();
});