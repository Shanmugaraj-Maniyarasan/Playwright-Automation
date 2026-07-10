import { createBdd } from 'playwright-bdd';
import { ProposedFacilityDetailsPage } from '../../pages/proposal-data-entry/proposed-facility-details-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';
import { DomCaptureHelper } from '../../data-utils/dom-capture-helper';

const { Given, When, Then } = createBdd();

let proposedFacilityPage: ProposedFacilityDetailsPage;

const proposedFacilityExcelPath = 'test-data-excel/proposed-facility-data.xlsx';

// Navigate to proposed facility details
When('I navigate to proposed facility details page', async ({ page }) => {
  proposedFacilityPage = new ProposedFacilityDetailsPage(page);
  await proposedFacilityPage.navigateToProposedFacilityDetails();
});

// Capture proposed facility live DOM
When('I capture proposed facility details page html', async ({ page }) => {
  await DomCaptureHelper.captureBodyHtml(page, 'proposed-facility-details.html');
  await DomCaptureHelper.captureFieldInventory(page, 'proposed-facility-details-fields.json');
});

// Fill proposed facility details
When('I fill proposed facility details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(proposedFacilityExcelPath);
  const data1 = ExcelDataReader.getDataByKey('ProposedFacility', 'dataKey', 'facility1');
  if (!data1) throw new Error('ProposedFacility not found for facility1');

  const data2 = ExcelDataReader.getDataByKey('ProposedFacility', 'dataKey', 'facility2');
  if (!data2) throw new Error('ProposedFacility not found for facility2');

  console.log('Proposed Facility Data Row 1:', JSON.stringify(data1, null, 2));
  console.log('Proposed Facility Data Row 2:', JSON.stringify(data2, null, 2));

  proposedFacilityPage = new ProposedFacilityDetailsPage(page);
  await proposedFacilityPage.clickEdit();
  console.log('Filling first Proposed Facility row (index 0)...');
  await proposedFacilityPage.fillProposedFacilityDetails(data1, 0);

  console.log('Filling second Proposed Facility row (index 1)...');
  await proposedFacilityPage.fillProposedFacilityDetails(data2, 1);

  await proposedFacilityPage.clickSave();
});

// Verify proposed facility details saved
Then('I should see proposed facility details saved successfully', async ({ page }) => {
  proposedFacilityPage = new ProposedFacilityDetailsPage(page);
  await proposedFacilityPage.verifySuccessAlert();
});
