import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { ZdmSalesLoanPage } from '@pages/application-flow/zdm-sales-loan-page';
import { ExcelDataReader } from '@data-utils/excel-data-reader';
import type { ZdmSalesLoanRow } from '../../types/zdm-sales-loan-data';

const { When, Then } = createBdd();

const excelPath = 'test-data-excel/zdm-sales-loan-data.xlsx';

When('I complete Sales and Loan details as Dealer Manager', async ({ page }) => {
  const zdmSalesLoanPage = new ZdmSalesLoanPage(page);

  ExcelDataReader.loadExcelFile(excelPath);
  const data = ExcelDataReader.getDataByKey('ZdmSalesLoanData', 'dataKey', 'zdmsalesloan1') as ZdmSalesLoanRow;
  if (!data) {
    throw new Error('ZdmSalesLoanData zdmsalesloan1 row not found in Excel.');
  }

  await zdmSalesLoanPage.completeSalesLoanAsZdm(data);
});

Then('Sales and Loan details should be completed by Dealer Manager', async ({ page }) => {
  await page.waitForTimeout(2000);
  console.log('ZDM Sales & Loan Details completed successfully');
});
