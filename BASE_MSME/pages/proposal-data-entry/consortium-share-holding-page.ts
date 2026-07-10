import { Locator, Page, expect } from "@playwright/test";

export class ConsortiumShareHoldingPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  consortiumLink: Locator;
  
  // Action buttons (multiple Edit/Save/Add buttons on page)
  termLoanEditButton: Locator;
  termLoanSaveButton: Locator;
  termLoanAddNewButton: Locator;
  
  workingCapitalEditButton: Locator;
  workingCapitalSaveButton: Locator;
  workingCapitalAddNewButton: Locator;
  
  // Rich text editor
  remarksEditor: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.consortiumLink = this.page.locator('a').filter({ hasText: 'Consortium and Share holding' });
    
    // Term Loan section buttons (second set - index 1)
    this.termLoanEditButton = this.page.getByRole('button', { name: 'Edit' }).nth(1);
    this.termLoanSaveButton = this.page.getByRole('button', { name: 'Save' }).nth(1);
    this.termLoanAddNewButton = this.page.getByRole('button', { name: 'Add New' }).nth(1);
    
    // Working Capital section buttons
    this.workingCapitalEditButton = this.page.getByRole('button', { name: 'Edit' }).nth(2);
    this.workingCapitalSaveButton = this.page.getByRole('button', { name: 'Save' }).nth(2);
    this.workingCapitalAddNewButton = this.page.locator('div').filter({ hasText: /^Share Holding Pattern for Working CapitalAdd New$/ }).getByRole('button');
    
    // Rich text editor
    this.remarksEditor = this.page.locator('#Editor1').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Consortium and Share Holding page
  public async navigateToConsortiumShareHolding() {
    await this.proposalDataEntryMenu.click();
    await this.consortiumLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.consortiumLink.click();
  }

  // ============ TERM LOAN SECTION ============

  // Click Edit for Term Loan section
  public async clickTermLoanEdit() {
    await this.termLoanEditButton.click();
  }

  // Click Save for Term Loan section
  public async clickTermLoanSave() {
    await this.termLoanSaveButton.click();
  }

  // Click Add New for Term Loan section
  public async clickTermLoanAddNew() {
    await this.termLoanAddNewButton.click();
  }

  // Get Term Loan row locators by index
  private getTermLoanRowLocators(index: number) {
    return {
      bankName: this.page.locator(`#lshpBankName${index}`),
      limit: this.page.locator(`#lshpLimit${index}`),
      dateCell: this.page.getByRole('row').nth(index + 1).getByRole('textbox').nth(1),
      percentage: this.page.locator(`#lshpPercentage${index}`),
    };
  }

  // Fill Term Loan row data
  public async fillTermLoanRow(data: any, index: number) {
    const fields = this.getTermLoanRowLocators(index);
    
    // Bank Name (select option by value or label)
    if (data.bankName) {
      await fields.bankName.selectOption(String(data.bankName));
    }
    
    // Limit
    if (data.limit) {
      await fields.limit.click();
      await fields.limit.fill(String(data.limit));
    }
    
    // Date
    if (data.date) {
      await fields.dateCell.click();
      await this.page.getByText(String(data.date), { exact: true }).first().click();
    }
    
    // Percentage
    if (data.percentage) {
      await fields.percentage.click();
      await fields.percentage.fill(String(data.percentage));
    }
  }

  // Add multiple Term Loan rows
  public async addTermLoanRows(dataArray: any[]) {
    await this.clickTermLoanEdit();
    await this.page.waitForTimeout(500);
    
    for (let i = 0; i < dataArray.length; i++) {
      if (i > 0) {
        await this.clickTermLoanAddNew();
        await this.page.waitForTimeout(300);
      }
      await this.fillTermLoanRow(dataArray[i], i);
    }
    
    await this.clickTermLoanSave();
  }

  // ============ WORKING CAPITAL SECTION ============

  // Click Edit for Working Capital section
  public async clickWorkingCapitalEdit() {
    await this.workingCapitalEditButton.click();
  }

  // Click Save for Working Capital section
  public async clickWorkingCapitalSave() {
    await this.workingCapitalSaveButton.click();
  }

  // Click Add New for Working Capital section
  public async clickWorkingCapitalAddNew() {
    await this.workingCapitalAddNewButton.click();
  }

  // Get Working Capital row locators by index
  private getWorkingCapitalRowLocators(index: number) {
    return {
      bankName: this.page.getByRole('cell', { name: '<-- Select -->' }).getByRole('combobox'),
      limit: this.page.locator(`#lshpLimitWC${index}`).or(
        this.page.getByRole('row').filter({ hasText: 'Union Bank' }).getByRole('textbox').first()
      ),
      dateCell: this.page.getByRole('row').filter({ hasText: 'Union Bank' }).getByRole('textbox').nth(1),
      percentage: this.page.locator(`#lshpPercentageWC${index}`),
    };
  }

  // Fill Working Capital row data by row name
  public async fillWorkingCapitalRow(data: any, bankRowName: string, index: number = 0) {
    const row = this.page.getByRole('row', { name: bankRowName });
    
    // Bank Name - select from dropdown if it's the first/new row
    if (data.bankCode) {
      await this.page.getByRole('cell', { name: '<-- Select -->' }).getByRole('combobox').selectOption(data.bankCode);
    }
    
    // Limit
    if (data.limit) {
      await row.getByRole('textbox').first().click();
      await row.getByRole('textbox').first().fill(String(data.limit));
    }
    
    // Date
    if (data.date) {
      await row.getByRole('textbox').nth(1).click();
      await this.page.getByText(String(data.date), { exact: true }).first().click();
    }
    
    // Percentage
    if (data.percentage) {
      await this.page.locator(`#lshpPercentageWC${index}`).click();
      await this.page.locator(`#lshpPercentageWC${index}`).fill(String(data.percentage));
    }
  }

  // Add Working Capital entry
  public async addWorkingCapitalEntry(data: any, index: number = 0) {
    // Select bank
    if (data.bankCode) {
      await this.page.getByRole('cell', { name: '<-- Select -->' }).getByRole('combobox').selectOption(data.bankCode);
    }
    
    // Dynamically find the row based on expected bank name
    const bankNames: { [key: string]: string } = {
      'UBI': 'Union Bank of India',
      '1': 'SBI',
      '2': 'CBI',
      '3': 'CANARA',
    };
    
    const bankDisplayName = bankNames[data.bankCode] || data.bankCode;
    const row = this.page.getByRole('row', { name: new RegExp(bankDisplayName, 'i') });
    
    // Limit
    if (data.limit) {
      await row.getByRole('textbox').first().click();
      await row.getByRole('textbox').first().fill(String(data.limit));
    }
    
    // Date
    if (data.date) {
      await row.getByRole('textbox').nth(1).click();
      await this.page.getByText(String(data.date), { exact: true }).click();
    }
    
    // Percentage
    if (data.percentage) {
      await this.page.locator(`#lshpPercentageWC${index}`).click();
      await this.page.locator(`#lshpPercentageWC${index}`).fill(String(data.percentage));
    }
  }

  // Fill remarks in Rich Text Editor
  public async fillRemarks(text: string) {
    await this.remarksEditor.click();
    await this.remarksEditor.fill(text);
  }

  // Save and verify success
  public async saveAndVerify() {
    await this.termLoanSaveButton.click();
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
