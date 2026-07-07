import { createBdd } from 'playwright-bdd';
import { LoginPage } from '@pages/login/login-page';
import { ExcelDataReader } from '@data-utils/excel-data-reader';
import type { LoginConfigRow, LoginUserRow } from '../types/login-data';

const { Given, When, Then } = createBdd();

let loginPage: LoginPage;

const excelPath = 'test-data-excel/login-data.xlsx';

Given('Launch the application', async ({ page }) => {
  ExcelDataReader.loadExcelFile(excelPath);
  const config = ExcelDataReader.getDataByKey('LoginData', 'dataKey', 'config') as LoginConfigRow;
  if (!config?.url) {
    throw new Error('LoginData config row missing url value.');
  }

  loginPage = new LoginPage(page);
  await loginPage.launchUrl(config.url);
});

When('Login as a dealer sales person', async () => {
  const user1 = ExcelDataReader.getDataByKey('LoginData', 'dataKey', 'user1') as LoginUserRow;
  if (!user1?.userName || !user1?.passWord) {
    throw new Error('LoginData user1 row missing userName/passWord values.');
  }

  await loginPage.login(user1.userName, user1.passWord);
});

When('Login as a dealer manager', async () => {
  ExcelDataReader.loadExcelFile(excelPath);
  const user2 = ExcelDataReader.getDataByKey('LoginData', 'dataKey', 'user2') as LoginUserRow;
  if (!user2?.userName || !user2?.passWord) {
    throw new Error('LoginData user2 row missing userName/passWord values.');
  }

  await loginPage.login(user2.userName, user2.passWord);
});

Then('I logout from the application', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.logout();
});
