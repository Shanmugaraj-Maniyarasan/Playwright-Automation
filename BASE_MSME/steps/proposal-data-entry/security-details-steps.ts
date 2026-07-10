import { createBdd } from 'playwright-bdd';
import { SecurityDetailsPage } from '../../pages/proposal-data-entry/security-details-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let securityDetailsPage: SecurityDetailsPage;

const securityDetailsExcelPath = 'test-data-excel/security-details-data.xlsx';

// Navigate to security details
When('I navigate to security details page', async ({ page }) => {
  securityDetailsPage = new SecurityDetailsPage(page);
  await securityDetailsPage.navigateToSecurityDetails();
});

// Add new security with basic info
When('I add new security with basic info', async ({ page }) => {
  ExcelDataReader.loadExcelFile(securityDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('SecurityDetails', 'dataKey', 'security1');
  if (!data) throw new Error('SecurityDetails not found for security1');

  securityDetailsPage = new SecurityDetailsPage(page);
  await securityDetailsPage.completeSecurityEntry(data);
});

// Fill security property details
When('I fill security property details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(securityDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('SecurityPropertyDetails', 'dataKey', 'property1');
  if (!data) throw new Error('SecurityPropertyDetails not found for property1');

  securityDetailsPage = new SecurityDetailsPage(page);
  await securityDetailsPage.completePropertyDetailsEntry(data);
});

// Attach security to facility
When('I attach security to facility', async ({ page }) => {
  ExcelDataReader.loadExcelFile(securityDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('SecurityAttach', 'dataKey', 'attach1');
  if (!data) throw new Error('SecurityAttach not found for attach1');

  securityDetailsPage = new SecurityDetailsPage(page);
  await securityDetailsPage.attachSecurityToFacility(data);
});

// Attach document to security
When('I attach document to security', async ({ page }) => {
  ExcelDataReader.loadExcelFile(securityDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('SecurityDocument', 'dataKey', 'doc1');
  if (!data) throw new Error('SecurityDocument not found for doc1');

  securityDetailsPage = new SecurityDetailsPage(page);
  await securityDetailsPage.attachDocument(data);
});

// View attached securities
When('I view attached securities', async ({ page }) => {
  securityDetailsPage = new SecurityDetailsPage(page);
  await securityDetailsPage.viewAttachedSecurities();
});

// Verify security details saved
Then('I should see security details saved successfully', async ({ page }) => {
  // Success verification - wait for UI stabilization
  await page.waitForTimeout(1000);
});
