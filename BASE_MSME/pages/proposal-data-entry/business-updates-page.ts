import { Locator, Page, expect } from "@playwright/test";

export class BusinessUpdatesPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  businessUpdatesLink: Locator;
  
  // User selection
  userDropdown: Locator;
  
  // Action buttons
  newButton: Locator;
  editButton: Locator;
  saveButton: Locator;
  deleteButton: Locator;
  
  // Form fields
  headingInput: Locator;
  remarksEditor: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.businessUpdatesLink = this.page.locator('a').filter({ hasText: 'Business Updates' });
    
    // User selection
    this.userDropdown = this.page.locator('#sel_user');
    
    // Action buttons
    this.newButton = this.page.getByRole('button', { name: 'New' });
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' });
    
    // Form fields
    this.headingInput = this.page.locator('#Heading');
    this.remarksEditor = this.page.getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Business Updates page
  public async navigateToBusinessUpdates() {
    await this.proposalDataEntryMenu.click();
    await this.businessUpdatesLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.businessUpdatesLink.click();
  }

  // Select user from dropdown
  public async selectUser(userId: string) {
    await this.userDropdown.selectOption(userId);
  }

  // Click New button
  public async clickNew() {
    await this.newButton.click();
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

  // Fill heading
  public async fillHeading(heading: string) {
    await this.headingInput.click();
    await this.headingInput.fill(heading);
  }

  // Fill remarks in Rich Text Editor
  public async fillRemarks(text: string) {
    await this.remarksEditor.click();
    await this.remarksEditor.fill(text);
  }

  // Add new business update
  public async addBusinessUpdate(data: any) {
    // Select user if provided
    if (data.userId) {
      await this.selectUser(data.userId);
    }
    
    await this.clickNew();
    await this.page.waitForTimeout(500);
    
    if (data.heading) {
      await this.fillHeading(data.heading);
    }
    
    if (data.remarks) {
      await this.fillRemarks(data.remarks);
    }
    
    await this.clickSave();
  }

  // Select an existing update by text
  public async selectUpdateByText(text: string) {
    await this.page.getByText(text).click();
  }

  // Edit existing update
  public async editBusinessUpdate(selectText: string, data: any) {
    await this.selectUpdateByText(selectText);
    await this.clickEdit();
    await this.page.waitForTimeout(500);
    
    if (data.heading) {
      await this.fillHeading(data.heading);
    }
    
    if (data.remarks) {
      await this.fillRemarks(data.remarks);
    }
    
    await this.clickSave();
  }

  // Delete existing update
  public async deleteBusinessUpdate(selectText: string) {
    await this.selectUpdateByText(selectText);
    await this.clickEdit();
    await this.clickDelete();
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
