import { createBdd } from 'playwright-bdd';
import { FunderSelectionPage } from '@pages/application-flow/funder-selection-page';
import { ExcelDataReader } from '@data-utils/excel-data-reader';

const { When, Then } = createBdd();

When('I complete Funder Selection and In-Principle Offer', async ({ page }) => {
  const funderSelectionPage = new FunderSelectionPage(page);

  ExcelDataReader.loadExcelFile('test-data-excel/funder-selection-data.xlsx');
  const data = ExcelDataReader.getDataByKey('FunderSelection', 'dataKey', 'funderselection1');
  if (!data) {
    throw new Error('FunderSelection data not found for key funderselection1');
  }

  // Parse comma-separated funderIds string into array
  if (data.funderIds && typeof data.funderIds === 'string') {
    data.funderIds = data.funderIds.split(',').map((id: string) => id.trim());
  }

  // Parse comma-separated financiers string into array
  if (data.financiers && typeof data.financiers === 'string') {
    data.financiers = data.financiers.split(',').map((f: string) => f.trim());
  }

  await funderSelectionPage.completeFunderSelection(data);
});

Then('Funder Selection should be submitted to Financier', async ({ page }) => {
  const funderSelectionPage = new FunderSelectionPage(page);
  await funderSelectionPage.sendToFinancier();
  console.log('Funder Selection submitted to Financier');
});
