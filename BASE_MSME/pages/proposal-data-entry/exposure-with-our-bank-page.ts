import { Locator, Page, expect } from "@playwright/test";

export class ExposureWithOurBankPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  exposureWithOurBankLink: Locator;
  
  // Section buttons
  editButton: Locator;
  saveButton: Locator;
  newExposureDetailButton: Locator;

  // Details of presents MCLR/EBLR tab
  detailsOfPresentsMclrEblrTab: Locator;
  mclrSection: Locator;
  mclrEditButton: Locator;
  mclrSaveButton: Locator;
  mclrAddNewRowButton: Locator;
  mclrCommentsEditor: Locator;
  
  // Alert locators
  successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.exposureWithOurBankLink = this.page.locator('a').filter({ hasText: 'Exposure with our bank' });
    
    // Section buttons - use title attribute for icon buttons
    this.editButton = this.page.locator('button[title="Edit"]').first();
    this.saveButton = this.page.locator('button[title="Save"]').first();
    this.newExposureDetailButton = this.page.getByRole('button', { name: 'New Exposure Detail' });

    // Details of presents MCLR/EBLR tab
    this.detailsOfPresentsMclrEblrTab = this.page.locator('li[data-bs-target="#detPresents"], #profile-tab').first();
    this.mclrSection = this.page.locator('#detPresents');
    this.mclrEditButton = this.mclrSection.locator('button[title="Edit"]');
    this.mclrSaveButton = this.mclrSection.locator('button[title="Save"]');
    this.mclrAddNewRowButton = this.mclrSection.getByRole('button', { name: /Add\s*New\s*Row/i });
    this.mclrCommentsEditor = this.mclrSection.locator('ckeditor[name="mclrComments"] .ck-content[contenteditable="true"]');
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert', { name: /success/i }).first();
  }

  // Navigate to Exposure with our bank page
  public async navigateToExposureWithOurBank() {
    await this.proposalDataEntryMenu.click();
    await this.exposureWithOurBankLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.exposureWithOurBankLink.click();
    
    // Wait for page to fully load - wait for the page heading or table to be visible
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000); // Additional wait for dynamic content
    console.log('Exposure with Our Bank page loaded');
  }

  // Click Edit button
  public async clickEdit() {
    // Wait for Edit button to be visible and enabled
    await this.editButton.waitFor({ state: 'visible', timeout: 10000 });
    
    // Check if button is disabled, wait for it to become enabled
    const isDisabled = await this.editButton.isDisabled();
    if (isDisabled) {
      console.log('Edit button is disabled, waiting for it to be enabled...');
      await this.page.waitForTimeout(2000);
    }
    
    await this.editButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked Edit button');
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked Save button');
  }

  // Click New Exposure Detail button to add a new row
  public async clickNewExposureDetail() {
    await this.newExposureDetailButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.newExposureDetailButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked New Exposure Detail button');
  }

  // Fill exposure details row
  public async fillExposureDetails(data: any, index: number = 0) {
    // Customer Name - dropdown with customer IDs
    if (data.customerName) {
      const customerNameDropdown = this.page.locator(`#ledCustId${index}`);
      await customerNameDropdown.waitFor({ state: 'visible', timeout: 10000 });
      const customerName = String(data.customerName);
      const customerOptions = await customerNameDropdown.locator('option').evaluateAll(options =>
        options.map(option => ({
          value: (option as HTMLOptionElement).value,
          label: option.textContent?.trim() || ''
        }))
      );
      const matchingOption = customerOptions.find(option => option.value === customerName || option.label === customerName);
      const optionToSelect = matchingOption || customerOptions.find(option => option.value && option.label !== '--Select--');
      if (!optionToSelect) throw new Error(`No customer options available for row ${index}`);
      await customerNameDropdown.selectOption(optionToSelect.value);
      console.log(`Selected Customer Name: ${optionToSelect.label} (${optionToSelect.value})`);
      await this.page.waitForTimeout(500);
    }
    
    // Party Type / Customer Type (B=Borrower, C=Co-Applicant, G=Promoters, PG=Personal Guarantor, CG=Corporate Guarantor, TG=Third Party, GC=Group Company)
    if (data.partyType) {
      const partyTypeDropdown = this.page.locator(`#ledPartyType${index}`);
      await partyTypeDropdown.selectOption(String(data.partyType));
      console.log(`Selected Party Type: ${data.partyType}`);
    }
    
    // Business Vertical (1=MSME, 7=Agri, 11=Retail, 22=Investment, 23=Treasury)
    if (data.businessVertical) {
      const divisionDropdown = this.page.locator(`#ledDivision${index}`);
      await divisionDropdown.selectOption(String(data.businessVertical));
      console.log(`Selected Business Vertical: ${data.businessVertical}`);
    }
    
    // Product/Facility - use product code
    if (data.product) {
      const productDropdown = this.page.locator(`#ledProduct${index}`);
      await productDropdown.selectOption(String(data.product));
      console.log(`Selected Product: ${data.product}`);
    }
    
    // Account Number - text input
    if (data.accountNo) {
      const accountNoField = this.page.locator(`#ledAccountNo${index}`);
      await accountNoField.fill(String(data.accountNo));
      console.log(`Filled Account No: ${data.accountNo}`);
    }
    
    // Sanction Limit - text input
    if (data.sancLimit) {
      const sancLimitField = this.page.locator(`#ledSancLimit${index}`);
      await sancLimitField.fill(String(data.sancLimit));
      console.log(`Filled Sanction Limit: ${data.sancLimit}`);
    }
    
    // Tenor in Months - text input
    if (data.tenor) {
      const tenorField = this.page.locator(`#ledTenor${index}`);
      await tenorField.fill(String(data.tenor));
      console.log(`Filled Tenor: ${data.tenor}`);
    }
    
    // ROI Type (10042=MCLR Rate, 10035=RBLR Rate, 10041=Repo Rate, 10038=Revised MCLR)
    if (data.roiType) {
      const roiTypeDropdown = this.page.locator(`#ledRoiType${index}`);
      await roiTypeDropdown.selectOption(String(data.roiType));
      console.log(`Selected ROI Type: ${data.roiType}`);
    }
    
    // ROI / Commission (Existing ROI) - text input
    if (data.existRoi) {
      const existRoiField = this.page.locator(`#ledExistRoi${index}`);
      await existRoiField.fill(String(data.existRoi));
      console.log(`Filled Existing ROI: ${data.existRoi}`);
    }
    
    // Spread Value - text input
    if (data.spreadValue) {
      const spreadField = this.page.locator(`#ledExistLmtSpread${index}`);
      await spreadField.fill(String(data.spreadValue));
      console.log(`Filled Spread Value: ${data.spreadValue}`);
    }
    
    // Margin % / Commission - text input
    if (data.commission) {
      const commissionField = this.page.locator(`#ledCommission${index}`);
      await commissionField.fill(String(data.commission));
      console.log(`Filled Commission: ${data.commission}`);
    }
    
    // Banking Arrangement (1=Sole, 2=Consortium, 3=Multiple Banking)
    if (data.bankArrangement) {
      const bankArrDropdown = this.page.locator(`#ledbnkArrangemant${index}`);
      await bankArrDropdown.selectOption(String(data.bankArrangement));
      console.log(`Selected Bank Arrangement: ${data.bankArrangement}`);
    }
    
    // Sanctioning Authority (1=MO, 10=ZO, 11=HO, 12=Group Head, 13=Branch Manager, etc.)
    if (data.sancAuthority) {
      const sancAuthDropdown = this.page.locator(`#ledSancAuthority${index}`);
      await sancAuthDropdown.selectOption(String(data.sancAuthority));
      console.log(`Selected Sanction Authority: ${data.sancAuthority}`);
    }
    
    // Sanction Date - date input (dd/mm/yyyy)
    if (data.sancDate) {
      const sancDateField = this.page.locator(`#ledSanctionDate${index}`);
      await sancDateField.fill(String(data.sancDate));
      console.log(`Filled Sanction Date: ${data.sancDate}`);
    }
    
    // Asset Classification (1=Standard, 2=Sub-Standard, 3=Doubtful-I, 4=Loss, 5=Wilful Defaulter, 6=Suit Filed, 7=SMA 0, 8=SMA 1, 9=SMA 2, 10=Doubtful-II)
    if (data.assetClassification) {
      const assetClassDropdown = this.page.locator(`#ledAssetClassification${index}`);
      await assetClassDropdown.selectOption(String(data.assetClassification));
      console.log(`Selected Asset Classification: ${data.assetClassification}`);
    }
    
    // Purpose of Loan (1=Business purpose, 2=Personal use/Debit consolidation)
    if (data.loanPurpose) {
      const loanPurposeDropdown = this.page.locator(`#ledLoanPurpose${index}`);
      await loanPurposeDropdown.selectOption(String(data.loanPurpose));
      console.log(`Selected Loan Purpose: ${data.loanPurpose}`);
    }
    
    // Outstanding Balance - text input
    if (data.osAmt) {
      const osAmtField = this.page.locator(`#ledOsAmt${index}`);
      await osAmtField.fill(String(data.osAmt));
      console.log(`Filled Outstanding Amount: ${data.osAmt}`);
    }
    
    // Outstanding as on - date input (dd/mm/yyyy)
    if (data.osDate) {
      const osDateField = this.page.locator(`#ledOsDate${index}`);
      await osDateField.fill(String(data.osDate));
      console.log(`Filled Outstanding Date: ${data.osDate}`);
    }
    
    // To be considered for approval - checkbox
    if (data.considerApprove) {
      const considerCheckbox = this.page.locator(`#ledConsiderApprve${index}`);
      await considerCheckbox.check();
      console.log('Checked Consider for Approval');
    }
    
    // Excess/Overdue (Y=Yes, N=No)
    if (data.excessOver) {
      const excessOverDropdown = this.page.locator(`#ledExcessover${index}`);
      await excessOverDropdown.selectOption(String(data.excessOver));
      console.log(`Selected Excess/Overdue: ${data.excessOver}`);
    }
    
    // Irregularities - textarea
    if (data.irregularities) {
      const irregularitiesField = this.page.locator(`#ledIrregularities${index}`);
      await irregularitiesField.fill(String(data.irregularities));
      console.log(`Filled Irregularities: ${data.irregularities}`);
    }
    
    const overdueAmtField = this.page.locator(`#ledOverDueAmount${index}`);
    const overdueSinceField = this.page.locator(`#ledOverdueSince${index}`);
    const excessOver = String(data.excessOver || '').toUpperCase();

    if (excessOver === 'Y') {
      if (data.overDueAmount) {
        await expect(overdueAmtField).toBeEnabled({ timeout: 5000 });
        await overdueAmtField.fill(String(data.overDueAmount));
        console.log(`Filled Overdue Amount: ${data.overDueAmount}`);
      }

      if (data.overdueSince) {
        await expect(overdueSinceField).toBeEnabled({ timeout: 5000 });
        await overdueSinceField.fill(String(data.overdueSince));
        console.log(`Filled Overdue Since: ${data.overdueSince}`);
      }
    } else if (excessOver === 'N') {
      await expect(overdueAmtField).toBeDisabled({ timeout: 5000 });
      await expect(overdueSinceField).toBeDisabled({ timeout: 5000 });
      console.log(`Overdue Amount and Overdue Since are disabled for row ${index}`);
    }
    
    // Show in Facility Table - Radio buttons (Y/N)
    if (data.showInFacilityTable) {
      const showInFacilityTableRadio = this.page.locator(`input#ledRenew${index}[value="${data.showInFacilityTable}"]`);
      if (await showInFacilityTableRadio.isEnabled()) {
        await showInFacilityTableRadio.check();
        console.log(`Selected Show in Facility Table: ${data.showInFacilityTable}`);
      } else {
        console.log(`Show in Facility Table is disabled for row ${index}, skipped selection`);
      }
    }
    
    console.log(`Filled exposure details for row ${index}`);
  }

  // Fill MCLR details
  public async fillMclrDetails(data: any, index: number = 0) {
    if (data.mclrPresent) {
      await this.page.locator(`#mclrPresent${index}`).fill(String(data.mclrPresent));
    }
    if (data.mclrResetDate) {
      await this.page.locator(`#mclrResetDate${index}`).fill(String(data.mclrResetDate));
    }
    if (data.sancAuthority) {
      await this.page.locator('#mclrSancAuthority').fill(String(data.sancAuthority));
    }
    if (data.asset) {
      await this.page.locator('#mclrAsset').selectOption(String(data.asset));
    }
    if (data.status) {
      await this.page.locator('#mclrStatus').selectOption(String(data.status));
    }
  }

  // Click Details of presents MCLR/EBLR tab
  public async clickDetailsOfPresentsMclrEblrTab() {
    await this.detailsOfPresentsMclrEblrTab.waitFor({ state: 'visible', timeout: 10000 });
    await this.detailsOfPresentsMclrEblrTab.click();
    await this.mclrSection.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.mclrSection).toHaveClass(/active/, { timeout: 10000 });
    console.log('Clicked Details of presents MCLR/EBLR tab');
  }

  // Click MCLR Edit button
  public async clickMclrEdit() {
    await this.mclrEditButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.mclrEditButton).toBeEnabled({ timeout: 10000 });
    await this.mclrEditButton.click();
    await expect(this.mclrSaveButton).toBeEnabled({ timeout: 10000 });
    console.log('Clicked MCLR Edit button');
  }

  // Click MCLR Save button
  public async clickMclrSave() {
    await this.mclrSaveButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.mclrSaveButton).toBeEnabled({ timeout: 10000 });
    await this.mclrSaveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked MCLR Save button');
  }

  // Click MCLR Add New Row button
  public async clickMclrAddNewRow() {
    await this.mclrAddNewRowButton.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.mclrAddNewRowButton).toBeEnabled({ timeout: 10000 });
    await this.mclrAddNewRowButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked MCLR Add New Row button');
  }

  // Fill MCLR/EBLR table row
  public async fillMclrRow(data: any, index: number = 0) {
    const presentMclrField = this.mclrSection.locator(`#mclrPresent${index}`);
    await presentMclrField.waitFor({ state: 'visible', timeout: 10000 });
    await expect(presentMclrField).toBeEnabled({ timeout: 10000 });

    if (data.mclrPresent) {
      await presentMclrField.fill(String(data.mclrPresent));
      console.log(`Filled Present MCLR/EBLR: ${data.mclrPresent}`);
    }

    if (data.mclrApplicableSince) {
      const applicableSinceField = this.mclrSection.locator(`#mclrApplicableSince${index}`);
      await applicableSinceField.fill(String(data.mclrApplicableSince));
      console.log(`Filled Applicable Since: ${data.mclrApplicableSince}`);
    }

    if (data.mclrIcNo) {
      const icNoField = this.mclrSection.locator(`#mclrIcNo${index}`);
      await icNoField.fill(String(data.mclrIcNo));
      console.log(`Filled As per IC no.: ${data.mclrIcNo}`);
    }

    if (data.mclrResetDate) {
      const resetDateField = this.mclrSection.locator(`#mclrResetDate${index}`);
      await resetDateField.fill(String(data.mclrResetDate));
      console.log(`Filled Reset Date: ${data.mclrResetDate}`);
    }

    console.log(`Filled MCLR/EBLR row ${index}`);
  }

  // Fill MCLR delegated authority section
  public async fillMclrDelegatedAuthority(data: any) {
    if (data.mclrComments) {
      await this.mclrCommentsEditor.waitFor({ state: 'visible', timeout: 10000 });
      await this.mclrCommentsEditor.fill(String(data.mclrComments));
      console.log(`Filled MCLR Comments: ${data.mclrComments}`);
    }

    if (data.mclrDateOfSanction) {
      const dateOfSanctionField = this.mclrSection.locator('#mclrDateOfSanction');
      await dateOfSanctionField.fill(String(data.mclrDateOfSanction));
      console.log(`Filled Date of sanction / Last review: ${data.mclrDateOfSanction}`);
    }

    if (data.mclrSancAuthority) {
      const sancAuthorityField = this.mclrSection.locator('#mclrSancAuthority');
      await sancAuthorityField.fill(String(data.mclrSancAuthority));
      console.log(`Filled Sanctioning authority: ${data.mclrSancAuthority}`);
    }

    if (data.mclrDueDate) {
      const dueDateField = this.mclrSection.locator('#mclrDueDate');
      await dueDateField.fill(String(data.mclrDueDate));
      console.log(`Filled Due date of review: ${data.mclrDueDate}`);
    }

    if (data.mclrAsset) {
      const assetDropdown = this.mclrSection.locator('#mclrAsset');
      await assetDropdown.selectOption(String(data.mclrAsset));
      console.log(`Selected MCLR Asset classification: ${data.mclrAsset}`);
    }

    if (data.mclrStatus) {
      const statusDropdown = this.mclrSection.locator('#mclrStatus');
      await statusDropdown.selectOption(String(data.mclrStatus));
      console.log(`Selected MCLR Status of account: ${data.mclrStatus}`);
    }

    console.log('Filled MCLR Delegated Authority');
  }

  // Delete MCLR/EBLR table row
  public async deleteMclrRow(index: number = 1) {
    const row = this.mclrSection.locator('table.width1500 tbody tr').nth(index);
    await row.waitFor({ state: 'visible', timeout: 10000 });
    const deleteButton = row.locator('button.btn-danger').first();
    await expect(deleteButton).toBeEnabled({ timeout: 10000 });

    this.page.once('dialog', async dialog => {
      console.log(`MCLR delete confirmation: ${dialog.message()}`);
      await dialog.accept();
    });

    await deleteButton.click();
    await this.page.waitForTimeout(1000);
    console.log(`Deleted MCLR/EBLR row ${index}`);
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await expect(this.successAlert).toBeVisible({ timeout: 5000 });
  }
}
