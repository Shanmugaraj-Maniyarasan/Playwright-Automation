import { createBdd } from 'playwright-bdd';
import { ProposalCreationPage } from '../../pages/proposal-creation/proposal-creation-page';
import { ExcelDataReader } from '../../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

let proposalPage: ProposalCreationPage;

const proposalCreationExcelPath = 'test-data-excel/proposal-creation-data.xlsx';

// Navigate to proposal creation page
When('I navigate to proposal creation page', async ({ page }) => {
  proposalPage = new ProposalCreationPage(page);
  await proposalPage.navigateToProposalCreation();
});

// Add existing customer from CBS
When('I add existing customer from CBS', async ({ page }) => {
  ExcelDataReader.loadExcelFile(proposalCreationExcelPath);
  const customerData = ExcelDataReader.getDataByKey('CustomerData', 'dataKey', 'validCustomer');
  if (!customerData?.cbsId) {
    throw new Error('CustomerData not found for validCustomer');
  }

  proposalPage = new ProposalCreationPage(page);
  await proposalPage.addExistingCustomer(customerData.cbsId);
});

// Fill lead details for new proposal
When('I fill lead details for new proposal', async ({ page }) => {
  ExcelDataReader.loadExcelFile(proposalCreationExcelPath);
  const leadData = ExcelDataReader.getDataByKey('LeadData', 'dataKey', 'proposal1');
  if (!leadData) {
    throw new Error('LeadData not found for proposal1');
  }

  proposalPage = new ProposalCreationPage(page);
  await proposalPage.fillLeadDetails(leadData);
});

// Fill registered address details
When('I fill registered address details', async ({ page }) => {
  ExcelDataReader.loadExcelFile(proposalCreationExcelPath);
  const addressData = ExcelDataReader.getDataByKey('AddressData', 'dataKey', 'address1');
  if (!addressData) {
    throw new Error('AddressData not found for address1');
  }

  proposalPage = new ProposalCreationPage(page);
  await proposalPage.fillAddressDetails({ 
    state: addressData.state, 
    city: addressData.city, 
    state2: addressData.state, 
    city2: addressData.city 
  });
});

// Add communication address
When('I add communication address', async ({ page }) => {
  ExcelDataReader.loadExcelFile(proposalCreationExcelPath);
  const addressData = ExcelDataReader.getDataByKey('AddressData', 'dataKey', 'address1');
  if (!addressData) {
    throw new Error('AddressData not found for address1');
  }

  proposalPage = new ProposalCreationPage(page);
  await proposalPage.addNewAddress(addressData);
});

// Select product and facility
When('I select product and facility', async ({ page }) => {
  ExcelDataReader.loadExcelFile(proposalCreationExcelPath);
  const productData = ExcelDataReader.getDataByKey('ProductData', 'dataKey', 'product1');
  if (!productData) {
    throw new Error('ProductData not found for product1');
  }

  proposalPage = new ProposalCreationPage(page);
  await proposalPage.selectProductFacility(productData);
});

// Fill loan amount and tenure
When('I fill loan amount and tenure', async ({ page }) => {
  ExcelDataReader.loadExcelFile(proposalCreationExcelPath);
  const productData = ExcelDataReader.getDataByKey('ProductData', 'dataKey', 'product1');
  if (!productData) {
    throw new Error('ProductData not found for product1');
  }

  proposalPage = new ProposalCreationPage(page);
  await proposalPage.fillLoanDetails(productData);
});

// Save proposal
When('I save the proposal', async ({ page }) => {
  proposalPage = new ProposalCreationPage(page);
  await proposalPage.saveProposal();
});

// Verify proposal saved successfully
Then('I should see proposal saved successfully', async ({ page }) => {
  proposalPage = new ProposalCreationPage(page);
  await proposalPage.verifySuccessAlert();
});

// Create application from proposal
When('I create the application', async ({ page }) => {
  proposalPage = new ProposalCreationPage(page);
  await proposalPage.createApplication();
});
