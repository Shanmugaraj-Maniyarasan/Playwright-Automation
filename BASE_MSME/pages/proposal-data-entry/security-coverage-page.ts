import { Locator, Page } from "@playwright/test";

export class SecurityCoveragePage {
  page: Page;
  
  // Navigation
  securityCoverageTab: Locator;
  
  // Actions
  editBtn: Locator;
  saveBtn: Locator;
  
  // Rich Text Editors
  primaryCommentsEditor: Locator;
  coverageCommentsEditor: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.securityCoverageTab = this.page.locator('a').filter({ hasText: 'Security Coverage' });
    
    // Actions
    this.editBtn = this.page.locator('#subsectiontop').getByRole('button', { name: 'Edit' });
    this.saveBtn = this.page.locator('#subsectiontop').getByRole('button', { name: 'Save' });
    
    // Rich Text Editors
    this.primaryCommentsEditor = this.page.locator('#secPrimaryComments').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    this.coverageCommentsEditor = this.page.locator('#secCoverageComments').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
  }

  // Navigate to Security Coverage tab
  public async navigateToSecurityCoverage() {
    await this.securityCoverageTab.click();
    await this.page.waitForTimeout(1000);
  }

  // Click Edit button
  public async clickEdit() {
    await this.editBtn.click();
    await this.page.waitForTimeout(500);
  }

  // Fill Primary Comments
  public async fillPrimaryComments(comments: any) {
    if (comments) {
      await this.primaryCommentsEditor.click();
      await this.primaryCommentsEditor.fill(String(comments));
    }
  }

  // Fill Coverage Comments
  public async fillCoverageComments(comments: any) {
    if (comments) {
      await this.coverageCommentsEditor.click();
      await this.coverageCommentsEditor.fill(String(comments));
    }
  }

  // Click Save button
  public async clickSave() {
    await this.saveBtn.click();
    await this.page.waitForTimeout(1000);
  }

  // Complete Security Coverage Entry
  public async completeSecurityCoverageEntry(data: any) {
    await this.clickEdit();
    await this.fillPrimaryComments(data.primaryComments);
    await this.fillCoverageComments(data.coverageComments);
    await this.clickSave();
  }
}
