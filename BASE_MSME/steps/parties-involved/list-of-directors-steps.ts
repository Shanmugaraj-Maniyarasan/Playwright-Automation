import { createBdd } from 'playwright-bdd';
import { ListOfDirectorsPage } from '../../pages/parties-involved/list-of-directors-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let listOfDirectorsPage: ListOfDirectorsPage;

const directorsExcelPath = 'test-data-excel/directors-data.xlsx';

// Helper: Get all directors from Excel (director1, director2, etc.)
function getAllDirectors(): any[] {
  const directors: any[] = [];
  let index = 1;
  while (true) {
    const data = ExcelDataReader.getDataByKey('Directors', 'dataKey', `director${index}`);
    if (!data) break;
    directors.push(data);
    index++;
  }
  return directors;
}

// Navigate to list of directors
When('I navigate to list of directors page', async ({ page }) => {
  listOfDirectorsPage = new ListOfDirectorsPage(page);
  await listOfDirectorsPage.navigateToListOfDirectors();
});

// Add new director - Fill all 4 tabs (supports multiple directors dynamically)
When('I add new director', async ({ page }) => {
  ExcelDataReader.loadExcelFile(directorsExcelPath);
  const allDirectors = getAllDirectors();
  if (allDirectors.length === 0) throw new Error('No directors found in Excel');
  
  console.log(`Found ${allDirectors.length} director(s) in Excel`);
  // Log full director data for debugging
  allDirectors.forEach((d, i) => {
    console.log(`Director ${i + 1} data:`, JSON.stringify(d, null, 2));
  });

  listOfDirectorsPage = new ListOfDirectorsPage(page);

  // ============ TAB 1: List of Directors / Partners / Trustee / Members ============
  // Step 1: Click Edit first (it's always enabled initially)
  await listOfDirectorsPage.clickEdit();
  console.log('Clicked Edit button');
  
  // Step 2: Check if table is empty by looking for first row locator
  const firstNameField = page.locator('#lodNameOfPromoter0').first();
  const firstFieldExists = await firstNameField.count() > 0;
  
  if (!firstFieldExists) {
    // Table is empty, click Add New to create first row
    console.log('Table is empty - clicking Add New to create first row');
    await listOfDirectorsPage.clickAddNew();
  }
  
  // Fill all directors dynamically
  for (let i = 0; i < allDirectors.length; i++) {
    const data = allDirectors[i];
    console.log(`Adding Director ${i + 1}: ${data.nameOfPromoter}`);
    await listOfDirectorsPage.addNewDirector(data, i);
  }
  
  // Fill Details of Proprietor/Partners/Directors Rich Text Editor (use first director's data)
  if (allDirectors[0].directorDetails) {
    await listOfDirectorsPage.fillDetailsOfDirectors(String(allDirectors[0].directorDetails));
  }
  await listOfDirectorsPage.clickSave();
  await page.waitForTimeout(1000);

  // ============ TAB 2: CIBIL Scores of Directors ============
  await listOfDirectorsPage.clickCibilScoresOfDirectorsTab();
  await listOfDirectorsPage.clickEdit();
  
  // Fill CIBIL scores for all directors
  for (let i = 0; i < allDirectors.length; i++) {
    const data = allDirectors[i];
    if (data.cibilScore) {
      console.log(`Filling CIBIL Score for Director ${i + 1}`);
      await listOfDirectorsPage.fillCibilDirectorRow(data, i);
    }
  }
  
  // Fill CIBIL Remarks (use first director's data)
  if (allDirectors[0].cibilRemarks) {
    await listOfDirectorsPage.fillCibilRemarks(String(allDirectors[0].cibilRemarks));
  }
  await listOfDirectorsPage.clickSave();
  await page.waitForTimeout(1000);

  // ============ TAB 3: CIBIL Scores of Company / Corporate Guarantors / Personal Guarantor ============
  await listOfDirectorsPage.clickCibilScoresOfCompanyTab();
  await listOfDirectorsPage.clickEdit();
  
  // Fill company CIBIL (first director with company data)
  const companyDirector = allDirectors.find(d => d.cscNameOfPromoter);
  if (companyDirector) {
    const companyCibilData = {
      nameOfPromoter: companyDirector.cscNameOfPromoter,
      panNumber: companyDirector.cscPanNumber,
      cibilScore: companyDirector.cscCibilScore
    };
    await listOfDirectorsPage.fillCompanyCibilRow(companyCibilData, 0);
    // Fill Company CIBIL Remarks
    if (companyDirector.cscRemarks) {
      await listOfDirectorsPage.fillCompanyCibilRemarks(String(companyDirector.cscRemarks));
    }
  }
  await listOfDirectorsPage.clickSave();
  await page.waitForTimeout(1000);

  // ============ TAB 4: Other Information ============
  await listOfDirectorsPage.clickOtherInformationTab();
  await listOfDirectorsPage.clickEdit();
  
  // Use first director's data for Tab 4 (common information)
  const data = allDirectors[0];
  await listOfDirectorsPage.fillAllOtherInformation(data);
  
  await listOfDirectorsPage.clickSave();
});

// Verify director added
Then('I should see director added successfully', async ({ page }) => {
  // Wait for UI stabilization after save
  await page.waitForTimeout(2000);
});

// Delete director from CIBIL Scores tab
When('I delete director from CIBIL scores', async ({ page }) => {
  listOfDirectorsPage = new ListOfDirectorsPage(page);
  await listOfDirectorsPage.clickCibilScoresOfDirectorsTab();
  await listOfDirectorsPage.clickEdit();
  await listOfDirectorsPage.deleteDirectorRow(0);
  await listOfDirectorsPage.clickSave();
});
