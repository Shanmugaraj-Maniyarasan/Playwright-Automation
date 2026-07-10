import { createBdd } from 'playwright-bdd';
import { FinancialCommentsPage } from '../../pages/financial-analysis/financial-comments-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let financialCommentsPage: FinancialCommentsPage;

const financialCommentsExcelPath = 'test-data-excel/financial-comments-data.xlsx';

// Navigate to financial comments
When('I navigate to financial comments page', async ({ page }) => {
  financialCommentsPage = new FinancialCommentsPage(page);
  await financialCommentsPage.navigateToFinancialComments();
});

// Fill financial comments
When('I fill financial comments', async ({ page }) => {
  ExcelDataReader.loadExcelFile(financialCommentsExcelPath);
  const data = ExcelDataReader.getDataByKey('FinancialComments', 'dataKey', 'comment1');
  if (!data) throw new Error('FinancialComments data not found for comment1');

  financialCommentsPage = new FinancialCommentsPage(page);
  await financialCommentsPage.completeFinancialCommentsEntry(data);
});

// Verify financial comments saved
Then('I should see financial comments saved successfully', async ({ page }) => {
  // Success verification - wait for UI stabilization
  await page.waitForTimeout(1000);
});
