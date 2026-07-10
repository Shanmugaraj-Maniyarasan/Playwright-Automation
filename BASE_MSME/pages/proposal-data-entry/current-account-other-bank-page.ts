import { Locator, Page, expect } from "@playwright/test";

export class CurrentAccountOtherBankPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  currentAccountOtherBankLink: Locator;
  
  // Action buttons
  editButton: Locator;
  saveButton: Locator;
  addNewRowButton: Locator;
  
  // Radio buttons
  yesRadio: Locator;
  noRadio: Locator;
  
  // Rich text editor
  remarksEditor: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.currentAccountOtherBankLink = this.page.locator('a').filter({ hasText: 'Current Account With Other' });
    
    // Action buttons
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.addNewRowButton = this.page.getByRole('button', { name: 'Add New Row' });
    
    // Radio buttons
    this.yesRadio = this.page.getByRole('radio', { name: 'Yes No' });
    this.noRadio = this.page.getByRole('radio', { name: 'No' });
    
    // Rich text editor
    this.remarksEditor = this.page.getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Current Account With Other Bank page
  public async navigateToCurrentAccountOtherBank() {
    await this.proposalDataEntryMenu.click();
    await this.currentAccountOtherBankLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.currentAccountOtherBankLink.click();
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.click();
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.click();
  }

  // Click Add New Row button
  public async clickAddNewRow() {
    await this.addNewRowButton.click();
  }

  // Select Yes option
  public async selectYes() {
    await this.yesRadio.check();
  }

  // Select No option
  public async selectNo() {
    await this.noRadio.check();
  }

  // Get row locators by index (for first row)
  private getFirstRowLocators() {
    return {
      bankDropdown: this.page.getByRole('cell', { name: '--Select--' }).getByRole('combobox'),
      accountNumber: this.page.getByRole('textbox', { name: 'Only numbers allowed' }),
      dateField: this.page.getByRole('textbox', { name: 'dd/mm/yyyy' }),
      reason: this.page.locator('#lacReason0'),
    };
  }

  // Get row locators by bank name (for subsequent rows)
  private getRowLocatorsByBankName(bankName: string, index: number) {
    const row = this.page.getByRole('row', { name: new RegExp(bankName, 'i') });
    return {
      accountNumber: row.getByPlaceholder('Enter Account Number'),
      dateField: row.getByPlaceholder('dd/mm/yyyy'),
      reason: this.page.locator(`#lacReason${index}`),
    };
  }

  // Fill first row details
  public async fillFirstRowDetails(data: any) {
    const fields = this.getFirstRowLocators();
    
    // Bank selection
    if (data.bankCode) {
      await fields.bankDropdown.selectOption(String(data.bankCode));
    }
    
    // Account Number
    if (data.accountNumber) {
      await fields.accountNumber.fill(String(data.accountNumber));
    }
    
    // Date (date picker)
    if (data.date) {
      await fields.dateField.click();
      await this.page.waitForTimeout(300);
      // Select from calendar
      const day = data.date.split('/')[0] || data.date;
      await this.page.getByRole('gridcell', { name: String(day) }).first().click();
    }
    
    // Reason
    if (data.reason) {
      await fields.reason.click();
      await fields.reason.fill(String(data.reason));
    }
  }

  // Fill additional row details (after clicking Add New Row)
  public async fillAdditionalRowDetails(data: any, bankName: string, index: number) {
    // Select bank from dropdown for new row
    if (data.bankCode) {
      await this.page.getByRole('cell', { name: '--Select--' }).getByRole('combobox').selectOption(String(data.bankCode));
    }
    
    const fields = this.getRowLocatorsByBankName(bankName, index);
    
    // Account Number
    if (data.accountNumber) {
      await fields.accountNumber.fill(String(data.accountNumber));
    }
    
    // Date (date picker with year/month navigation)
    if (data.date) {
      await fields.dateField.click();
      await this.page.waitForTimeout(300);
      
      // Parse date: expected format yyyy/Month/dd or dd/mm/yyyy
      const dateParts = data.date.split('/');
      if (dateParts.length === 3) {
        // If year navigation needed
        if (data.year) {
          await this.page.getByRole('button', { name: '2026' }).click();
          await this.page.getByText(String(data.year), { exact: true }).click();
        }
        if (data.month) {
          await this.page.getByText(String(data.month), { exact: true }).click();
        }
        // Click day
        await this.page.getByText(String(dateParts[0] || dateParts[2]), { exact: true }).click();
      }
    }
    
    // Reason
    if (data.reason) {
      await fields.reason.click();
      await fields.reason.fill(String(data.reason));
    }
  }

  // Fill account details with date navigation (year, month, day)
  public async fillAccountWithFullDate(data: any, index: number, year?: string, month?: string, day?: string) {
    // For rows after first, use bank name pattern
    if (index > 0 && data.bankName) {
      const row = this.page.getByRole('row', { name: new RegExp(data.bankName, 'i') });
      
      // Account Number
      if (data.accountNumber) {
        await row.getByPlaceholder('Enter Account Number').fill(String(data.accountNumber));
      }
      
      // Date picker with full navigation
      await row.getByPlaceholder('dd/mm/yyyy').click();
      await this.page.waitForTimeout(300);
      
      if (year) {
        await this.page.getByRole('button', { name: '2026' }).click();
        await this.page.getByText(year, { exact: true }).click();
      }
      if (month) {
        await this.page.getByText(month, { exact: true }).click();
      }
      if (day) {
        await this.page.getByText(day).click();
      }
      
      // Reason
      if (data.reason) {
        await this.page.locator(`#lacReason${index}`).click();
        await this.page.locator(`#lacReason${index}`).fill(String(data.reason));
      }
    }
  }

  // Fill remarks in Rich Text Editor
  public async fillRemarks(text: string) {
    await this.remarksEditor.click();
    await this.remarksEditor.fill(text);
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
