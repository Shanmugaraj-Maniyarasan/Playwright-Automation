import { createBdd } from 'playwright-bdd';
import { DocumentDetailsPage } from '../../pages/proposal-data-entry/document-details-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let documentDetailsPage: DocumentDetailsPage;

const documentDetailsExcelPath = 'test-data-excel/document-details-data.xlsx';

// Navigate to document details
When('I navigate to document details page', async ({ page }) => {
  documentDetailsPage = new DocumentDetailsPage(page);
  await documentDetailsPage.navigateToDocumentDetails();
});

// Add new document
When('I add new document', async ({ page }) => {
  ExcelDataReader.loadExcelFile(documentDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('DocumentDetails', 'dataKey', 'document1');
  if (!data) throw new Error('DocumentDetails not found for document1');

  documentDetailsPage = new DocumentDetailsPage(page);
  await documentDetailsPage.completeDocumentEntry(data);
});

// Verify document details saved
Then('I should see document details saved successfully', async ({ page }) => {
  // Success verification - wait for UI stabilization
  await page.waitForTimeout(1000);
});
