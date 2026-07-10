import { Locator, Page, expect } from "@playwright/test";

export class ExposureNormsPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  exposureNormsLink: Locator;
  
  // Action buttons
  editButton: Locator;
  saveButton: Locator;
  fetchExposureValueButton: Locator;
  
  // Radio buttons (Yes/No options)
  tierYes: Locator;
  tierNo: Locator;
  interdependenceYes: Locator;
  interdependenceNo: Locator;
  borrowerYes: Locator;
  borrowerNo: Locator;
  delegationYes: Locator;
  delegationNo: Locator;
  exposureYesFirst: Locator;
  exposureYesSecond: Locator;
  industryYes: Locator;
  industryNo: Locator;
  
  // Rich text editors
  editor1: Locator;
  editor2: Locator;
  editor3: Locator;
  editor4: Locator;
  
  // Standard Classification fields
  lecStandardNoOfAcs: Locator;
  lecStandardFundBased: Locator;
  lecStandardNonFundBased: Locator;
  
  // Sub-Standard Classification fields
  subStandardNoOfAcs: Locator;
  lecSubStandardFundBased: Locator;
  lecSubStandardNonFundBased: Locator;
  
  // Doubtful Classification fields
  lecDoubtfulNoOfAcs: Locator;
  lecDoubtfulFundBased: Locator;
  lecDoubtfulNonFundBased: Locator;
  
  // Loss Classification fields
  lecLossNoOfAcs: Locator;
  lecLossFundBased: Locator;
  lecLossNonFundBased: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.exposureNormsLink = this.page.locator('a').filter({ hasText: 'Exposure Norms' });
    
    // Action buttons
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.fetchExposureValueButton = this.page.getByRole('button', { name: 'Fetch Exposure Value' });
    
    // Radio buttons
    this.tierYes = this.page.locator('#tierYes');
    this.tierNo = this.page.locator('#tierNo');
    this.interdependenceYes = this.page.locator('#interdependenceYes');
    this.interdependenceNo = this.page.locator('#interdependenceNo');
    this.borrowerYes = this.page.locator('#borrowerYes');
    this.borrowerNo = this.page.locator('#borrowerNo');
    this.delegationYes = this.page.locator('#delegationYes');
    this.delegationNo = this.page.locator('#delegationNo');
    this.exposureYesFirst = this.page.locator('#exposureYes').first();
    this.exposureYesSecond = this.page.locator('#exposureYes').nth(1);
    this.industryYes = this.page.locator('#IndustryYes');
    this.industryNo = this.page.locator('#IndustryNo');
    
    // Rich text editors
    this.editor1 = this.page.locator('#Editor1').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    this.editor2 = this.page.locator('#Editor2').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    this.editor3 = this.page.locator('#Editor3').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    this.editor4 = this.page.locator('#Editor4').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Standard Classification
    this.lecStandardNoOfAcs = this.page.locator('#lecStandardNoOfAcs');
    this.lecStandardFundBased = this.page.locator('#lecStandardFundBased');
    this.lecStandardNonFundBased = this.page.locator('#lecStandardNonFundBased');
    
    // Sub-Standard Classification
    this.subStandardNoOfAcs = this.page.locator('#subStandardNoOfAcs');
    this.lecSubStandardFundBased = this.page.locator('#lecSubStandardFundBased');
    this.lecSubStandardNonFundBased = this.page.locator('#lecSubStandardNonFundBased');
    
    // Doubtful Classification
    this.lecDoubtfulNoOfAcs = this.page.locator('#lecDoubtfulNoOfAcs');
    this.lecDoubtfulFundBased = this.page.locator('#lecDoubtfulFundBased');
    this.lecDoubtfulNonFundBased = this.page.locator('#lecDoubtfulNonFundBased');
    
    // Loss Classification
    this.lecLossNoOfAcs = this.page.locator('input[name="lecLossNoOfAcs"]');
    this.lecLossFundBased = this.page.locator('#lecLossFundBased');
    this.lecLossNonFundBased = this.page.locator('#lecLossNonFundBased');
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Exposure Norms page
  public async navigateToExposureNorms() {
    await this.proposalDataEntryMenu.click();
    await this.exposureNormsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.exposureNormsLink.click();
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.click();
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.click();
  }

  // Click Fetch Exposure Value button
  public async clickFetchExposureValue() {
    await this.fetchExposureValueButton.click();
  }

  // Fill exposure norms details
  public async fillExposureNormsDetails(data: any) {
    // Tier option
    if (data.tier === 'Yes' || data.tier === true) {
      await this.tierYes.check();
    } else if (data.tier === 'No' || data.tier === false) {
      await this.tierNo.check();
    }
    
    // Interdependence option
    if (data.interdependence === 'Yes' || data.interdependence === true) {
      await this.interdependenceYes.check();
    }
    
    // Borrower option
    if (data.borrower === 'Yes' || data.borrower === true) {
      await this.borrowerYes.check();
    }
    
    // Delegation option
    if (data.delegation === 'Yes' || data.delegation === true) {
      await this.delegationYes.check();
    }
    
    // Exposure option (first)
    if (data.exposureFirst === 'Yes' || data.exposureFirst === true) {
      await this.exposureYesFirst.check();
    }
    
    // Industry option
    if (data.industry === 'Yes' || data.industry === true) {
      await this.industryYes.check();
    }
    
    // Exposure option (second)
    if (data.exposureSecond === 'Yes' || data.exposureSecond === true) {
      await this.exposureYesSecond.check();
    }
  }

  // Fill classification table data
  public async fillClassificationData(data: any) {
    // Standard
    if (data.standardNoOfAcs) {
      await this.lecStandardNoOfAcs.click();
      await this.lecStandardNoOfAcs.fill(String(data.standardNoOfAcs));
    }
    if (data.standardFundBased) {
      await this.lecStandardFundBased.click();
      await this.lecStandardFundBased.fill(String(data.standardFundBased));
    }
    if (data.standardNonFundBased) {
      await this.lecStandardNonFundBased.click();
      await this.lecStandardNonFundBased.fill(String(data.standardNonFundBased));
    }
    
    // Sub-Standard
    if (data.subStandardNoOfAcs) {
      await this.subStandardNoOfAcs.click();
      await this.subStandardNoOfAcs.fill(String(data.subStandardNoOfAcs));
    }
    if (data.subStandardFundBased) {
      await this.lecSubStandardFundBased.click();
      await this.lecSubStandardFundBased.fill(String(data.subStandardFundBased));
    }
    if (data.subStandardNonFundBased) {
      await this.lecSubStandardNonFundBased.click();
      await this.lecSubStandardNonFundBased.fill(String(data.subStandardNonFundBased));
    }
    
    // Doubtful
    if (data.doubtfulNoOfAcs) {
      await this.lecDoubtfulNoOfAcs.click();
      await this.lecDoubtfulNoOfAcs.fill(String(data.doubtfulNoOfAcs));
    }
    if (data.doubtfulFundBased) {
      await this.lecDoubtfulFundBased.click();
      await this.lecDoubtfulFundBased.fill(String(data.doubtfulFundBased));
    }
    if (data.doubtfulNonFundBased) {
      await this.lecDoubtfulNonFundBased.click();
      await this.lecDoubtfulNonFundBased.fill(String(data.doubtfulNonFundBased));
    }
    
    // Loss
    if (data.lossNoOfAcs) {
      await this.lecLossNoOfAcs.click();
      await this.lecLossNoOfAcs.fill(String(data.lossNoOfAcs));
    }
    if (data.lossFundBased) {
      await this.lecLossFundBased.click();
      await this.lecLossFundBased.fill(String(data.lossFundBased));
    }
    if (data.lossNonFundBased) {
      await this.lecLossNonFundBased.click();
      await this.lecLossNonFundBased.fill(String(data.lossNonFundBased));
    }
  }

  // Fill remarks in editors
  public async fillRemarks(editor2Text?: string, editor3Text?: string) {
    if (editor2Text) {
      await this.editor2.click();
      await this.editor2.fill(editor2Text);
    }
    if (editor3Text) {
      await this.editor3.click();
      await this.editor3.fill(editor3Text);
    }
  }

  // Save and verify success
  public async saveAndVerify() {
    await this.clickSave();
    await this.page.waitForTimeout(1000);
    await this.verifySuccessAlert();
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await expect(this.successAlert).toBeVisible({ timeout: 10000 });
  }

  // Verify error alert
  public async verifyErrorAlert() {
    await expect(this.errorAlert).toBeVisible({ timeout: 5000 });
  }
}
