import { Locator, Page, expect } from "@playwright/test";

export class FunderSelectionPage {
  page: Page;
  funderSelectionTab: Locator;
  editButton: Locator;
  yesRadioButton: Locator;
  selectFinancierDropdown: Locator;
  saveButton: Locator;
  sendToFinancierButton: Locator;
  okButton: Locator;
  toasterAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.funderSelectionTab = this.page.getByText('Funder Selection & In-');
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.yesRadioButton = this.page.getByText('Yes');
    this.selectFinancierDropdown = this.page.locator('span').filter({ hasText: 'Select Financier' }).first();
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.sendToFinancierButton = this.page.getByRole('button', { name: 'Send To Financier' });
    this.okButton = this.page.getByRole('button', { name: 'Ok' });
    this.toasterAlert = this.page.locator('.toast-message, .alert, [role="alert"]');
  }

  // Helper to handle dialog and click button
  private async clickWithDialogHandler(button: Locator, acceptDialog: boolean = true) {
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      if (acceptDialog) {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
    await button.click();
  }

  // Get funder logo locator by ID (or 'first' for the first funder without ID)
  private getFunderLogo(logoId: string): Locator {
    if (logoId === 'first') {
      return this.page.locator('.funBox > .ng-star-inserted > img').first();
    }
    return this.page.locator(`#${logoId} > .funBox > .ng-star-inserted > img`);
  }

  // Navigate to Funder Selection & In-Principle Offer tab
  public async openFunderSelectionTab() {
    await this.funderSelectionTab.click();
  }

  // Select funders by their logo IDs (e.g., ['logo1', 'logo2', 'logo3'])
  public async selectFunderLogos(funderIds: string[]) {
    for (const funderId of funderIds) {
      await this.getFunderLogo(funderId).click();
    }
  }

  // Select financiers from dropdown
  public async selectFinanciersFromDropdown(financiers: string[]) {
    await this.selectFinancierDropdown.click();
    for (const financier of financiers) {
      await this.page.getByText(financier, { exact: true }).click();
    }
    // Click outside to close dropdown
    await this.page.keyboard.press('Escape');
  }

  // Complete Funder Selection flow (Edit → Select Logos → Yes → Dropdown → Save)
  public async completeFunderSelection(data: any) {
    // Step 1: Navigate to Funder Selection tab
    await this.openFunderSelectionTab();

    // Step 2: Click Edit button to enable selection
    await this.editButton.click();

    // Step 3: Select funder logos if provided
    if (data.funderIds && Array.isArray(data.funderIds)) {
      await this.selectFunderLogos(data.funderIds);
    }

    // Step 4: Click Yes radio button
    await this.yesRadioButton.click();

    // Step 5: Select financiers from dropdown if provided
    if (data.financiers && Array.isArray(data.financiers)) {
      await this.selectFinanciersFromDropdown(data.financiers);
    }

    // Step 6: Click Save button
    await this.saveButton.click();

    // Step 7: Validate toaster alert "Funder saved successfully"
    await expect(this.page.getByText('Funder saved successfully')).toBeVisible({ timeout: 10000 });
    console.log('Funder Selection saved successfully - Toaster validated');
  }

  // Send to Financier (separate step after save)
  public async sendToFinancier() {
    await this.clickWithDialogHandler(this.sendToFinancierButton, true);
    console.log('Sent to Financier - API triggered');
    
    // Wait for loader to disappear and any follow-up dialogs to be handled
    const loader = this.page.locator('#loader');
    await loader.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {
      console.log('Loader timeout, continuing...');
    });
    
    // Small wait to ensure all dialogs are processed
    await this.page.waitForTimeout(2000);
  }
}
