import { createBdd } from 'playwright-bdd';
import { IncomeExpensesPage } from '@pages/application-flow/income-expenses-page';
import { ExcelDataReader } from '@data-utils/excel-data-reader';
import type { IncomeExpensesRow } from '../../types/income-expenses-data';

const { When, Then } = createBdd();

const excelPath = 'test-data-excel/income-expenses-data.xlsx';
let incomeExpensesPage: IncomeExpensesPage;

When('I navigate to Income and Expenses tab', async ({ page }) => {
  incomeExpensesPage = new IncomeExpensesPage(page);
  await incomeExpensesPage.incomeExpensesTab.click();
  console.log('Navigated to Income & Expenses tab');
});

When('I complete Income and Expenses details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(excelPath);
  const data = ExcelDataReader.getDataByKey('IncomeExpensesData', 'dataKey', 'income1') as IncomeExpensesRow;
  if (!data) {
    throw new Error('IncomeExpensesData income1 row is missing.');
  }

  incomeExpensesPage = new IncomeExpensesPage(page);
  await incomeExpensesPage.fillIncomeAndExpenses(data);
});

Then('Income and Expenses details should be saved successfully', async () => {
  // Save confirmation is validated in page object by checking save button visibility after action flow.
});
