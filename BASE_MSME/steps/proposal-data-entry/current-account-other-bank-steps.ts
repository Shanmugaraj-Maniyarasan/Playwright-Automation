import { createBdd } from 'playwright-bdd';
import { CurrentAccountOtherBankPage } from '../../pages/proposal-data-entry/current-account-other-bank-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let currentAccountOtherBankPage: CurrentAccountOtherBankPage;

const currentAccountOtherBankExcelPath = 'test-data-excel/current-account-other-bank-data.xlsx';

// Navigate to current account with other bank
When('I navigate to current account with other bank page', async ({ page }) => {
  currentAccountOtherBankPage = new CurrentAccountOtherBankPage(page);
  await currentAccountOtherBankPage.navigateToCurrentAccountOtherBank();
});

// Fill current account with other bank details
When('I fill current account with other bank details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(currentAccountOtherBankExcelPath);
  const data = ExcelDataReader.getDataByKey('CurrentAccountOtherBank', 'dataKey', 'caob1');
  if (!data) throw new Error('CurrentAccountOtherBank not found for caob1');

  currentAccountOtherBankPage = new CurrentAccountOtherBankPage(page);
  await currentAccountOtherBankPage.clickEdit();
  await currentAccountOtherBankPage.selectYes();
  await currentAccountOtherBankPage.fillFirstRowDetails(data);
  await currentAccountOtherBankPage.clickSave();
});

// Verify current account with other bank saved
Then('I should see current account with other bank saved successfully', async ({ page }) => {
  currentAccountOtherBankPage = new CurrentAccountOtherBankPage(page);
  await currentAccountOtherBankPage.verifySuccessAlert();
});
