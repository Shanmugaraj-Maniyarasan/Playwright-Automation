import { Locator, Page } from "@playwright/test";

export class CoBorrowerPage {
  page: Page;

  // Add Customer Modal
  addCustomerButton: Locator;
  existingCustomerRadio: Locator;
  nonIndividualTypeRadio: Locator;
  cbsIdInput: Locator;
  fetchButton: Locator;
  customerRadioSelect: Locator;
  proceedFurtherButton: Locator;

  // Co-Borrower specific fields
  partyTypeDropdown: Locator;
  constitutionDropdown: Locator;
  bsrCodeSearchBtn: Locator;
  leiApplicableDropdown: Locator;
  irbCompanyCodeInput: Locator;
  lineOfActivityInput: Locator;
  cinApplicableDropdown: Locator;
  cinNumberInput: Locator;
  fetchCinButton: Locator;
  udyamTypeDropdown: Locator;
  udyamNumberInput: Locator;
  sectorCodeDropdown: Locator;

  // Customer Details fields (same as primary customer)
  rocNumberInput: Locator;
  totalEmployeesInput: Locator;
  ownerTypeDropdown: Locator;
  groupInput: Locator;
  bankingSinceInput: Locator;
  industryTypeDropdown: Locator;
  commentsInput: Locator;
  creditFacSinceInput: Locator;
  corpCustomerDropdown: Locator;

  // Search popup fields
  annualIncomeSearchBtn: Locator;
  custOccupationSearchBtn: Locator;
  resProofSearchBtn: Locator;
  resIdReferenceInput: Locator;
  idProofSearchBtn: Locator;
  idReferenceInput: Locator;
  incomeSourceSearchBtn: Locator;
  networthSearchBtn: Locator;
  pooledAccDropdown: Locator;
  annualTurnOverSearchBtn: Locator;
  natOfActivitySearchBtn: Locator;
  annualTurnOverEstSearchBtn: Locator;
  ofacDropdown: Locator;
  foreignInwardRemDropdown: Locator;
  riskCategorySearchBtn: Locator;
  sleepingPartnerDropdown: Locator;
  politicalExposedDropdown: Locator;
  familyShareDropdown: Locator;
  gstApplicableDropdown: Locator;
  gstNoInput: Locator;
  bankRelationDropdown: Locator;
  zedRatingDropdown: Locator;
  gemRatingInput: Locator;
  copyAddressDropdown: Locator;

  // Section buttons
  editButton: Locator;
  saveButton: Locator;

  // Alerts
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    // Add Customer Modal
    this.addCustomerButton = this.page.getByRole('button', { name: 'Add Customer' });
    this.existingCustomerRadio = this.page.locator('#sel_existingcust');
    this.nonIndividualTypeRadio = this.page.locator('#sel_indi1');
    this.cbsIdInput = this.page.locator('#lldCbsid');
    this.fetchButton = this.page.getByRole('button', { name: 'Fetch' });
    this.customerRadioSelect = this.page.locator('input[name="radioStatus1"]');
    this.proceedFurtherButton = this.page.getByRole('button', { name: 'Proceed Further' });

    // Co-Borrower specific fields
    this.partyTypeDropdown = this.page.locator('#lppTypeBorr');
    this.constitutionDropdown = this.page.locator('#nonBcifConstitution');
    this.bsrCodeSearchBtn = this.page.locator('.input-group:has(#bsrCodeInDesc) button');
    this.leiApplicableDropdown = this.page.locator('#lcnLeiApplicable');
    this.irbCompanyCodeInput = this.page.locator('#lcnIrbCompanyCode');
    this.lineOfActivityInput = this.page.locator('#lcnLineOfActivity');
    this.cinApplicableDropdown = this.page.locator('#lcnCinApplicable');
    this.cinNumberInput = this.page.locator('#lsdCin');
    this.fetchCinButton = this.page.getByRole('button', { name: 'Fetch CIN' });
    this.udyamTypeDropdown = this.page.locator('#lcnUdyamType');
    this.udyamNumberInput = this.page.locator('#lcnUrnNo'); // or #lcnUdyamAssistNo based on type
    this.sectorCodeDropdown = this.page.locator('#lcnSectorCode');

    // Customer Details fields
    this.rocNumberInput = this.page.locator('#lcnRocNumber');
    this.totalEmployeesInput = this.page.locator('#lcnTotEmployees');
    this.ownerTypeDropdown = this.page.locator('#lcnOwnerType');
    this.groupInput = this.page.locator('#lcnGroup');
    this.bankingSinceInput = this.page.locator('#nonBcifNBankingSince');
    this.industryTypeDropdown = this.page.locator('#lcnIndustryType');
    this.commentsInput = this.page.locator('#lcnComments');
    this.creditFacSinceInput = this.page.locator('#lcnCreditFacSince');
    this.corpCustomerDropdown = this.page.locator('#lcnCorpCustomer');

    // Search popup fields
    this.annualIncomeSearchBtn = this.page.locator('div:nth-child(25) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.custOccupationSearchBtn = this.page.locator('div:nth-child(26) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.resProofSearchBtn = this.page.locator('div:nth-child(27) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.resIdReferenceInput = this.page.locator('#lcnResIdReference');
    this.idProofSearchBtn = this.page.locator('div:nth-child(29) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.idReferenceInput = this.page.locator('#lcnIdReference');
    this.incomeSourceSearchBtn = this.page.locator('div:nth-child(31) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.networthSearchBtn = this.page.locator('div:nth-child(32) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.pooledAccDropdown = this.page.locator('#lcnPooledAcc');
    this.annualTurnOverSearchBtn = this.page.locator('div:nth-child(34) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.natOfActivitySearchBtn = this.page.locator('div:nth-child(35) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.annualTurnOverEstSearchBtn = this.page.locator('div:nth-child(36) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.ofacDropdown = this.page.locator('#lcnOfac');
    this.foreignInwardRemDropdown = this.page.locator('#lcnForeInwRem');
    this.riskCategorySearchBtn = this.page.locator('div:nth-child(39) > .form-group > .two_fields > .input-group > .input-group-text').first();
    this.sleepingPartnerDropdown = this.page.locator('#lcnSleePartner');
    this.politicalExposedDropdown = this.page.locator('#lcnPoliExpo');
    this.familyShareDropdown = this.page.locator('#lcnFamilyShare');
    this.gstApplicableDropdown = this.page.locator('#lcnIsGstApplicable');
    this.gstNoInput = this.page.locator('#lcnGstNo');
    this.bankRelationDropdown = this.page.locator('#lcnBankRelation');
    this.zedRatingDropdown = this.page.locator('#lcnZedRating');
    this.gemRatingInput = this.page.locator('#lcnGemRating');
    this.copyAddressDropdown = this.page.locator('#nonIndivCopyAddress');

    // Section buttons
    this.editButton = this.page.locator('#subsectiontop').getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.locator('#subsectiontop').getByRole('button', { name: 'Save' });

    // Alerts
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /Kindly fill|error|required/i }).first();
  }

  // Add Co-Borrower - Fetch existing customer
  public async addCoBorrowerCustomer(cbsId: string) {
    console.log('\n========== ADDING CO-BORROWER ==========');
    
    // Click Add Customer button
    console.log('1. Clicking Add Customer button');
    await this.addCustomerButton.click();
    await this.page.waitForTimeout(500);
    
    // Select Existing Customer
    console.log('2. Selecting Existing Customer');
    await this.existingCustomerRadio.check();
    
    // Select Non-Individual type
    console.log('3. Selecting Non-Individual type');
    await this.nonIndividualTypeRadio.check();
    
    // Fill CBS ID
    console.log(`4. Filling CBS ID: ${cbsId}`);
    await this.cbsIdInput.click();
    await this.cbsIdInput.fill(cbsId);
    
    // Click Fetch
    console.log('5. Clicking Fetch');
    await this.fetchButton.click();
    await this.page.waitForTimeout(1000);
    
    // Select customer from list
    console.log('6. Selecting customer from list');
    await this.customerRadioSelect.check();
    
    // Click Proceed Further - form opens in edit mode
    console.log('7. Clicking Proceed Further');
    await this.proceedFurtherButton.click();
    await this.page.waitForTimeout(1500);
    
    // After Proceed Further, the form is already in edit mode
    // Ready to fill details directly
    console.log('========== CO-BORROWER FORM READY ==========\n');
  }

  // Helper: Select from search popup
  public async selectFromSearchPopup(searchBtn: Locator, searchText: string) {
    await searchBtn.click();
    await this.page.waitForTimeout(500);
    
    // Wait for modal
    const modal = this.page.locator('#SearchLOV');
    await modal.waitFor({ state: 'visible', timeout: 5000 });
    
    // Click first result row in modal table
    const resultRow = modal.locator('table tbody tr').first();
    await resultRow.waitFor({ state: 'visible', timeout: 5000 });
    await resultRow.click();
    await this.page.waitForTimeout(300);
  }

  // Helper: Fill date picker (format: dd/mm/yyyy)
  public async fillDatePicker(dateInput: Locator, dateValue: string) {
    await dateInput.scrollIntoViewIfNeeded();
    await dateInput.click();
    await dateInput.clear();
    await dateInput.fill(dateValue);
    // Press Escape to close any date picker popup
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  // Fill Co-Borrower Details
  public async fillCoBorrowerDetails(data: any) {
    console.log('\n========== FILLING CO-APPLICANT DETAILS ==========');
    
    // 1. Customer Type = 'C' (Co-Applicant)
    console.log(`1. Customer Type: C (Co-Applicant)`);
    await this.partyTypeDropdown.selectOption('C');
    await this.page.waitForTimeout(300);
    
    // 2. Constitution (5 = Private Limited Company)
    if (data.constitution) {
      console.log(`2. Constitution: ${data.constitution} (Private Limited Company)`);
      await this.constitutionDropdown.selectOption(String(data.constitution));
    }
    
    // 3. Industry BSR Code (search popup)
    if (data.bsrCode) {
      console.log(`3. Industry BSR Code: ${data.bsrCode}`);
      await this.selectFromSearchPopup(this.bsrCodeSearchBtn, String(data.bsrCode));
    }
    
    // 4. LEI Applicable
    if (data.leiApplicable) {
      console.log(`4. LEI Applicable: ${data.leiApplicable}`);
      await this.leiApplicableDropdown.selectOption(String(data.leiApplicable));
    }
    
    // 5. IRB Company Code
    if (data.irbCompanyCode) {
      console.log(`5. IRB Company Code: ${data.irbCompanyCode}`);
      await this.irbCompanyCodeInput.fill(String(data.irbCompanyCode));
    }
    
    // 6. Line of Activity
    if (data.lineOfActivity) {
      console.log(`6. Line of Activity: ${data.lineOfActivity}`);
      await this.lineOfActivityInput.fill(String(data.lineOfActivity));
    }
    
    // 7. Total Employees
    if (data.totalEmployees) {
      console.log(`7. Total Employees: ${data.totalEmployees}`);
      await this.totalEmployeesInput.fill(String(data.totalEmployees));
    }
    
    // 8. ROC Number
    if (data.rocNumber) {
      console.log(`8. ROC Number: ${data.rocNumber}`);
      await this.rocNumberInput.fill(String(data.rocNumber));
    }
    
    // 9. Type of Ownership
    if (data.ownerType) {
      console.log(`9. Type of Ownership: ${data.ownerType}`);
      await this.ownerTypeDropdown.selectOption(String(data.ownerType));
    }
    
    // 10. Group
    if (data.group) {
      console.log(`10. Group: ${data.group}`);
      await this.groupInput.fill(String(data.group));
    }
    
    // 10a. Banking Since (date picker)
    if (data.bankingSince) {
      console.log(`10a. Banking Since: ${data.bankingSince}`);
      await this.fillDatePicker(this.bankingSinceInput, String(data.bankingSince));
    }
    
    // 11. CIN Applicable
    if (data.cinApplicable) {
      console.log(`11. CIN Applicable: ${data.cinApplicable}`);
      await this.cinApplicableDropdown.selectOption(String(data.cinApplicable));
      
      if (data.cinApplicable === 'Y' && data.cinNumber) {
        console.log(`    CIN Number: ${data.cinNumber}`);
        await this.cinNumberInput.fill(String(data.cinNumber));
        await this.fetchCinButton.click();
        await this.page.waitForTimeout(500);
      }
    }
    
    // 12. Industry Type
    if (data.industryType) {
      console.log(`12. Industry Type: ${data.industryType}`);
      await this.industryTypeDropdown.selectOption(String(data.industryType));
    }
    
    // 13. Udyam Type
    if (data.udyamType) {
      console.log(`13. Udyam Type: ${data.udyamType}`);
      await this.udyamTypeDropdown.selectOption(String(data.udyamType));
      await this.page.waitForTimeout(500); // Wait for conditional fields
      
      // 14. Udyam Number (conditional - field depends on Udyam Type selection)
      if (data.udyamNumber) {
        const udyamValue = String(data.udyamNumber);
        console.log(`14. Udyam Number: ${udyamValue}`);
        
        if (data.udyamType === '1') {
          // Udyam Registration Number -> #lcnUrnNo
          const urnInput = this.page.locator('#lcnUrnNo');
          await urnInput.waitFor({ state: 'visible', timeout: 5000 });
          await urnInput.scrollIntoViewIfNeeded();
          await urnInput.click();
          await urnInput.clear();
          await urnInput.pressSequentially(udyamValue, { delay: 30 });
        } else if (data.udyamType === '2') {
          // Udyam Assist Number -> #lcnUdyamAssistNo
          const assistInput = this.page.locator('#lcnUdyamAssistNo');
          await assistInput.waitFor({ state: 'visible', timeout: 5000 });
          await assistInput.scrollIntoViewIfNeeded();
          await assistInput.click();
          await assistInput.clear();
          await assistInput.pressSequentially(udyamValue, { delay: 30 });
        }
      }
    }
    
    // 15. Comments
    if (data.comments) {
      console.log(`15. Comments: ${data.comments}`);
      await this.commentsInput.fill(String(data.comments));
    }
    
    // 15a. Credit Facility Since (date picker)
    if (data.creditFacSince) {
      console.log(`15a. Credit Facility Since: ${data.creditFacSince}`);
      await this.fillDatePicker(this.creditFacSinceInput, String(data.creditFacSince));
    }
    
    // 16. Corporate Customer
    if (data.corpCustomer) {
      console.log(`16. Corporate Customer: ${data.corpCustomer}`);
      await this.corpCustomerDropdown.selectOption(String(data.corpCustomer));
    }
    
    // 17. Annual Income (search popup)
    if (data.annualIncome) {
      console.log(`17. Annual Income: ${data.annualIncome}`);
      await this.selectFromSearchPopup(this.annualIncomeSearchBtn, String(data.annualIncome));
    }
    
    // 18. Customer Occupation (search popup)
    if (data.custOccupation) {
      console.log(`18. Customer Occupation: ${data.custOccupation}`);
      await this.selectFromSearchPopup(this.custOccupationSearchBtn, String(data.custOccupation));
    }
    
    // 19. Residence Proof Type (search popup)
    if (data.resProofType) {
      console.log(`19. Residence Proof Type: ${data.resProofType}`);
      await this.selectFromSearchPopup(this.resProofSearchBtn, String(data.resProofType));
    }
    
    // 20. Residence ID Reference
    if (data.resIdReference) {
      console.log(`20. Residence ID Reference: ${data.resIdReference}`);
      await this.resIdReferenceInput.scrollIntoViewIfNeeded();
      await this.resIdReferenceInput.click();
      await this.resIdReferenceInput.clear();
      await this.resIdReferenceInput.pressSequentially(String(data.resIdReference), { delay: 50 });
    }
    
    // 21. ID Proof Type (search popup)
    if (data.idProofType) {
      console.log(`21. ID Proof Type: ${data.idProofType}`);
      await this.selectFromSearchPopup(this.idProofSearchBtn, String(data.idProofType));
    }
    
    // 22. ID Reference
    if (data.idReference) {
      console.log(`22. ID Reference: ${data.idReference}`);
      await this.idReferenceInput.scrollIntoViewIfNeeded();
      await this.idReferenceInput.click();
      await this.idReferenceInput.clear();
      await this.idReferenceInput.pressSequentially(String(data.idReference), { delay: 50 });
    }
    
    // 23. Source of Income (search popup)
    if (data.incomeSource) {
      console.log(`23. Source of Income: ${data.incomeSource}`);
      await this.selectFromSearchPopup(this.incomeSourceSearchBtn, String(data.incomeSource));
    }
    
    // 24. Networth (search popup)
    if (data.networth) {
      console.log(`24. Networth: ${data.networth}`);
      await this.selectFromSearchPopup(this.networthSearchBtn, String(data.networth));
    }
    
    // 25. Pooled Account
    if (data.pooledAcc) {
      console.log(`25. Pooled Account: ${data.pooledAcc}`);
      await this.pooledAccDropdown.selectOption(String(data.pooledAcc));
    }
    
    // 26. Annual Turn Over (search popup)
    if (data.annualTurnOver) {
      console.log(`26. Annual Turn Over: ${data.annualTurnOver}`);
      await this.selectFromSearchPopup(this.annualTurnOverSearchBtn, String(data.annualTurnOver));
    }
    
    // 27. Nature of Activity (search popup)
    if (data.natOfActivity) {
      console.log(`27. Nature of Activity: ${data.natOfActivity}`);
      await this.selectFromSearchPopup(this.natOfActivitySearchBtn, String(data.natOfActivity));
    }
    
    // 28. Annual Turn Over (Estimated) (search popup)
    if (data.annualTurnOverEst) {
      console.log(`28. Annual Turn Over (Estimated): ${data.annualTurnOverEst}`);
      await this.selectFromSearchPopup(this.annualTurnOverEstSearchBtn, String(data.annualTurnOverEst));
    }
    
    // 29. OFAC/UNSCAN
    if (data.ofac) {
      console.log(`29. OFAC/UNSCAN: ${data.ofac}`);
      await this.ofacDropdown.selectOption(String(data.ofac));
    }
    
    // 30. Foreign Inward Remittance
    if (data.foreignInwardRem) {
      console.log(`30. Foreign Inward Remittance: ${data.foreignInwardRem}`);
      await this.foreignInwardRemDropdown.selectOption(String(data.foreignInwardRem));
    }
    
    // 31. Risk Categorization (search popup)
    if (data.riskCategory) {
      console.log(`31. Risk Categorization: ${data.riskCategory}`);
      await this.selectFromSearchPopup(this.riskCategorySearchBtn, String(data.riskCategory));
    }
    
    // 32. Sleeping Partner
    if (data.sleepingPartner) {
      console.log(`32. Sleeping Partner: ${data.sleepingPartner}`);
      await this.sleepingPartnerDropdown.selectOption(String(data.sleepingPartner));
    }
    
    // 33. Political Exposed
    if (data.politicalExposed) {
      console.log(`33. Political Exposed: ${data.politicalExposed}`);
      await this.politicalExposedDropdown.selectOption(String(data.politicalExposed));
    }
    
    // 34. Family Share
    if (data.familyShare) {
      console.log(`34. Family Share: ${data.familyShare}`);
      await this.familyShareDropdown.selectOption(String(data.familyShare));
    }
    
    // 35. GST Applicable
    if (data.gstApplicable) {
      console.log(`35. GST Applicable: ${data.gstApplicable}`);
      await this.gstApplicableDropdown.selectOption(String(data.gstApplicable));
    }
    
    // 36. Relationship with Bank
    if (data.bankRelation) {
      console.log(`36. Relationship with Bank: ${data.bankRelation}`);
      await this.bankRelationDropdown.selectOption(String(data.bankRelation));
    }
    
    // 37. ZED Rating
    if (data.zedRating) {
      console.log(`37. ZED Rating: ${data.zedRating}`);
      await this.zedRatingDropdown.selectOption(String(data.zedRating));
    }
    
    // 38. GEM Rating
    if (data.gemRating) {
      console.log(`38. GEM Rating: ${data.gemRating}`);
      await this.gemRatingInput.fill(String(data.gemRating));
    }
    
    // 39. Sector Code
    if (data.sectorCode) {
      console.log(`39. Sector Code: ${data.sectorCode}`);
      await this.sectorCodeDropdown.selectOption(String(data.sectorCode));
    }
    
    // 40. Copy Address of - Select first available option to copy address from borrower
    console.log(`40. Copy Address of: Selecting from borrower`);
    try {
      // Wait for dropdown to be ready
      await this.copyAddressDropdown.waitFor({ state: 'visible', timeout: 5000 });
      
      // Get all options and select the first non-empty one
      const options = await this.copyAddressDropdown.locator('option').all();
      for (const option of options) {
        const value = await option.getAttribute('value');
        if (value && value !== '' && value !== 's') {
          console.log(`    Selected address option: ${value}`);
          await this.copyAddressDropdown.selectOption(value);
          await this.page.waitForTimeout(1000); // Wait for address to populate
          break;
        }
      }
    } catch (error) {
      console.log('    [WARNING] Copy Address dropdown not available - address may need manual entry');
    }
    
    console.log('========== CO-BORROWER DETAILS COMPLETED ==========\n');
  }

  // Click Save
  public async clickSave() {
    await this.saveButton.click();
    await this.page.waitForTimeout(500);
  }

  // Click Edit
  public async clickEdit() {
    await this.editButton.click();
    await this.page.waitForTimeout(300);
  }
}
