import { createBdd } from 'playwright-bdd';
import { ValueOfAccountMsmePage } from '../../pages/proposal-data-entry/value-of-account-msme-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let valueOfAccountMsmePage: ValueOfAccountMsmePage;

const valueOfAccountMsmeExcelPath = 'test-data-excel/value-of-account-msme-data.xlsx';

// Navigate to value of account MSME
When('I navigate to value of account MSME page', async ({ page }) => {
  valueOfAccountMsmePage = new ValueOfAccountMsmePage(page);
  await valueOfAccountMsmePage.navigateToValueOfAccountMsme();
});

// Fill value of account MSME details
When('I fill value of account MSME details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(valueOfAccountMsmeExcelPath);
  const data = ExcelDataReader.getDataByKey('ValueOfAccountMSME', 'dataKey', 'voa1');
  if (!data) throw new Error('ValueOfAccountMSME not found for voa1');

  valueOfAccountMsmePage = new ValueOfAccountMsmePage(page);
  await valueOfAccountMsmePage.clickEdit();
  await valueOfAccountMsmePage.fillValueOfAccountDetails(data);
  await valueOfAccountMsmePage.clickSave();
});

// Verify value of account MSME saved
Then('I should see value of account MSME saved successfully', async ({ page }) => {
  valueOfAccountMsmePage = new ValueOfAccountMsmePage(page);
  await valueOfAccountMsmePage.verifySuccessAlert();
});
