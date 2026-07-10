import { createBdd } from 'playwright-bdd';
import { BusinessUpdatesPage } from '../../pages/proposal-data-entry/business-updates-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let businessUpdatesPage: BusinessUpdatesPage;

const businessUpdatesExcelPath = 'test-data-excel/business-updates-data.xlsx';

// Navigate to business updates
When('I navigate to business updates page', async ({ page }) => {
  businessUpdatesPage = new BusinessUpdatesPage(page);
  await businessUpdatesPage.navigateToBusinessUpdates();
});

// Add business update
When('I add business update', async ({ page }) => {
  ExcelDataReader.loadExcelFile(businessUpdatesExcelPath);
  const data = ExcelDataReader.getDataByKey('BusinessUpdates', 'dataKey', 'business1');
  if (!data) throw new Error('BusinessUpdates not found for business1');

  businessUpdatesPage = new BusinessUpdatesPage(page);
  await businessUpdatesPage.addBusinessUpdate(data);
});

// Verify business update saved
Then('I should see business update saved successfully', async ({ page }) => {
  businessUpdatesPage = new BusinessUpdatesPage(page);
  await businessUpdatesPage.verifySuccessAlert();
});
