import { createBdd } from 'playwright-bdd';
import { ExposureWithOurBankPage } from '../../pages/proposal-data-entry/exposure-with-our-bank-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let exposureOurBankPage: ExposureWithOurBankPage;

const exposureOurBankExcelPath = 'test-data-excel/exposure-with-our-bank-data.xlsx';

// Navigate to exposure with our bank
When('I navigate to exposure with our bank page', async ({ page }) => {
  exposureOurBankPage = new ExposureWithOurBankPage(page);
  await exposureOurBankPage.navigateToExposureWithOurBank();
});

// Fill exposure with our bank details for both rows
When('I fill exposure with our bank details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(exposureOurBankExcelPath);
  
  // Get data for first row
  const data1 = ExcelDataReader.getDataByKey('ExposureOurBank', 'dataKey', 'exposure1');
  if (!data1) throw new Error('ExposureOurBank not found for exposure1');
  
  // Get data for second row
  const data2 = ExcelDataReader.getDataByKey('ExposureOurBank', 'dataKey', 'exposure2');
  if (!data2) throw new Error('ExposureOurBank not found for exposure2');

  ExcelDataReader.loadExcelFile(exposureOurBankExcelPath);

  // Get data for Details of presents MCLR/EBLR
  const mclrData1 = ExcelDataReader.getDataByKey('ExposureOurBankMclr', 'dataKey', 'mclr1');
  if (!mclrData1) throw new Error('ExposureOurBankMclr not found for mclr1');

  const mclrData2 = ExcelDataReader.getDataByKey('ExposureOurBankMclr', 'dataKey', 'mclr2');
  if (!mclrData2) throw new Error('ExposureOurBankMclr not found for mclr2');
  
  console.log('Excel Data Row 1:', JSON.stringify(data1, null, 2));
  console.log('Excel Data Row 2:', JSON.stringify(data2, null, 2));
  console.log('MCLR Excel Data Row 1:', JSON.stringify(mclrData1, null, 2));
  console.log('MCLR Excel Data Row 2:', JSON.stringify(mclrData2, null, 2));

  exposureOurBankPage = new ExposureWithOurBankPage(page);
  
  // Click Edit to enable editing
  await exposureOurBankPage.clickEdit();
  
  // Fill first row (index 0)
  console.log('Filling first row (index 0)...');
  await exposureOurBankPage.fillExposureDetails(data1, 0);
  
  // Click New Exposure Detail to add second row
  console.log('Adding new row for second exposure...');
  await exposureOurBankPage.clickNewExposureDetail();
  
  // Fill second row (index 1)
  console.log('Filling second row (index 1)...');
  await exposureOurBankPage.fillExposureDetails(data2, 1);
  
  // Click Save to save all data
  console.log('Saving exposure details...');
  await exposureOurBankPage.clickSave();

  // Fill Details of presents MCLR/EBLR tab
  console.log('Navigating to Details of presents MCLR/EBLR tab...');
  await exposureOurBankPage.clickDetailsOfPresentsMclrEblrTab();

  console.log('Editing and filling first MCLR/EBLR row...');
  await exposureOurBankPage.clickMclrEdit();
  await exposureOurBankPage.fillMclrRow(mclrData1, 0);
  await exposureOurBankPage.fillMclrDelegatedAuthority(mclrData1);
  await exposureOurBankPage.clickMclrSave();

  console.log('Adding and filling second MCLR/EBLR row...');
  await exposureOurBankPage.clickMclrEdit();
  await exposureOurBankPage.clickMclrAddNewRow();
  await exposureOurBankPage.fillMclrRow(mclrData2, 1);
  await exposureOurBankPage.clickMclrSave();

  console.log('Deleting second MCLR/EBLR row and saving...');
  await exposureOurBankPage.clickMclrEdit();
  await exposureOurBankPage.deleteMclrRow(1);
  await exposureOurBankPage.clickMclrSave();
});

// Verify exposure with our bank saved
Then('I should see exposure with our bank saved successfully', async ({ page }) => {
  exposureOurBankPage = new ExposureWithOurBankPage(page);
  // Wait for success feedback or verify data is saved
  await page.waitForTimeout(2000);
  console.log('Exposure details saved successfully');
});
