import { createBdd } from 'playwright-bdd';
import { PersonalCorporateGuaranteePage } from '../../pages/proposal-data-entry/personal-corporate-guarantee-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let personalCorporateGuaranteePage: PersonalCorporateGuaranteePage;

const personalCorporateGuaranteeExcelPath = 'test-data-excel/personal-corporate-guarantee-data.xlsx';

// Navigate to personal and corporate guarantee
When('I navigate to personal and corporate guarantee page', async ({ page }) => {
  personalCorporateGuaranteePage = new PersonalCorporateGuaranteePage(page);
  await personalCorporateGuaranteePage.navigateToPersonalCorporateGuarantee();
});

// Fill personal and corporate guarantee details
When('I fill personal and corporate guarantee details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(personalCorporateGuaranteeExcelPath);
  const data = ExcelDataReader.getDataByKey('PersonalCorporateGuarantee', 'dataKey', 'guarantee1');
  if (!data) throw new Error('PersonalCorporateGuarantee not found for guarantee1');

  personalCorporateGuaranteePage = new PersonalCorporateGuaranteePage(page);
  
  // Select customer if provided
  if (data.customerId) {
    await personalCorporateGuaranteePage.selectCustomer(String(data.customerId));
  }
  
  await personalCorporateGuaranteePage.clickEdit();
  await personalCorporateGuaranteePage.fillGuaranteeDetails(data, 0);
  await personalCorporateGuaranteePage.clickSave();
});

// Verify personal and corporate guarantee saved
Then('I should see personal and corporate guarantee saved successfully', async ({ page }) => {
  personalCorporateGuaranteePage = new PersonalCorporateGuaranteePage(page);
  await personalCorporateGuaranteePage.verifySuccessAlert();
});
