import { createBdd } from 'playwright-bdd';
import { ExposureNormsPage } from '../../pages/proposal-data-entry/exposure-norms-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let exposureNormsPage: ExposureNormsPage;

const exposureNormsExcelPath = 'test-data-excel/exposure-norms-data.xlsx';

// Navigate to exposure norms
When('I navigate to exposure norms page', async ({ page }) => {
  exposureNormsPage = new ExposureNormsPage(page);
  await exposureNormsPage.navigateToExposureNorms();
});

// Fill exposure norms details
When('I fill exposure norms details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(exposureNormsExcelPath);
  const data = ExcelDataReader.getDataByKey('ExposureNorms', 'dataKey', 'norms1');
  if (!data) throw new Error('ExposureNorms not found for norms1');

  exposureNormsPage = new ExposureNormsPage(page);
  await exposureNormsPage.clickEdit();
  await exposureNormsPage.fillExposureNormsDetails(data);
  await exposureNormsPage.fillClassificationData(data);
  await exposureNormsPage.clickSave();
});

// Fetch exposure value
When('I fetch exposure value', async ({ page }) => {
  exposureNormsPage = new ExposureNormsPage(page);
  await exposureNormsPage.clickFetchExposureValue();
});

// Verify exposure norms saved
Then('I should see exposure norms saved successfully', async ({ page }) => {
  exposureNormsPage = new ExposureNormsPage(page);
  await exposureNormsPage.verifySuccessAlert();
});
