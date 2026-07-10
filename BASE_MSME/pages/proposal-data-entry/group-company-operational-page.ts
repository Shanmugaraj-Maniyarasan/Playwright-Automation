import { Locator, Page, expect } from "@playwright/test";

export class GroupCompanyOperationalPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  groupCompanyOperationalLink: Locator;
  
  // Action buttons
  editButton: Locator;
  saveButton: Locator;
  addButton: Locator;
  closeButton: Locator;
  
  // Rich text editors
  remarkEditor: Locator;
  commentOtherBankEditor: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.groupCompanyOperationalLink = this.page.locator('a').filter({ hasText: 'Group Company Operational' });
    
    // Action buttons
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.addButton = this.page.getByRole('button', { name: '' });
    this.closeButton = this.page.getByRole('button', { name: 'Close' });
    
    // Rich text editors
    this.remarkEditor = this.page.locator('#lgcRemark').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    this.commentOtherBankEditor = this.page.locator('#lgcCommentOtherbank').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Group Company Operational page
  public async navigateToGroupCompanyOperational() {
    await this.proposalDataEntryMenu.click();
    await this.groupCompanyOperationalLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.groupCompanyOperationalLink.click();
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.click();
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.click();
  }

  // Click Add button (opens modal/popup)
  public async clickAdd() {
    await this.addButton.click();
  }

  // Click Close button
  public async clickClose() {
    await this.closeButton.click();
  }

  // Get row locators by index
  private getRowLocators(index: number) {
    return {
      nameOfCompany: this.page.locator(`#lgcNameofcompany${index}`),
      branchName: this.page.locator(`#lgcBranchname${index}`),
      conductOfAmount: this.page.locator(`#lgcConductofamount${index}`),
      typeOfLoan: this.page.locator(`#lgcTypeofloan${index}`),
      investments: this.page.locator(`#lgcInvestments${index}`),
      presentIrregularity: this.page.locator(`#lgcPresentIrregularity${index}`),
      nextReviewDate: this.page.locator(`#lgcNextReviewdate${index}`),
      // The percentage field uses getByRole
      percentage: this.page.getByRole('textbox', { name: '.', exact: true }),
    };
  }

  // Fill group company details
  public async fillGroupCompanyDetails(data: any, index: number = 0) {
    const fields = this.getRowLocators(index);
    
    // Name of Company
    if (data.nameOfCompany) {
      await fields.nameOfCompany.click();
      await fields.nameOfCompany.fill(String(data.nameOfCompany));
    }
    
    // Branch Name
    if (data.branchName) {
      await fields.branchName.click();
      await fields.branchName.fill(String(data.branchName));
    }
    
    // Conduct of Amount
    if (data.conductOfAmount) {
      await fields.conductOfAmount.click();
      await fields.conductOfAmount.fill(String(data.conductOfAmount));
    }
    
    // Type of Loan
    if (data.typeOfLoan) {
      await fields.typeOfLoan.click();
      await fields.typeOfLoan.fill(String(data.typeOfLoan));
    }
    
    // Percentage / Rating (decimal field)
    if (data.percentage) {
      await fields.percentage.click();
      await fields.percentage.fill(String(data.percentage));
    }
    
    // Investments
    if (data.investments) {
      await this.page.locator(`#lgcInvestments${index}`).click();
      await fields.percentage.fill(String(data.investments));
    }
    
    // Present Irregularity
    if (data.presentIrregularity) {
      await fields.presentIrregularity.click();
      await fields.presentIrregularity.fill(String(data.presentIrregularity));
    }
    
    // Next Review Date (date picker)
    if (data.nextReviewDate) {
      await fields.nextReviewDate.click();
      await this.page.waitForTimeout(300);
      // Select date from picker
      const day = data.nextReviewDate.split('/')[0] || data.nextReviewDate;
      await this.page.getByText(String(day), { exact: true }).click();
    }
  }

  // Fill remarks in editors
  public async fillRemarks(remarkText?: string, commentOtherBankText?: string) {
    if (remarkText) {
      await this.remarkEditor.click();
      await this.remarkEditor.fill(remarkText);
    }
    if (commentOtherBankText) {
      await this.commentOtherBankEditor.click();
      await this.commentOtherBankEditor.fill(commentOtherBankText);
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
