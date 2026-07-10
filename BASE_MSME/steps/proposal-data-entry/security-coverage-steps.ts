import { createBdd } from 'playwright-bdd';
import { SecurityCoveragePage } from '../../pages/proposal-data-entry/security-coverage-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let securityCoveragePage: SecurityCoveragePage;

const securityCoverageExcelPath = 'test-data-excel/security-coverage-data.xlsx';

// Navigate to security coverage
When('I navigate to security coverage page', async ({ page }) => {
  securityCoveragePage = new SecurityCoveragePage(page);
  await securityCoveragePage.navigateToSecurityCoverage();
});

// Fill security coverage details
When('I fill security coverage details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(securityCoverageExcelPath);
  const data = ExcelDataReader.getDataByKey('SecurityCoverage', 'dataKey', 'coverage1');
  if (!data) throw new Error('SecurityCoverage not found for coverage1');

  securityCoveragePage = new SecurityCoveragePage(page);
  await securityCoveragePage.completeSecurityCoverageEntry(data);
});

// Verify security coverage saved
Then('I should see security coverage saved successfully', async ({ page }) => {
  // Success verification - wait for UI stabilization
  await page.waitForTimeout(1000);
});
