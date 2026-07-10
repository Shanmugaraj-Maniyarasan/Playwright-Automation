import { Locator, Page, expect } from "@playwright/test";

export class ValueOfAccountMsmePage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  valueOfAccountLink: Locator;
  
  // Action buttons
  editButton: Locator;
  saveButton: Locator;
  deleteButton: Locator;
  
  // Previous Year Fields
  prevAdvFromDate: Locator;
  prevAdvToDate: Locator;
  prevIncome: Locator;
  prevFee: Locator;
  
  // Current Year Fields
  currAdvFromDate: Locator;
  currAdvToDate: Locator;
  currIncome: Locator;
  currFee: Locator;
  currAcc2: Locator;
  currAmount2: Locator;
  currOwnAmt: Locator;
  currTrdAmt: Locator;
  currOwnTenure: Locator;
  currTrdTenure: Locator;
  
  // Rich text editors
  editor1: Locator;
  editor2: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.valueOfAccountLink = this.page.locator('a').filter({ hasText: 'Value of AccountMSME' });
    
    // Action buttons
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' });
    
    // Previous Year Fields
    this.prevAdvFromDate = this.page.locator('#lvoaPrevAdvFrm');
    this.prevAdvToDate = this.page.locator('#lvoaPrevAdvTo');
    this.prevIncome = this.page.locator('#lvoaPrevIncome');
    this.prevFee = this.page.locator('#lvoaPrevFee');
    
    // Current Year Fields
    this.currAdvFromDate = this.page.locator('#lvoaCurrAdvFrm');
    this.currAdvToDate = this.page.locator('#lvoaCurrAdvTo');
    this.currIncome = this.page.locator('#lvoaCurrIncome');
    this.currFee = this.page.locator('#lvoaCurrFee');
    this.currAcc2 = this.page.locator('input[name="lvoaCurrAcc2"]');
    this.currAmount2 = this.page.locator('#lvoaCurrAmount2');
    this.currOwnAmt = this.page.locator('#lvoaCurrOwnAmt');
    this.currTrdAmt = this.page.locator('#lvoaCurrTrdAmt');
    this.currOwnTenure = this.page.locator('#lvoaCurrOwnTenure');
    this.currTrdTenure = this.page.locator('#lvoaCurrTrdTenure');
    
    // Rich text editors
    this.editor1 = this.page.locator('#Editor').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    this.editor2 = this.page.locator('#Editor2').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Value of Account MSME page
  public async navigateToValueOfAccountMsme() {
    await this.proposalDataEntryMenu.click();
    await this.valueOfAccountLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.valueOfAccountLink.click();
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.click();
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.click();
  }

  // Click Delete button (handles confirmation dialog)
  public async clickDelete() {
    this.page.once('dialog', dialog => {
      dialog.accept().catch(() => {});
    });
    await this.deleteButton.click();
  }

  // Select date from date picker (year, month, day)
  private async selectDateFromPicker(year: string, month: string, day: string) {
    // Click year button
    await this.page.getByRole('button', { name: '2026' }).click();
    await this.page.getByText(year, { exact: true }).click();
    
    // Click month
    await this.page.getByText(month).click();
    
    // Click day
    await this.page.getByText(day, { exact: true }).first().click();
  }

  // Fill Previous Year Advance From Date
  public async fillPrevAdvFromDate(year: string, month: string, day: string) {
    await this.prevAdvFromDate.click();
    await this.selectDateFromPicker(year, month, day);
  }

  // Fill Previous Year Advance To Date
  public async fillPrevAdvToDate(year: string, month: string, day: string) {
    await this.prevAdvToDate.click();
    await this.selectDateFromPicker(year, month, day);
  }

  // Fill Current Year Advance From Date
  public async fillCurrAdvFromDate(year: string, month: string, day: string) {
    await this.currAdvFromDate.click();
    await this.selectDateFromPicker(year, month, day);
  }

  // Fill Current Year Advance To Date
  public async fillCurrAdvToDate(year: string, month: string, day: string) {
    await this.currAdvToDate.click();
    await this.selectDateFromPicker(year, month, day);
  }

  // Fill all Value of Account fields
  public async fillValueOfAccountDetails(data: any) {
    // Previous Year Fields
    if (data.prevAdvFromDate) {
      const [year, month, day] = data.prevAdvFromDate.split('/');
      await this.fillPrevAdvFromDate(year, month, day);
    }
    
    if (data.prevAdvToDate) {
      const [year, month, day] = data.prevAdvToDate.split('/');
      await this.fillPrevAdvToDate(year, month, day);
    }
    
    if (data.prevIncome) {
      await this.prevIncome.click();
      await this.prevIncome.fill(String(data.prevIncome));
    }
    
    if (data.prevFee) {
      await this.prevFee.click();
      await this.prevFee.fill(String(data.prevFee));
    }
    
    // Current Year Fields
    if (data.currAdvFromDate) {
      const [year, month, day] = data.currAdvFromDate.split('/');
      await this.fillCurrAdvFromDate(year, month, day);
    }
    
    if (data.currAdvToDate) {
      const [year, month, day] = data.currAdvToDate.split('/');
      await this.fillCurrAdvToDate(year, month, day);
    }
    
    if (data.currIncome) {
      await this.currIncome.click();
      await this.currIncome.fill(String(data.currIncome));
    }
    
    if (data.currFee) {
      await this.currFee.click();
      await this.currFee.fill(String(data.currFee));
    }
    
    if (data.currAcc2) {
      await this.currAcc2.click();
      await this.currAcc2.fill(String(data.currAcc2));
    }
    
    if (data.currAmount2) {
      await this.currAmount2.click();
      await this.currAmount2.fill(String(data.currAmount2));
    }
    
    if (data.currOwnAmt) {
      await this.currOwnAmt.click();
      await this.currOwnAmt.fill(String(data.currOwnAmt));
    }
    
    if (data.currTrdAmt) {
      await this.currTrdAmt.click();
      await this.currTrdAmt.fill(String(data.currTrdAmt));
    }
    
    if (data.currOwnTenure) {
      await this.currOwnTenure.click();
      await this.currOwnTenure.fill(String(data.currOwnTenure));
    }
    
    if (data.currTrdTenure) {
      await this.currTrdTenure.click();
      await this.currTrdTenure.fill(String(data.currTrdTenure));
    }
    
    // Rich text editors
    if (data.remarks1) {
      await this.editor1.click();
      await this.editor1.fill(data.remarks1);
    }
    
    if (data.remarks2) {
      await this.editor2.click();
      await this.editor2.fill(data.remarks2);
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
