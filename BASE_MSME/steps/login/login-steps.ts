import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../../pages/login/login-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';
import type { LoginConfigRow, LoginUserRow } from '../../types/login-data';

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

// Login as valid user
When('Login as valid user', async ({ page }) => {
  const user = ExcelDataReader.getDataByKey('LoginData', 'dataKey', 'user1') as LoginUserRow;
  if (!user) throw new Error('LoginData row not found for key: user1');
  
  loginPage = new LoginPage(page);
  await loginPage.login(user.userName || '', user.passWord || '');
});

// Login with username only (negative)
When('Login with username only', async ({ page }) => {
  const user = ExcelDataReader.getDataByKey('LoginData', 'dataKey', 'usernameOnly') as LoginUserRow;
  if (!user) throw new Error('LoginData row not found for key: usernameOnly');
  
  loginPage = new LoginPage(page);
  await loginPage.login(user.userName || '', user.passWord || '');
});

// Login with password only (negative)
When('Login with password only', async ({ page }) => {
  const user = ExcelDataReader.getDataByKey('LoginData', 'dataKey', 'passwordOnly') as LoginUserRow;
  if (!user) throw new Error('LoginData row not found for key: passwordOnly');
  
  loginPage = new LoginPage(page);
  await loginPage.login(user.userName || '', user.passWord || '');
});

// Login with invalid credentials (negative)
When('Login with invalid credentials', async ({ page }) => {
  const user = ExcelDataReader.getDataByKey('LoginData', 'dataKey', 'invalidUser') as LoginUserRow;
  if (!user) throw new Error('LoginData row not found for key: invalidUser');
  
  loginPage = new LoginPage(page);
  await loginPage.login(user.userName || '', user.passWord || '');
});

// Negative scenario - Login with empty credentials
When('Login with empty credentials', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.loginWithEmptyCredentials();
});

// Verify mandatory field alert is displayed
Then('I should see mandatory field alert', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.verifyMandatoryFieldAlert();
});

// Verify invalid credentials alert is displayed
Then('I should see invalid credentials alert', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.verifyInvalidCredentialsAlert();
});

// Click here to navigate after successful login
When('I click here to navigate', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.clickHereToNavigate();
});

Then('I logout from the application', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.logout();
});
