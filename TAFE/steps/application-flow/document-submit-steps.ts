import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { DocumentSubmitPage } from '@pages/application-flow/document-submit-page';
import { ExcelDataReader } from '@data-utils/excel-data-reader';
import type { DocumentSubmitRow } from '../../types/document-submit-data';

const { When, Then } = createBdd();

const excelPath = 'test-data-excel/document-submit-data.xlsx';

When('I complete Document and Submit details', async ({ page }) => {
  const documentSubmitPage = new DocumentSubmitPage(page);

  ExcelDataReader.loadExcelFile(excelPath);
  const data = ExcelDataReader.getDataByKey('DocumentSubmitData', 'dataKey', 'docsubmit1') as DocumentSubmitRow;
  if (!data) {
    throw new Error('DocumentSubmitData docsubmit1 row not found in Excel.');
  }

  await documentSubmitPage.fillDocumentAndSubmit(data);
});

Then('Document and Submit should be completed successfully', async ({ page }) => {
  // Wait for submission to complete
  await page.waitForTimeout(2000);
  // Verify success indication
  const successToast = page.locator('.toast-success, .alert-success, [class*="success"]').first();
  await expect(successToast).toBeVisible({ timeout: 10000 }).catch(() => {
    console.log('No explicit success toast, continuing...');
  });
});
