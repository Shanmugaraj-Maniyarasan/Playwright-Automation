import { Locator, Page, expect } from "@playwright/test";

export class PersonalCorporateGuaranteePage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  personalCorporateGuaranteeLink: Locator;
  
  // Customer selection
  customerDropdown: Locator;
  
  // Action buttons
  editButton: Locator;
  saveButton: Locator;
  addNewButton: Locator;
  
  // Rich text editor
  remarksEditor: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.personalCorporateGuaranteeLink = this.page.locator('a').filter({ hasText: 'Personal and Corporate' });
    
    // Customer selection
    this.customerDropdown = this.page.locator('#custId');
    
    // Action buttons
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.addNewButton = this.page.getByRole('button', { name: 'Add New' });
    
    // Rich text editor
    this.remarksEditor = this.page.getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Personal and Corporate Guarantee page
  public async navigateToPersonalCorporateGuarantee() {
    await this.proposalDataEntryMenu.click();
    await this.personalCorporateGuaranteeLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.personalCorporateGuaranteeLink.click();
  }

  // Select customer from dropdown
  public async selectCustomer(customerId: string) {
    await this.customerDropdown.selectOption(customerId);
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.click();
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.click();
  }

  // Click Add New button
  public async clickAddNew() {
    await this.addNewButton.click();
  }

  // Get row locators dynamically by index
  private getGuaranteeRowLocators(index: number) {
    const row = this.page.locator('table tbody tr').nth(index);
    return {
      guaranteeType: row.locator('td').filter({ hasText: '-- Select --Personal' }).getByRole('combobox').or(
        this.page.getByRole('cell', { name: 'Personal Guarantee' }).getByRole('combobox')
      ),
      guarantorName: row.locator('td').filter({ hasText: '-- Select -- RAM Enterprises' }).getByRole('combobox').or(
        row.locator('td').nth(1).getByRole('combobox')
      ),
      guaranteeValue: this.page.getByRole('cell', { name: '0', exact: true }).getByRole('textbox'),
      guarantorNetworth: this.page.locator(`#lgdGuarNetworth${index}`),
      latestMeansDate: this.page.locator('#lgdLatestMeansDate'),
      latestMeans: this.page.locator(`#lgdLatestMeans${index}`),
      meansDate: this.page.locator('#lgdMeansDate'),
      means: this.page.locator(`#lgdMeans${index}`),
    };
  }

  // Fill guarantee details
  public async fillGuaranteeDetails(data: any, index: number = 0) {
    const fields = this.getGuaranteeRowLocators(index);
    
    // Guarantee Type - P: Personal, C: Corporate
    if (data.guaranteeType) {
      const typeCode = data.guaranteeType.toLowerCase().startsWith('p') ? 'P' : 'C';
      await this.page.locator('td').filter({ hasText: '-- Select --Personal' }).getByRole('combobox').first().selectOption(typeCode);
    }
    
    // Guarantor Name
    if (data.guarantorId) {
      await this.page.locator('td').filter({ hasText: '-- Select -- RAM Enterprises' }).getByRole('combobox').first().selectOption(String(data.guarantorId));
    }
    
    // Guarantee Value
    if (data.guaranteeValue) {
      await this.page.getByRole('cell', { name: '0', exact: true }).getByRole('textbox').fill(String(data.guaranteeValue));
    }
    
    // Guarantor Networth
    if (data.guarantorNetworth) {
      await fields.guarantorNetworth.fill(String(data.guarantorNetworth));
    }
    
    // Latest Means Date (date picker)
    if (data.latestMeansDate) {
      await this.page.locator('#lgdLatestMeansDate').click();
      await this.page.waitForTimeout(300);
      await this.selectDateFromPicker(data.latestMeansDate);
    }
    
    // Latest Means
    if (data.latestMeans) {
      await fields.latestMeans.fill(String(data.latestMeans));
    }
    
    // Means Date (date picker)
    if (data.meansDate) {
      await this.page.locator('#lgdMeansDate').click();
      await this.page.waitForTimeout(300);
      await this.selectDateFromPicker(data.meansDate);
    }
    
    // Means
    if (data.means) {
      await fields.means.fill(String(data.means));
    }
  }

  // Fill remarks in Rich Text Editor
  public async fillRemarks(text: string) {
    await this.remarksEditor.click();
    await this.remarksEditor.fill(text);
  }

  // Helper: Select date from picker
  private async selectDateFromPicker(dateString: string) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      await this.page.getByText(String(day), { exact: true }).first().click();
    } else {
      await this.page.getByText(dateString, { exact: true }).first().click();
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
