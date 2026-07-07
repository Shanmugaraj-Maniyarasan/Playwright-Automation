import { createBdd } from 'playwright-bdd';
import { KycDetailsPage } from '@pages/application-flow/kyc-details-page';
import { ExcelDataReader } from '@data-utils/excel-data-reader';
import type { KycDetailsRow } from '../../types/kyc-details-data';

const { When, Then } = createBdd();

let kycDetailsPage: KycDetailsPage;
const excelPath = 'test-data-excel/kyc-details-data.xlsx';

When('I complete KYC details for a new applicant', async ({ page }) => {
  ExcelDataReader.loadExcelFile(excelPath);
  const kycData = ExcelDataReader.getDataByKey('KycDetailsData', 'dataKey', 'kyc1') as KycDetailsRow;
  if (!kycData) {
    throw new Error('KycDetailsData kyc1 row is missing.');
  }

  kycDetailsPage = new KycDetailsPage(page);
  await kycDetailsPage.fillKycDetails(kycData);
});

Then('KYC details should be submitted successfully', async () => {
  // Submission confirmation is validated inside page method by checking Generate Lead Score visibility.
});
