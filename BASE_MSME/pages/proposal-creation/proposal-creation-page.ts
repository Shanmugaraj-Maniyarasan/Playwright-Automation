import { Locator, Page, expect } from "@playwright/test";

export class ProposalCreationPage {
  page: Page;
  
  // Navigation locators
  proposalLoginLink: Locator;
  newProposalCreationLink: Locator;
  
  // Customer section locators
  addCustomerButton: Locator;
  existingCustomerCheckbox: Locator;
  individualCustomerCheckbox: Locator;
  cbsIdInput: Locator;
  fetchButton: Locator;
  customerRadioButton: Locator;
  proceedFurtherButton: Locator;
  
  // Lead details locators
  partyTypeDropdown: Locator;
  altMobileInput: Locator;
  lineOfActivityInput: Locator;
  gstApplicableDropdown: Locator;
  gstNumberInput: Locator;
  urnApplicableDropdown: Locator;
  urnNumberInput: Locator;
  udyamAssistNumberInput: Locator;
  urnClassificationDropdown: Locator;
  cinApplicableDropdown: Locator;
  cinNumberInput: Locator;
  leiApplicableDropdown: Locator;
  leiNumberInput: Locator;
  leiExpDateInput: Locator;
  customerDealingDropdown: Locator;
  customerDealingDateInput: Locator;
  pslDropdown: Locator;
  ecgcApplicableDropdown: Locator;
  ecgcNumberInput: Locator;
  beneficialOwnerDropdown: Locator;
  beneficialOwnerInput: Locator;
  constitutionChangeDropdown: Locator;
  oldEntityInput: Locator;
  oldConsPanInput: Locator;
  customerOccupationSearchBtn: Locator;
  bsrCodeSearchBtn: Locator;
  sectorCodeDropdown: Locator;
  keyPersonInput: Locator;
  
  // Address section locators
  stateDropdownArrow: Locator;
  stateSearchInput: Locator;
  addNewAddressButton: Locator;
  
  // Product/Facility locators
  schemeDropdown: Locator;
  mainFacilityDropdown: Locator;
  subFacilityDropdown: Locator;
  pushButton: Locator;
  loanTypeDropdown: Locator;
  projectCostInput: Locator;
  requestAmountInput: Locator;
  proposedLimitInput: Locator;
  
  // Action buttons
  saveButton: Locator;
  createApplicationButton: Locator;
  closeButton: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation locators
    this.proposalLoginLink = this.page.getByRole('link', { name: ' Proposal Login' });
    this.newProposalCreationLink = this.page.locator('a').filter({ hasText: 'New Proposal Creation MSME' });
    
    // Customer section locators
    this.addCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });
    this.existingCustomerCheckbox = this.page.locator('#sel_existingcust');
    this.individualCustomerCheckbox = this.page.locator('#sel_indi1');
    this.cbsIdInput = this.page.locator('#lldCbsid');
    this.fetchButton = this.page.getByRole('button', { name: 'Fetch', exact: true });
    this.customerRadioButton = this.page.locator('input[name="radioStatus1"]');
    this.proceedFurtherButton = this.page.getByRole('button', { name: 'Proceed Further' });
    
    // Lead details locators
    this.partyTypeDropdown = this.page.locator('#lleadpartytyp');
    this.altMobileInput = this.page.locator('#lleadaltmobno');
    this.lineOfActivityInput = this.page.locator('#lleadlineofact');
    this.gstApplicableDropdown = this.page.locator('#lleadgstapp');
    this.gstNumberInput = this.page.locator('#leadGstNumber');
    this.urnApplicableDropdown = this.page.locator('#lleadurnapp');
    this.urnNumberInput = this.page.locator('#leadurnno');
    this.udyamAssistNumberInput = this.page.locator('#leadUdyamAssistNo');
    this.urnClassificationDropdown = this.page.locator('#lleadurnclas');
    this.cinApplicableDropdown = this.page.locator('#lleadcinapp');
    this.cinNumberInput = this.page.locator('#lsdCin');
    this.leiApplicableDropdown = this.page.locator('#lleadleiapp');
    this.leiNumberInput = this.page.locator('#lleadleino');
    this.leiExpDateInput = this.page.locator('#lleadleiExpDate');
    this.customerDealingDropdown = this.page.locator('#lleadcustdeal');
    this.customerDealingDateInput = this.page.getByRole('textbox', { name: 'dd/mm/yyyy' });
    this.pslDropdown = this.page.locator('#lleadpsl');
    this.ecgcApplicableDropdown = this.page.locator('#lleadecgcapp');
    this.ecgcNumberInput = this.page.locator('#lleadecgcno');
    this.beneficialOwnerDropdown = this.page.locator('#lleadbenownapp');
    this.beneficialOwnerInput = this.page.locator('#leadbenowner');
    this.constitutionChangeDropdown = this.page.locator('#lleadconschange');
    this.oldEntityInput = this.page.locator('#leadoldentity');
    this.oldConsPanInput = this.page.locator('#leadoldconspan');
    this.customerOccupationSearchBtn = this.page.locator('.two_fields > .input-group > .input-group-text').first();
    this.bsrCodeSearchBtn = this.page.locator('#bsrcodeDesc + .input-group-text button');
    this.sectorCodeDropdown = this.page.locator('#lleadSectorCode1');
    this.keyPersonInput = this.page.locator('#lleadKeyPerson');
    
    // Address section locators
    this.stateDropdownArrow = this.page.locator('.select2-selection__arrow').first();
    this.stateSearchInput = this.page.locator('input[type="search"]');
    this.addNewAddressButton = this.page.locator('div').filter({ hasText: /^Address DetailsAdd New$/ }).getByRole('button');
    
    // Product/Facility locators
    this.schemeDropdown = this.page.locator('#schemeId');
    this.mainFacilityDropdown = this.page.locator('#mainfacId');
    this.subFacilityDropdown = this.page.locator('#subfacId');
    this.pushButton = this.page.getByRole('button', { name: 'Push' });
    this.loanTypeDropdown = this.page.locator('#lildLoanType0');
    this.projectCostInput = this.page.locator('#lildProjCost0');
    this.requestAmountInput = this.page.locator('#lildReqAmt0');
    this.proposedLimitInput = this.page.locator('#lildPropLimit0');
    
    // Action buttons
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.createApplicationButton = this.page.getByRole('button', { name: 'Create Application' });
    this.closeButton = this.page.getByRole('button', { name: 'Close' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert', { name: 'Saved Successfully' }).first();
    this.errorAlert = this.page.getByRole('alert').first();
  }

  // Navigate to Proposal Creation page
  public async navigateToProposalCreation() {
    await this.proposalLoginLink.click();
    await this.newProposalCreationLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.newProposalCreationLink.click();
  }

  // Add existing customer by CBS ID
  public async addExistingCustomer(cbsId: string) {
    await this.addCustomerButton.click();
    await this.existingCustomerCheckbox.check();
    await this.individualCustomerCheckbox.check();
    await this.cbsIdInput.fill(String(cbsId));
    await this.fetchButton.click();
    // Wait for customer data to load
    await this.page.waitForTimeout(1000);
    await this.customerRadioButton.check();
    await this.proceedFurtherButton.click();
  }

  // Fill lead details section
  public async fillLeadDetails(data: any) {
    console.log('\n========== FILLING LEAD DETAILS ==========');
    
    // Save first to enable fields
    await this.saveButton.click();
    await this.page.waitForTimeout(500);

    // Party Type
    if (data.partyType) {
      console.log(`Party Type: ${data.partyType}`);
      await this.partyTypeDropdown.selectOption(String(data.partyType));
    }

    // Alt Mobile Number
    if (data.altMobile) {
      console.log(`Alt Mobile: ${data.altMobile}`);
      await this.altMobileInput.fill(String(data.altMobile));
    }

    // Line of Activity
    if (data.lineOfActivity) {
      console.log(`Line of Activity: ${data.lineOfActivity}`);
      await this.lineOfActivityInput.fill(String(data.lineOfActivity));
    }

    // GST Applicable
    if (data.gstApplicable) {
      console.log(`GST Applicable: ${data.gstApplicable}`);
      await this.gstApplicableDropdown.selectOption(data.gstApplicable);
      if (data.gstApplicable === 'Y' && data.gstNumber) {
        console.log(`GST Number: ${data.gstNumber}`);
        await this.gstNumberInput.fill(String(data.gstNumber));
      }
    }

    // URN Applicable
    if (data.urnApplicable) {
      console.log(`URN Applicable: ${data.urnApplicable}`);
      await this.urnApplicableDropdown.selectOption(String(data.urnApplicable));
      if (data.udyamNumber) {
        // Strip "UDYAM-" prefix if present, only enter suffix
        const udyamSuffix = String(data.udyamNumber).replace(/^UDYAM-/i, '');
        console.log(`UDYAM Number (suffix): ${udyamSuffix}`);
        
        if (data.urnApplicable === '1') {
          // Udyam Registration Number
          await this.urnNumberInput.waitFor({ state: 'visible', timeout: 5000 });
          await this.urnNumberInput.click();
          await this.urnNumberInput.press('CapsLock');
          await this.urnNumberInput.fill(udyamSuffix);
        } else if (data.urnApplicable === '2') {
          // Udyam Assist Number
          await this.udyamAssistNumberInput.waitFor({ state: 'visible', timeout: 5000 });
          await this.udyamAssistNumberInput.click();
          await this.udyamAssistNumberInput.press('CapsLock');
          await this.udyamAssistNumberInput.fill(udyamSuffix);
        }
        
        if (data.urnClassification) {
          console.log(`URN Classification: ${data.urnClassification}`);
          await this.urnClassificationDropdown.selectOption(String(data.urnClassification));
        }
      }
    }

    // CIN Applicable
    if (data.cinApplicable) {
      console.log(`CIN Applicable: ${data.cinApplicable}`);
      await this.cinApplicableDropdown.selectOption(data.cinApplicable);
      if (data.cinApplicable === 'Y' && data.cinNumber) {
        console.log(`CIN Number: ${data.cinNumber}`);
        await this.cinNumberInput.fill(String(data.cinNumber));
      }
    }

    // LEI Applicable
    if (data.leiApplicable) {
      console.log(`LEI Applicable: ${data.leiApplicable}`);
      await this.leiApplicableDropdown.selectOption(data.leiApplicable);
      if (data.leiApplicable === 'Y' && data.leiNumber) {
        console.log(`LEI Number: ${data.leiNumber}`);
        await this.leiNumberInput.fill(String(data.leiNumber));
      }
    }

    // PSL
    if (data.psl) {
      console.log(`PSL: ${data.psl}`);
      await this.pslDropdown.selectOption(String(data.psl));
    }

    // ECGC Applicable
    if (data.ecgcApplicable) {
      console.log(`ECGC Applicable: ${data.ecgcApplicable}`);
      await this.ecgcApplicableDropdown.selectOption(data.ecgcApplicable);
      if (data.ecgcApplicable === 'Y' && data.ecgcNumber) {
        console.log(`ECGC Number: ${data.ecgcNumber}`);
        await this.ecgcNumberInput.fill(String(data.ecgcNumber));
      }
    }

    // Beneficial Owner
    if (data.beneficialOwnerApplicable) {
      console.log(`Beneficial Owner Applicable: ${data.beneficialOwnerApplicable}`);
      await this.beneficialOwnerDropdown.selectOption(data.beneficialOwnerApplicable);
      if (data.beneficialOwnerApplicable === 'Y' && data.beneficialOwner) {
        console.log(`Beneficial Owner: ${data.beneficialOwner}`);
        await this.beneficialOwnerInput.fill(String(data.beneficialOwner));
      }
    }

    // Customer Occupation (popup lookup)
    if (data.customerOccupation) {
      console.log(`Customer Occupation: ${data.customerOccupation}`);
      await this.customerOccupationSearchBtn.click();
      await this.page.getByRole('cell', { name: String(data.customerOccupation) }).click();
    }

    // BSR Code (popup lookup)
    if (data.bsrCode) {
      console.log(`BSR Code: ${data.bsrCode}`);
      await this.bsrCodeSearchBtn.click();
      await this.page.getByRole('cell', { name: String(data.bsrCode) }).click();
    }

    // Sector Code
    if (data.sectorCode) {
      console.log(`Sector Code: ${data.sectorCode}`);
      await this.sectorCodeDropdown.selectOption(String(data.sectorCode));
    }

    // Key Person
    if (data.keyPerson) {
      console.log(`Key Person: ${data.keyPerson}`);
      await this.keyPersonInput.fill(String(data.keyPerson));
    }
    
    console.log('========== LEAD DETAILS COMPLETED ==========\n');
  }

  // Fill address details
  public async fillAddressDetails(data: any) {
    // Select state
    if (data.state) {
      await this.stateDropdownArrow.click();
      await this.stateSearchInput.fill(String(data.state));
      await this.page.getByRole('treeitem', { name: data.state }).click();
    }

    // Select city for first address
    if (data.city) {
      await this.page.locator('#BcifICity_0').selectOption(String(data.city));
    }

    // Select state for second address if exists
    if (data.state2) {
      await this.page.getByLabel('', { exact: true }).locator('span').nth(1).click();
      await this.stateSearchInput.fill(String(data.state2));
      await this.page.getByRole('treeitem', { name: data.state2 }).click();
      if (data.city2) {
        await this.page.locator('#BcifICity_1').selectOption(String(data.city2));
      }
    }
  }

  // Add new address
  public async addNewAddress(data: any) {
    await this.addNewAddressButton.click();

    if (data.addressType) {
      await this.page.locator('#BcifIAddrType2').selectOption(String(data.addressType));
    }
    if (data.address1) {
      await this.page.locator('#BcifIAddress12').fill(String(data.address1));
    }
    if (data.address2) {
      await this.page.locator('#BcifIAddress22').fill(String(data.address2));
    }
    if (data.address3) {
      await this.page.locator('#BcifIAddress32').fill(String(data.address3));
    }
    if (data.state) {
      await this.page.getByRole('combobox', { name: '-- Select --' }).locator('span').nth(1).click();
      await this.stateSearchInput.fill(String(data.state));
      await this.page.getByRole('treeitem', { name: data.state }).click();
    }
    if (data.district) {
      await this.page.locator('#BcifIDistrict_2').selectOption(String(data.district));
    }
    if (data.city) {
      await this.page.locator('#BcifICity_2').selectOption(String(data.city));
    }
    if (data.pincode) {
      await this.page.locator('#BcifIPincode2').fill(String(data.pincode));
    }
  }

  // Delete address row
  public async deleteAddressRow(rowName: string) {
    await this.page.getByRole('row', { name: rowName }).getByRole('button').click();
  }

  // Select product/facility
  public async selectProductFacility(data: any) {
    // Select scheme
    if (data.schemeId) {
      await this.schemeDropdown.selectOption(String(data.schemeId));
    }

    // Click add product button (search icon)
    await this.page.locator('i.fa-search.common-search').click();

    // Select main facility
    if (data.mainFacilityId) {
      await this.mainFacilityDropdown.selectOption(String(data.mainFacilityId));
    }

    // Select sub facility
    if (data.subFacilityId) {
      await this.subFacilityDropdown.selectOption(String(data.subFacilityId));
    }

    // Click product description to add
    await this.page.getByText('Union Mudra TL').click();

    // Push the product
    await this.pushButton.click();
  }

  // Fill loan details
  public async fillLoanDetails(data: any) {
    console.log('\n========== FILLING LOAN DETAILS ==========');
    if (data.loanType) {
      console.log(`Loan Type: ${data.loanType}`);
      await this.loanTypeDropdown.selectOption(String(data.loanType));
    }
    if (data.projectCost) {
      console.log(`Project Cost: ${data.projectCost}`);
      await this.projectCostInput.fill(String(data.projectCost));
    }
    if (data.requestAmount) {
      console.log(`Request Amount: ${data.requestAmount}`);
      await this.requestAmountInput.fill(String(data.requestAmount));
    }
    if (data.proposedLimit) {
      console.log(`Proposed Limit: ${data.proposedLimit}`);
      await this.proposedLimitInput.fill(String(data.proposedLimit));
    }
    console.log('========== LOAN DETAILS COMPLETED ==========\n');
  }

  // Save proposal
  public async saveProposal() {
    await this.saveButton.click();
  }

  // Create application from proposal
  public async createApplication() {
    console.log('Creating application from proposal...');
    // Handle confirmation dialog
    this.page.once('dialog', async dialog => {
      console.log(`Dialog: ${dialog.message()}`);
      await dialog.accept();
    });
    await this.createApplicationButton.click();
    // Wait for application to be created
    await this.page.waitForTimeout(2000);
    console.log('Application created successfully');
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await expect(this.successAlert).toBeVisible({ timeout: 5000 });
  }

  // Verify error alert with message
  public async verifyErrorAlert(message: string) {
    const alert = this.page.getByRole('alert', { name: message }).first();
    await expect(alert).toBeVisible({ timeout: 5000 });
  }

  // Close any open modal
  public async closeModal() {
    await this.closeButton.click();
  }
}
