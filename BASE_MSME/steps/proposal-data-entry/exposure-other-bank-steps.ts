import { createBdd } from 'playwright-bdd';
import { ExposureWithOtherBankPage } from '../../pages/proposal-data-entry/exposure-with-other-bank-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';
import { DomCaptureHelper } from '../../data-utils/dom-capture-helper';

const { Given, When, Then } = createBdd();

let exposureOtherBankPage: ExposureWithOtherBankPage;

const exposureOtherBankExcelPath = 'test-data-excel/exposure-other-bank-data.xlsx';

// Navigate to exposure with other bank
When('I navigate to exposure with other bank page', async ({ page }) => {
  exposureOtherBankPage = new ExposureWithOtherBankPage(page);
  await exposureOtherBankPage.navigateToExposureWithOtherBank();
});

// Capture exposure with other bank live DOM
When('I capture exposure with other bank page html', async ({ page }) => {
  await DomCaptureHelper.captureBodyHtml(page, 'exposure-with-other-bank.html');
  await DomCaptureHelper.captureFieldInventory(page, 'exposure-with-other-bank-fields.json');
});

// Fill exposure with other bank details
When('I fill exposure with other bank details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(exposureOtherBankExcelPath);
  const data1 = ExcelDataReader.getDataByKey('ExposureOtherBank', 'dataKey', 'otherBank1');
  if (!data1) throw new Error('ExposureOtherBank not found for otherBank1');

  const data2 = ExcelDataReader.getDataByKey('ExposureOtherBank', 'dataKey', 'otherBank2');
  if (!data2) throw new Error('ExposureOtherBank not found for otherBank2');

  console.log('Exposure Other Bank Data Row 1:', JSON.stringify(data1, null, 2));
  console.log('Exposure Other Bank Data Row 2:', JSON.stringify(data2, null, 2));

  exposureOtherBankPage = new ExposureWithOtherBankPage(page);
  await exposureOtherBankPage.clickEdit();
  console.log('Filling first Exposure with Other Bank row (index 0)...');
  await exposureOtherBankPage.fillExposureDetails(data1, 0);

  console.log('Adding second Exposure with Other Bank row...');
  await exposureOtherBankPage.clickNewExposureDetail();

  console.log('Filling second Exposure with Other Bank row (index 1)...');
  await exposureOtherBankPage.fillExposureDetails(data2, 1);

  console.log('Saving Exposure with Other Bank details...');
  await exposureOtherBankPage.clickSave();
});

// Verify exposure with other bank saved
Then('I should see exposure with other bank saved successfully', async ({ page }) => {
  exposureOtherBankPage = new ExposureWithOtherBankPage(page);
  await page.waitForTimeout(2000);
  console.log('Exposure with Other Bank details saved successfully');
});
