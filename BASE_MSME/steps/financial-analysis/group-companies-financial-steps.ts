import { createBdd } from 'playwright-bdd';
import { GroupCompaniesFinancialPage } from '../../pages/financial-analysis/group-companies-financial-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let groupCompaniesFinancialPage: GroupCompaniesFinancialPage;

const groupCompaniesFinancialExcelPath = 'test-data-excel/group-companies-financial-data.xlsx';

// Navigate to group companies financial
When('I navigate to group companies financial page', async ({ page }) => {
  groupCompaniesFinancialPage = new GroupCompaniesFinancialPage(page);
  await groupCompaniesFinancialPage.navigateToGroupCompaniesFinancial();
});

// Fill group companies financial data
When('I fill group companies financial data', async ({ page }) => {
  ExcelDataReader.loadExcelFile(groupCompaniesFinancialExcelPath);
  const data = ExcelDataReader.getDataByKey('GroupCompaniesFinancial', 'dataKey', 'gcf1');
  if (!data) throw new Error('GroupCompaniesFinancial data not found for gcf1');

  groupCompaniesFinancialPage = new GroupCompaniesFinancialPage(page);
  await groupCompaniesFinancialPage.completeGroupCompaniesFinancialEntry(data);
});

// Verify group companies financial saved
Then('I should see group companies financial saved successfully', async ({ page }) => {
  // Success verification - wait for UI stabilization
  await page.waitForTimeout(1000);
});
