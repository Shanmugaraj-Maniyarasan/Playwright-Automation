import { createBdd } from 'playwright-bdd';
import { ConsortiumShareHoldingPage } from '../../pages/proposal-data-entry/consortium-share-holding-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let consortiumShareHoldingPage: ConsortiumShareHoldingPage;

const consortiumShareHoldingExcelPath = 'test-data-excel/consortium-share-holding-data.xlsx';

// Navigate to consortium and share holding pattern
When('I navigate to consortium share holding page', async ({ page }) => {
  consortiumShareHoldingPage = new ConsortiumShareHoldingPage(page);
  await consortiumShareHoldingPage.navigateToConsortiumShareHolding();
});

// Fill consortium term loan details
When('I fill consortium term loan details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(consortiumShareHoldingExcelPath);
  const data1 = ExcelDataReader.getDataByKey('ConsortiumTermLoan', 'dataKey', 'termLoan1');
  const data2 = ExcelDataReader.getDataByKey('ConsortiumTermLoan', 'dataKey', 'termLoan2');
  const data3 = ExcelDataReader.getDataByKey('ConsortiumTermLoan', 'dataKey', 'termLoan3');
  
  const termLoanData = [data1, data2, data3].filter(d => d !== null);
  if (termLoanData.length === 0) throw new Error('ConsortiumTermLoan data not found');

  consortiumShareHoldingPage = new ConsortiumShareHoldingPage(page);
  await consortiumShareHoldingPage.addTermLoanRows(termLoanData);
});

// Fill consortium working capital details
When('I fill consortium working capital details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(consortiumShareHoldingExcelPath);
  const data = ExcelDataReader.getDataByKey('ConsortiumWorkingCapital', 'dataKey', 'wc1');
  if (!data) throw new Error('ConsortiumWorkingCapital not found for wc1');

  consortiumShareHoldingPage = new ConsortiumShareHoldingPage(page);
  await consortiumShareHoldingPage.clickWorkingCapitalAddNew();
  await consortiumShareHoldingPage.addWorkingCapitalEntry(data, 0);
});

// Verify consortium share holding saved
Then('I should see consortium share holding saved successfully', async ({ page }) => {
  consortiumShareHoldingPage = new ConsortiumShareHoldingPage(page);
  await consortiumShareHoldingPage.verifySuccessAlert();
});
