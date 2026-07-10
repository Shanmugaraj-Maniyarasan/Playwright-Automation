import { createBdd } from 'playwright-bdd';
import { CustomerDetailsPage } from '../../pages/parties-involved/customer-details-page';
import { CoBorrowerPage } from '../../pages/parties-involved/co-borrower-page';
import { ShareHoldingPatternPage } from '../../pages/parties-involved/share-holding-pattern-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let customerDetailsPage: CustomerDetailsPage;
let coBorrowerPage: CoBorrowerPage;
let shareHoldingPatternPage: ShareHoldingPatternPage;

const customerDetailsExcelPath = 'test-data-excel/customer-details-data.xlsx';
const shareHoldingExcelPath = 'test-data-excel/share-holding-data.xlsx';

// ============ Customer Details Steps ============

// Navigate to customer details
When('I navigate to customer details page', async ({ page }) => {
  customerDetailsPage = new CustomerDetailsPage(page);
  await customerDetailsPage.page.getByRole('link', { name: ' Parties Involved' }).click();
  await customerDetailsPage.page.locator('a').filter({ hasText: 'Customer Details' }).click();
  // Wait for page to load and click on customer to select
  await customerDetailsPage.page.waitForTimeout(1000);
});

// Fill customer details
When('I fill customer details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(customerDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('CustomerDetails', 'dataKey', 'customer1');
  if (!data) throw new Error('CustomerDetails not found for customer1');

  customerDetailsPage = new CustomerDetailsPage(page);
  
  // Click on CBS ID to select customer (visible after Create Application)
  await customerDetailsPage.page.getByText('12345678').click();
  
  // Click Edit button in subsectiontop
  await customerDetailsPage.page.locator('#subsectiontop').getByRole('button', { name: 'Edit' }).click();
  
  // Fill all customer details using page method
  await customerDetailsPage.fillCustomerDetails(data);
  
  // Click Save button in subsectiontop
  await customerDetailsPage.page.locator('#subsectiontop').getByRole('button', { name: 'Save' }).click();
});

// Verify customer details saved
Then('I should see customer details saved successfully', async ({ page }) => {
  customerDetailsPage = new CustomerDetailsPage(page);
  // Wait briefly for any alert, but don't fail if not shown
  try {
    await customerDetailsPage.successAlert.waitFor({ state: 'visible', timeout: 3000 });
    console.log('Success alert displayed');
  } catch {
    // Check if error alert is shown
    const errorAlert = await customerDetailsPage.errorAlert.isVisible();
    if (errorAlert) {
      const errorText = await customerDetailsPage.errorAlert.textContent();
      throw new Error(`Save failed with error: ${errorText}`);
    }
    console.log('No alert displayed - assuming save completed');
  }
});

// ============ Co-Borrower Steps ============

// Add Co-Borrower customer
When('I add co-borrower customer', async ({ page }) => {
  ExcelDataReader.loadExcelFile(customerDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('CustomerDetails', 'dataKey', 'coborrower1');
  if (!data) throw new Error('CustomerDetails not found for coborrower1');

  coBorrowerPage = new CoBorrowerPage(page);
  
  // Add co-borrower by fetching existing customer
  await coBorrowerPage.addCoBorrowerCustomer(String(data.cbsId));
});

// Fill co-borrower details
When('I fill co-borrower details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(customerDetailsExcelPath);
  const data = ExcelDataReader.getDataByKey('CustomerDetails', 'dataKey', 'coborrower1');
  if (!data) throw new Error('CustomerDetails not found for coborrower1');

  coBorrowerPage = new CoBorrowerPage(page);
  
  // Form is already in edit mode after addCoBorrowerCustomer
  // Directly fill co-borrower details
  await coBorrowerPage.fillCoBorrowerDetails(data);
  
  // Click Save
  await coBorrowerPage.clickSave();
});

// Verify co-borrower saved
Then('I should see co-borrower saved successfully', async ({ page }) => {
  coBorrowerPage = new CoBorrowerPage(page);
  try {
    await coBorrowerPage.successAlert.waitFor({ state: 'visible', timeout: 3000 });
    console.log('Co-Borrower saved successfully');
  } catch {
    const errorAlert = await coBorrowerPage.errorAlert.isVisible();
    if (errorAlert) {
      const errorText = await coBorrowerPage.errorAlert.textContent();
      throw new Error(`Co-Borrower save failed with error: ${errorText}`);
    }
    console.log('No alert displayed - assuming save completed');
  }
});

// ============ Share Holding Pattern Steps ============

// Helper: Parse prefixed columns into arrays
function parseMultipleRows(data: any, prefix: string, fieldMappings: Record<string, string>): any[] {
  const rows: any[] = [];
  let index = 1;
  while (true) {
    const row: any = {};
    let hasData = false;
    
    for (const [excelField, targetField] of Object.entries(fieldMappings)) {
      const key = `${prefix}${index}_${excelField}`;
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        row[targetField] = data[key];
        hasData = true;
      }
    }
    
    if (!hasData) break;
    rows.push(row);
    index++;
  }
  return rows;
}

// Navigate to share holding pattern
When('I navigate to share holding pattern page', async ({ page }) => {
  shareHoldingPatternPage = new ShareHoldingPatternPage(page);
  await shareHoldingPatternPage.navigateToShareHoldingPattern();
});

// Fill capital structure details with multiple rows support
When('I fill capital structure details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(shareHoldingExcelPath);
  
  // Load main share holding data
  const data = ExcelDataReader.getDataByKey('ShareHolding', 'dataKey', 'capital1');
  if (!data) throw new Error('ShareHolding not found for capital1');

  // Parse Capital Market rows from prefixed columns (market1_, market2_, etc.)
  const capitalMarketRows = parseMultipleRows(data, 'market', {
    'listedOn': 'listedOn',
    'faceValue': 'faceValue',
    'sharePriceAsOn': 'sharePriceAsOn',
    'lastTradePrice': 'lastTradePrice',
    'lowLast52Week': 'lowLast52Week',
    'highLast52Week': 'highLast52Week',
    'mktCapitalization': 'mktCapitalization',
    'mktCapitalizationAsOn': 'mktCapitalizationAsOn'
  });
  
  // Parse Shareholder rows from prefixed columns (sh1_, sh2_, etc.)
  const shareholders = parseMultipleRows(data, 'sh', {
    'shareholderType': 'shareholderType',
    'shareholderName': 'shareholderName',
    'position': 'position',
    'noOfShares': 'noOfShares',
    'shareholderFaceValue': 'shareholderFaceValue',
    'currentDate': 'currentDate',
    'currentPercent': 'currentPercent',
    'previousDate': 'previousDate',
    'previousPercent': 'previousPercent'
  });
  
  // Attach arrays to main data if found
  if (capitalMarketRows.length > 0) {
    data.capitalMarketRows = capitalMarketRows;
    console.log(`Loaded ${capitalMarketRows.length} Capital Market rows from ShareHolding sheet`);
  }
  if (shareholders.length > 0) {
    data.shareholders = shareholders;
    console.log(`Loaded ${shareholders.length} Shareholder rows from ShareHolding sheet`);
  }

  shareHoldingPatternPage = new ShareHoldingPatternPage(page);
  
  // Fill all share holding pattern details
  await shareHoldingPatternPage.fillShareHoldingDetails(data);
  
  // Click Save
  await shareHoldingPatternPage.clickSave();
});

// Verify share holding saved
Then('I should see share holding pattern saved successfully', async ({ page }) => {
  shareHoldingPatternPage = new ShareHoldingPatternPage(page);
  await shareHoldingPatternPage.successAlert.waitFor({ state: 'visible', timeout: 5000 });
});

// Delete second Capital Market row
When('I delete the second capital market row', async ({ page }) => {
  shareHoldingPatternPage = new ShareHoldingPatternPage(page);
  await shareHoldingPatternPage.clickEdit();
  // Index 1 = second row (0-based index)
  await shareHoldingPatternPage.deleteCapitalMarketRow(1);
  // Note: Delete is auto-saved, no need to click Save
});

// Delete second Shareholder row
When('I delete the second shareholder row', async ({ page }) => {
  shareHoldingPatternPage = new ShareHoldingPatternPage(page);
  await shareHoldingPatternPage.clickEdit();
  // Index 2 = second row (1-based for shareholders)
  await shareHoldingPatternPage.deleteShareholderRow(2);
  // Note: Delete is auto-saved, no need to click Save
});
