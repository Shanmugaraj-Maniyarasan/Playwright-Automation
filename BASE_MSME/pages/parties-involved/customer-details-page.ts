import { Locator, Page, expect } from "@playwright/test";

export class CustomerDetailsPage {
  page: Page;
  
  // Section buttons
  editButton: Locator;
  saveButton: Locator;
  
  // 1. ROC Number
  rocNumberInput: Locator;
  // 2. Total Employees
  totalEmployeesInput: Locator;
  // 3. Type of Ownership*
  ownerTypeDropdown: Locator;
  // 4. Group
  groupInput: Locator;
  // 5. Banking Since
  bankingSinceInput: Locator;
  // 6. Industry Type
  industryTypeDropdown: Locator;
  // 7. Comments (If MSME,Original Investment)
  commentsInput: Locator;
  // 8. Credit Facility Since
  creditFacSinceInput: Locator;
  // 9. Corporate Customer*
  corpCustomerDropdown: Locator;
  
  // 10. Annual Income* (search popup)
  annualIncomeInput: Locator;
  annualIncomeDescInput: Locator;
  annualIncomeSearchBtn: Locator;
  
  // 11. Customer Occupation* (search popup)
  custOccupationInput: Locator;
  custOccupDescInput: Locator;
  custOccupationSearchBtn: Locator;
  
  // 12. Residence Proof Type* (search popup)
  resProofTypeInput: Locator;
  resProofDescInput: Locator;
  resProofSearchBtn: Locator;
  
  // 13. Residence ID Reference*
  resIdReferenceInput: Locator;
  
  // 14. ID Proof Type* (search popup)
  idProofTypeInput: Locator;
  idProofDescInput: Locator;
  idProofSearchBtn: Locator;
  
  // 15. ID Reference*
  idReferenceInput: Locator;
  
  // 16. Source of Income* (search popup)
  incomeSourceInput: Locator;
  incomeSourceDescInput: Locator;
  incomeSourceSearchBtn: Locator;
  
  // 17. Networth* (search popup)
  networthInput: Locator;
  networthDescInput: Locator;
  networthSearchBtn: Locator;
  
  // 18. Pooled Account*
  pooledAccDropdown: Locator;
  
  // 19. Annual Turn Over* (search popup)
  annualTurnOverInput: Locator;
  annualTurnDescInput: Locator;
  annualTurnOverSearchBtn: Locator;
  
  // 20. Nature of Activity* (search popup)
  natOfActivityInput: Locator;
  natOfActivityDescInput: Locator;
  natOfActivitySearchBtn: Locator;
  
  // 21. Annual Turn Over (Estimated)* (search popup)
  annualTurnOverEstInput: Locator;
  annualTurnEstDescInput: Locator;
  annualTurnOverEstSearchBtn: Locator;
  
  // 22. OFAC/UNSCAN*
  ofacDropdown: Locator;
  
  // 23. Foreign Inward Remittance
  foreignInwardRemDropdown: Locator;
  
  // 24. Remit Country
  remCountryDropdown: Locator;
  
  // 25. Risk Categorization* (search popup)
  riskCategoryInput: Locator;
  riskCategoryDescInput: Locator;
  riskCategorySearchBtn: Locator;
  
  // 26. Sleeping Partner
  sleepingPartnerDropdown: Locator;
  
  // 27. Political Exposed
  politicalExposedDropdown: Locator;
  
  // 28. Family Share*
  familyShareDropdown: Locator;
  
  // 29. Whether GST applicable
  gstApplicableDropdown: Locator;
  
  // 30. GST number (conditional)
  gstNoInput: Locator;
  
  // 31. Relationship with Bank
  bankRelationDropdown: Locator;
  
  // 32. ZED Rating
  zedRatingDropdown: Locator;
  
  // 33. GEM Rating
  gemRatingInput: Locator;
  
  // 34. Copy Address of
  copyAddressDropdown: Locator;
  
  // Address Table Row 0 (first row)
  addressType0Dropdown: Locator;
  address1_0Input: Locator;
  address2_0Input: Locator;
  address3_0Input: Locator;
  country0Dropdown: Locator;
  pincode0Input: Locator;
  
  // Address Table Row 1 (second row)
  addressType1Dropdown: Locator;
  address1_1Input: Locator;
  address2_1Input: Locator;
  address3_1Input: Locator;
  country1Dropdown: Locator;
  pincode1Input: Locator;
  
  // Address Table Row 2 (third row)
  addressType2Dropdown: Locator;
  address1_2Input: Locator;
  address2_2Input: Locator;
  address3_2Input: Locator;
  country2Dropdown: Locator;
  pincode2Input: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Section buttons
    this.editButton = this.page.locator('#subsectiontop').getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.locator('#subsectiontop').getByRole('button', { name: 'Save' });
    
    // 1. ROC Number
    this.rocNumberInput = this.page.locator('#lcnRocNumber');
    // 2. Total Employees
    this.totalEmployeesInput = this.page.locator('#lcnTotEmployees');
    // 3. Type of Ownership*
    this.ownerTypeDropdown = this.page.locator('#lcnOwnerType');
    // 4. Group
    this.groupInput = this.page.locator('#lcnGroup');
    // 5. Banking Since
    this.bankingSinceInput = this.page.locator('#nonBcifNBankingSince');
    // 6. Industry Type
    this.industryTypeDropdown = this.page.locator('#lcnIndustryType');
    // 7. Comments
    this.commentsInput = this.page.locator('#lcnComments');
    // 8. Credit Facility Since
    this.creditFacSinceInput = this.page.locator('#lcnCreditFacSince');
    // 9. Corporate Customer*
    this.corpCustomerDropdown = this.page.locator('#lcnCorpCustomer');
    
    // 10. Annual Income* (search popup)
    this.annualIncomeInput = this.page.locator('#lcnAnnualIncome');
    this.annualIncomeDescInput = this.page.locator('#annualIncomeDesc').first();
    this.annualIncomeSearchBtn = this.page.locator('.input-group:has(#annualIncomeDesc) button').first();
    
    // 11. Customer Occupation* (search popup)
    this.custOccupationInput = this.page.locator('#lcnCustOccupation');
    this.custOccupDescInput = this.page.locator('#custOccupDesc').first();
    this.custOccupationSearchBtn = this.page.locator('.input-group:has(#custOccupDesc) button').first();
    
    // 12. Residence Proof Type* (search popup)
    this.resProofTypeInput = this.page.locator('#lcnResProofType');
    this.resProofDescInput = this.page.locator('#resProofDesc').first();
    this.resProofSearchBtn = this.page.locator('.input-group:has(#resProofDesc) button').first();
    
    // 13. Residence ID Reference*
    this.resIdReferenceInput = this.page.locator('#lcnResIdReference');
    
    // 14. ID Proof Type* (search popup)
    this.idProofTypeInput = this.page.locator('#lcnIdProofType');
    this.idProofDescInput = this.page.locator('#idProofDesc').first();
    this.idProofSearchBtn = this.page.locator('.input-group:has(#idProofDesc) button').first();
    
    // 15. ID Reference*
    this.idReferenceInput = this.page.locator('#lcnIdReference');
    
    // 16. Source of Income* (search popup)
    this.incomeSourceInput = this.page.locator('#lcnIncomeSource');
    this.incomeSourceDescInput = this.page.locator('#incomeSourceDesc').first();
    this.incomeSourceSearchBtn = this.page.locator('.input-group:has(#incomeSourceDesc) button').first();
    
    // 17. Networth* (search popup)
    this.networthInput = this.page.locator('#lcnCustNetworth');
    this.networthDescInput = this.page.locator('input[name="networthDesc"]').first();
    this.networthSearchBtn = this.page.locator('.input-group:has(input[name="networthDesc"]) button').first();
    
    // 18. Pooled Account*
    this.pooledAccDropdown = this.page.locator('#lcnPooledAcc');
    
    // 19. Annual Turn Over* (search popup)
    this.annualTurnOverInput = this.page.locator('#lcnAnnualTurnOver');
    this.annualTurnDescInput = this.page.locator('#annualTurnDesc').first();
    this.annualTurnOverSearchBtn = this.page.locator('.input-group:has(#annualTurnDesc) button').first();
    
    // 20. Nature of Activity* (search popup)
    this.natOfActivityInput = this.page.locator('#lcnNatOfActivity');
    this.natOfActivityDescInput = this.page.locator('#natOfActivityDesc').first();
    this.natOfActivitySearchBtn = this.page.locator('.input-group:has(#natOfActivityDesc) button').first();
    
    // 21. Annual Turn Over (Estimated)* (search popup)
    this.annualTurnOverEstInput = this.page.locator('#lcnAnnualTurnOverEst');
    this.annualTurnEstDescInput = this.page.locator('#annualTurnEstDesc').first();
    this.annualTurnOverEstSearchBtn = this.page.locator('.input-group:has(#annualTurnEstDesc) button').first();
    
    // 22. OFAC/UNSCAN*
    this.ofacDropdown = this.page.locator('#lcnOfac');
    
    // 23. Foreign Inward Remittance
    this.foreignInwardRemDropdown = this.page.locator('#lcnForeInwRem');
    
    // 24. Remit Country
    this.remCountryDropdown = this.page.locator('#lcnRemCountry');
    
    // 25. Risk Categorization* (search popup)
    this.riskCategoryInput = this.page.locator('#lcnRiskCategory');
    this.riskCategoryDescInput = this.page.locator('#riskCategoryDesc').first();
    this.riskCategorySearchBtn = this.page.locator('.input-group:has(#riskCategoryDesc) button').first();
    
    // 26. Sleeping Partner
    this.sleepingPartnerDropdown = this.page.locator('#lcnSleePartner');
    
    // 27. Political Exposed
    this.politicalExposedDropdown = this.page.locator('#lcnPoliExpo');
    
    // 28. Family Share*
    this.familyShareDropdown = this.page.locator('#lcnFamilyShare');
    
    // 29. Whether GST applicable
    this.gstApplicableDropdown = this.page.locator('#lcnIsGstApplicable');
    
    // 30. GST number
    this.gstNoInput = this.page.locator('#lcnGstNo');
    
    // 31. Relationship with Bank
    this.bankRelationDropdown = this.page.locator('#lcnBankRelation');
    
    // 32. ZED Rating
    this.zedRatingDropdown = this.page.locator('#lcnZedRating');
    
    // 33. GEM Rating
    this.gemRatingInput = this.page.locator('#lcnGemRating');
    
    // 34. Copy Address of
    this.copyAddressDropdown = this.page.locator('#nonIndivCopyAddress');
    
    // Address Table Row 0 (first row)
    this.addressType0Dropdown = this.page.locator('#nonIndivAddrType0');
    this.address1_0Input = this.page.locator('#nonIndivAddr10');
    this.address2_0Input = this.page.locator('#nonIndivAddr20');
    this.address3_0Input = this.page.locator('#nonIndivAddr30');
    this.country0Dropdown = this.page.locator('#nonIndivCountry0');
    this.pincode0Input = this.page.locator('#nonIndivPincode0');
    
    // Address Table Row 1 (second row)
    this.addressType1Dropdown = this.page.locator('#nonIndivAddrType1');
    this.address1_1Input = this.page.locator('#nonIndivAddr11');
    this.address2_1Input = this.page.locator('#nonIndivAddr21');
    this.address3_1Input = this.page.locator('#nonIndivAddr31');
    this.country1Dropdown = this.page.locator('#nonIndivCountry1');
    this.pincode1Input = this.page.locator('#nonIndivPincode1');
    
    // Address Table Row 2 (third row)
    this.addressType2Dropdown = this.page.locator('#nonIndivAddrType2');
    this.address1_2Input = this.page.locator('#nonIndivAddr12');
    this.address2_2Input = this.page.locator('#nonIndivAddr22');
    this.address3_2Input = this.page.locator('#nonIndivAddr32');
    this.country2Dropdown = this.page.locator('#nonIndivCountry2');
    this.pincode2Input = this.page.locator('#nonIndivPincode2');
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /Kindly fill|error|required/i }).first();
  }

  // Helper: Select from search popup
  public async selectFromSearchPopup(searchBtn: Locator, searchText: string) {
    await searchBtn.click();
    await this.page.waitForTimeout(500);
    
    // Wait for modal to appear
    const modal = this.page.locator('#SearchLOV');
    await modal.waitFor({ state: 'visible', timeout: 5000 });
    
    // Search within modal
    const searchInput = modal.locator('input[type="search"]').first();
    if (await searchInput.isVisible()) {
      await searchInput.fill(searchText);
      await this.page.waitForTimeout(500);
    }
    
    // Click first result row in modal table
    const resultRow = modal.locator('table tbody tr').first();
    await resultRow.waitFor({ state: 'visible', timeout: 5000 });
    await resultRow.click();
    await this.page.waitForTimeout(300);
  }

  // Fill all customer details in order
  public async fillCustomerDetails(data: any) {
    console.log('\\n========== FILLING CUSTOMER DETAILS ==========');
    
    // 1. ROC Number
    if (data.rocNumber) {
      console.log(`1. ROC Number: ${data.rocNumber}`);
      await this.rocNumberInput.fill(String(data.rocNumber));
    }
    
    // 2. Total Employees
    if (data.totalEmployees) {
      console.log(`2. Total Employees: ${data.totalEmployees}`);
      await this.totalEmployeesInput.fill(String(data.totalEmployees));
    }
    
    // 3. Type of Ownership*
    if (data.ownerType) {
      console.log(`3. Type of Ownership: ${data.ownerType}`);
      await this.ownerTypeDropdown.selectOption(String(data.ownerType));
    }
    
    // 4. Group
    if (data.group) {
      console.log(`4. Group: ${data.group}`);
      await this.groupInput.fill(String(data.group));
    }
    
    // 5. Banking Since (date - skipping for now, needs date picker)
    
    // 6. Industry Type
    if (data.industryType) {
      console.log(`6. Industry Type: ${data.industryType}`);
      await this.industryTypeDropdown.selectOption(String(data.industryType));
    }
    
    // 7. Comments (If MSME, Original Investment)
    if (data.comments) {
      console.log(`7. Comments: ${data.comments}`);
      await this.commentsInput.fill(String(data.comments));
    }
    
    // 8. Credit Facility Since (date - skipping for now, needs date picker)
    
    // 9. Corporate Customer*
    if (data.corpCustomer) {
      console.log(`9. Corporate Customer: ${data.corpCustomer}`);
      await this.corpCustomerDropdown.selectOption(String(data.corpCustomer));
    }
    
    // 10. Annual Income* (search popup)
    if (data.annualIncome) {
      console.log(`10. Annual Income: ${data.annualIncome}`);
      await this.selectFromSearchPopup(this.annualIncomeSearchBtn, String(data.annualIncome));
    }
    
    // 11. Customer Occupation* (search popup)
    if (data.custOccupation) {
      console.log(`11. Customer Occupation: ${data.custOccupation}`);
      await this.selectFromSearchPopup(this.custOccupationSearchBtn, String(data.custOccupation));
    }
    
    // 12. Residence Proof Type* (search popup)
    if (data.resProofType) {
      console.log(`12. Residence Proof Type: ${data.resProofType}`);
      await this.selectFromSearchPopup(this.resProofSearchBtn, String(data.resProofType));
    }
    
    // 13. Residence ID Reference*
    if (data.resIdReference) {
      console.log(`13. Residence ID Reference: ${data.resIdReference}`);
      await this.page.waitForTimeout(300);
      await this.resIdReferenceInput.scrollIntoViewIfNeeded();
      await this.resIdReferenceInput.click();
      await this.resIdReferenceInput.clear();
      await this.resIdReferenceInput.pressSequentially(String(data.resIdReference), { delay: 50 });
    }
    
    // 14. ID Proof Type* (search popup)
    if (data.idProofType) {
      console.log(`14. ID Proof Type: ${data.idProofType}`);
      await this.selectFromSearchPopup(this.idProofSearchBtn, String(data.idProofType));
    }
    
    // 15. ID Reference*
    if (data.idReference) {
      console.log(`15. ID Reference: ${data.idReference}`);
      await this.page.waitForTimeout(300);
      await this.idReferenceInput.scrollIntoViewIfNeeded();
      await this.idReferenceInput.click();
      await this.idReferenceInput.clear();
      await this.idReferenceInput.pressSequentially(String(data.idReference), { delay: 50 });
    }
    
    // 16. Source of Income* (search popup)
    if (data.incomeSource) {
      console.log(`16. Source of Income: ${data.incomeSource}`);
      await this.selectFromSearchPopup(this.incomeSourceSearchBtn, String(data.incomeSource));
    }
    
    // 17. Networth* (search popup)
    if (data.networth) {
      console.log(`17. Networth: ${data.networth}`);
      await this.selectFromSearchPopup(this.networthSearchBtn, String(data.networth));
    }
    
    // 18. Pooled Account*
    if (data.pooledAcc) {
      console.log(`18. Pooled Account: ${data.pooledAcc}`);
      await this.pooledAccDropdown.selectOption(String(data.pooledAcc));
    }
    
    // 19. Annual Turn Over* (search popup)
    if (data.annualTurnOver) {
      console.log(`19. Annual Turn Over: ${data.annualTurnOver}`);
      await this.selectFromSearchPopup(this.annualTurnOverSearchBtn, String(data.annualTurnOver));
    }
    
    // 20. Nature of Activity* (search popup)
    if (data.natOfActivity) {
      console.log(`20. Nature of Activity: ${data.natOfActivity}`);
      await this.selectFromSearchPopup(this.natOfActivitySearchBtn, String(data.natOfActivity));
    }
    
    // 21. Annual Turn Over (Estimated)* (search popup)
    if (data.annualTurnOverEst) {
      console.log(`21. Annual Turn Over (Estimated): ${data.annualTurnOverEst}`);
      await this.selectFromSearchPopup(this.annualTurnOverEstSearchBtn, String(data.annualTurnOverEst));
    }
    
    // 22. OFAC/UNSCAN*
    if (data.ofac) {
      console.log(`22. OFAC/UNSCAN: ${data.ofac}`);
      await this.ofacDropdown.selectOption(String(data.ofac));
    }
    
    // 23. Foreign Inward Remittance
    if (data.foreignInwardRem) {
      console.log(`23. Foreign Inward Remittance: ${data.foreignInwardRem}`);
      await this.foreignInwardRemDropdown.selectOption(String(data.foreignInwardRem));
    }
    
    // 24. Remit Country
    if (data.remCountry) {
      console.log(`24. Remit Country: ${data.remCountry}`);
      await this.remCountryDropdown.selectOption(String(data.remCountry));
    }
    
    // 25. Risk Categorization* (search popup)
    if (data.riskCategory) {
      console.log(`25. Risk Categorization: ${data.riskCategory}`);
      await this.selectFromSearchPopup(this.riskCategorySearchBtn, String(data.riskCategory));
    }
    
    // 26. Sleeping Partner
    if (data.sleepingPartner) {
      console.log(`26. Sleeping Partner: ${data.sleepingPartner}`);
      await this.sleepingPartnerDropdown.selectOption(String(data.sleepingPartner));
    }
    
    // 27. Political Exposed
    if (data.politicalExposed) {
      console.log(`27. Political Exposed: ${data.politicalExposed}`);
      await this.politicalExposedDropdown.selectOption(String(data.politicalExposed));
    }
    
    // 28. Family Share*
    if (data.familyShare) {
      console.log(`28. Family Share: ${data.familyShare}`);
      await this.familyShareDropdown.selectOption(String(data.familyShare));
    }
    
    // 29. Whether GST applicable
    if (data.gstApplicable) {
      console.log(`29. GST Applicable: ${data.gstApplicable}`);
      await this.gstApplicableDropdown.selectOption(String(data.gstApplicable));
    }
    
    // 30. GST number (conditional - only if GST applicable = Y)
    if (data.gstNo) {
      console.log(`30. GST Number: ${data.gstNo}`);
      await this.gstNoInput.fill(String(data.gstNo));
    }
    
    // 31. Relationship with Bank
    if (data.bankRelation) {
      console.log(`31. Relationship with Bank: ${data.bankRelation}`);
      await this.bankRelationDropdown.selectOption(String(data.bankRelation));
    }
    
    // 32. ZED Rating
    if (data.zedRating) {
      console.log(`32. ZED Rating: ${data.zedRating}`);
      await this.zedRatingDropdown.selectOption(String(data.zedRating));
    }
    
    // 33. GEM Rating
    if (data.gemRating) {
      console.log(`33. GEM Rating: ${data.gemRating}`);
      await this.gemRatingInput.fill(String(data.gemRating));
    }
    
    // 34. Copy Address of (dropdown)
    if (data.copyAddress) {
      console.log(`34. Copy Address of: ${data.copyAddress}`);
      await this.copyAddressDropdown.selectOption(String(data.copyAddress));
    }
    
    // ========== ADDRESS TABLE ==========
    await this.fillAddressTable(data);
    
    console.log('========== CUSTOMER DETAILS COMPLETED ==========\\n');
  }
  
  // Helper: Fill address table rows dynamically
  public async fillAddressTable(data: any) {
    console.log('\\n--- Filling Address Table ---');
    
    // Count address rows in table
    const addressRows = this.page.locator('table.addressTable tbody tr');
    const rowCount = await addressRows.count();
    console.log(`Found ${rowCount} address rows`);
    
    for (let i = 0; i < rowCount; i++) {
      console.log(`\\n--- Processing Address Row ${i} ---`);
      
      // Address Type dropdown
      const addrTypeDropdown = this.page.locator(`#nonIndivAddrType${i}`);
      if (await addrTypeDropdown.isVisible()) {
        const currentValue = await addrTypeDropdown.inputValue();
        if (!currentValue || currentValue === '' || currentValue === 's') {
          const addrTypeValue = data[`addressType${i}`] || data.addressType || '1';
          console.log(`  Address Type: ${addrTypeValue}`);
          await addrTypeDropdown.selectOption(String(addrTypeValue));
        } else {
          console.log(`  Address Type: Already has value (${currentValue}), skipping`);
        }
      }
      
      // Address 1 input
      const addr1Input = this.page.locator(`#nonIndivAddr1${i}`);
      if (await addr1Input.isVisible()) {
        const currentValue = await addr1Input.inputValue();
        if (!currentValue || currentValue.trim() === '') {
          const addr1Value = data[`address1_${i}`] || data.address1 || '';
          if (addr1Value) {
            console.log(`  Address 1: ${addr1Value}`);
            await addr1Input.fill(String(addr1Value));
          }
        } else {
          console.log(`  Address 1: Already has value, skipping`);
        }
      }
      
      // Address 2 input
      const addr2Input = this.page.locator(`#nonIndivAddr2${i}`);
      if (await addr2Input.isVisible()) {
        const currentValue = await addr2Input.inputValue();
        if (!currentValue || currentValue.trim() === '') {
          const addr2Value = data[`address2_${i}`] || data.address2 || '';
          if (addr2Value) {
            console.log(`  Address 2: ${addr2Value}`);
            await addr2Input.fill(String(addr2Value));
          }
        } else {
          console.log(`  Address 2: Already has value, skipping`);
        }
      }
      
      // Address 3 input
      const addr3Input = this.page.locator(`#nonIndivAddr3${i}`);
      if (await addr3Input.isVisible()) {
        const currentValue = await addr3Input.inputValue();
        if (!currentValue || currentValue.trim() === '') {
          const addr3Value = data[`address3_${i}`] || data.address3 || '';
          if (addr3Value) {
            console.log(`  Address 3: ${addr3Value}`);
            await addr3Input.fill(String(addr3Value));
          }
        } else {
          console.log(`  Address 3: Already has value, skipping`);
        }
      }
      
      // Country dropdown
      const countryDropdown = this.page.locator(`#nonIndivCountry${i}`);
      if (await countryDropdown.isVisible()) {
        const currentValue = await countryDropdown.inputValue();
        if (!currentValue || currentValue === '' || currentValue === 's') {
          const countryValue = data[`country${i}`] || data.country || '11'; // 11 = India
          console.log(`  Country: ${countryValue}`);
          await countryDropdown.scrollIntoViewIfNeeded();
          await countryDropdown.selectOption(String(countryValue));
          await this.page.waitForTimeout(500); // Wait for state to load
        } else {
          console.log(`  Country: Already has value (${currentValue}), skipping`);
        }
      }
      
      // State (select2 dropdown)
      const stateDropdown = this.page.locator(`#nonIndivlcaState_${i}`);
      if (await stateDropdown.isVisible()) {
        const currentValue = await stateDropdown.inputValue();
        if (!currentValue || currentValue === '' || currentValue === 's') {
          const stateValue = data[`state${i}`] || data.state || '38'; // 38 = TAMILNADU
          console.log(`  State: ${stateValue}`);
          await stateDropdown.selectOption(String(stateValue));
          await this.page.waitForTimeout(500); // Wait for district to load
        } else {
          console.log(`  State: Already has value (${currentValue}), skipping`);
        }
      }
      
      // District (select2 dropdown)
      const districtDropdown = this.page.locator(`#nonIndivDistrict_${i}`);
      if (await districtDropdown.isVisible()) {
        const currentValue = await districtDropdown.inputValue();
        if (!currentValue || currentValue === '' || currentValue === 's') {
          const districtValue = data[`district${i}`] || data.district || '603'; // 603 = CHENNAI
          console.log(`  District: ${districtValue}`);
          await districtDropdown.selectOption(String(districtValue));
          await this.page.waitForTimeout(500); // Wait for city to load
        } else {
          console.log(`  District: Already has value (${currentValue}), skipping`);
        }
      }
      
      // City (select2 dropdown)
      const cityDropdown = this.page.locator(`#nonIndivlcaCity_${i}`);
      if (await cityDropdown.isVisible()) {
        const currentValue = await cityDropdown.inputValue();
        if (!currentValue || currentValue === '' || currentValue === 's') {
          const cityValue = data[`city${i}`] || data.city || '0001'; // 0001 = Chennai
          console.log(`  City: ${cityValue}`);
          await cityDropdown.selectOption(String(cityValue));
        } else {
          console.log(`  City: Already has value (${currentValue}), skipping`);
        }
      }
      
      // Taluk dropdown
      const talukDropdown = this.page.locator(`#Indivillage_${i}`);
      if (await talukDropdown.isVisible()) {
        const currentValue = await talukDropdown.inputValue();
        if (!currentValue || currentValue === '' || currentValue === 's') {
          const talukValue = data[`taluk${i}`] || data.taluk || '';
          if (talukValue) {
            console.log(`  Taluk: ${talukValue}`);
            await talukDropdown.selectOption(String(talukValue));
          }
        } else {
          console.log(`  Taluk: Already has value (${currentValue}), skipping`);
        }
      }
      
      // Pincode input
      const pincodeInput = this.page.locator(`#nonIndivPincode${i}`);
      if (await pincodeInput.isVisible()) {
        const currentValue = await pincodeInput.inputValue();
        if (!currentValue || currentValue.trim() === '') {
          const pincodeValue = data[`pincode${i}`] || data.pincode || '';
          if (pincodeValue) {
            console.log(`  Pincode: ${pincodeValue}`);
            await pincodeInput.fill(String(pincodeValue));
          }
        } else {
          console.log(`  Pincode: Already has value (${currentValue}), skipping`);
        }
      }
    }
    
    console.log('--- Address Table Completed ---');
  }
}
