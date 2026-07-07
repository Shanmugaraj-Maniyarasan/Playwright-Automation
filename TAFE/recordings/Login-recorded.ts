import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://uatunnati.tafe.com/lendperfect/#/signin');
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('ZDSP');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('laps@1234');
  await page.getByRole('button', { name: 'Login' }).click();
});