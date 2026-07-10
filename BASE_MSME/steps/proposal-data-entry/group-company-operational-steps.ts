import { createBdd } from 'playwright-bdd';
import { GroupCompanyOperationalPage } from '../../pages/proposal-data-entry/group-company-operational-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let groupCompanyOperationalPage: GroupCompanyOperationalPage;

const groupCompanyOperationalExcelPath = 'test-data-excel/group-company-operational-data.xlsx';

// Navigate to group company operational
When('I navigate to group company operational page', async ({ page }) => {
  groupCompanyOperationalPage = new GroupCompanyOperationalPage(page);
  await groupCompanyOperationalPage.navigateToGroupCompanyOperational();
});

// Fill group company operational details
When('I fill group company operational details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(groupCompanyOperationalExcelPath);
  const data = ExcelDataReader.getDataByKey('GroupCompanyOperational', 'dataKey', 'gco1');
  if (!data) throw new Error('GroupCompanyOperational not found for gco1');

  groupCompanyOperationalPage = new GroupCompanyOperationalPage(page);
  await groupCompanyOperationalPage.clickEdit();
  await groupCompanyOperationalPage.fillGroupCompanyDetails(data, 0);
  await groupCompanyOperationalPage.fillRemarks(data.remark, data.commentOtherBank);
  await groupCompanyOperationalPage.clickSave();
});

// Verify group company operational saved
Then('I should see group company operational saved successfully', async ({ page }) => {
  groupCompanyOperationalPage = new GroupCompanyOperationalPage(page);
  await groupCompanyOperationalPage.verifySuccessAlert();
});
