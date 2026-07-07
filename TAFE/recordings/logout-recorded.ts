import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('.logout').click();
});