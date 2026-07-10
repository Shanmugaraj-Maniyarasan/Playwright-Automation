import { createBdd } from 'playwright-bdd';
import { CreditUpdatesPage } from '../../pages/proposal-data-entry/credit-updates-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let creditUpdatesPage: CreditUpdatesPage;

const creditUpdatesExcelPath = 'test-data-excel/credit-updates-data.xlsx';

// Navigate to credit updates
When('I navigate to credit updates page', async ({ page }) => {
  creditUpdatesPage = new CreditUpdatesPage(page);
  await creditUpdatesPage.navigateToCreditUpdates();
});

// Add credit update
When('I add credit update', async ({ page }) => {
  ExcelDataReader.loadExcelFile(creditUpdatesExcelPath);
  const data = ExcelDataReader.getDataByKey('CreditUpdates', 'dataKey', 'credit1');
  if (!data) throw new Error('CreditUpdates not found for credit1');

  creditUpdatesPage = new CreditUpdatesPage(page);
  await creditUpdatesPage.addCreditUpdate(data);
});

// Verify credit update saved
Then('I should see credit update saved successfully', async ({ page }) => {
  creditUpdatesPage = new CreditUpdatesPage(page);
  await creditUpdatesPage.verifySuccessAlert();
});
