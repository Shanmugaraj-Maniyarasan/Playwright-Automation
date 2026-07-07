import { Locator, Page } from "@playwright/test";

export class DocumentSubmitPage {
  page: Page;
  documentsSubmitTab: Locator;
  editButton: Locator;
  incomeTaxCheckbox: Locator;
  tractorIncomeCheckbox: Locator;
  rentCheckbox: Locator;
  dairyIncomeCheckbox: Locator;
  agriIncomeCheckbox: Locator;
  livestockIncomeCheckbox: Locator;
  grossIncomeCheckbox: Locator;
  saveButton: Locator;
  nextButton: Locator;
  addDocumentButton: Locator;
  documentTypeSelect: Locator;
  chooseFileButton: Locator;
  uploadButton: Locator;
  sendToManagerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentsSubmitTab = this.page.getByText('Documents & Submit');
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.incomeTaxCheckbox = this.page.locator('#oiedIncomeTaxChecked');
    this.tractorIncomeCheckbox = this.page.locator('#oiedTractorIncomeChecked');
    this.rentCheckbox = this.page.locator('#oiedRentChecked');
    this.dairyIncomeCheckbox = this.page.locator('#oiedDairyIncomeChecked');
    this.agriIncomeCheckbox = this.page.locator('#oiedAgriIncomeChecked');
    this.livestockIncomeCheckbox = this.page.locator('#oiedLivestockIncomeChecked');
    this.grossIncomeCheckbox = this.page.locator('#oiedGrossIncomeChecked');
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.nextButton = this.page.getByRole('button', { name: 'Next' });
    this.addDocumentButton = this.page.getByRole('button', { name: 'Add Document' });
    this.documentTypeSelect = this.page.locator('#docs').getByRole('combobox');
    this.chooseFileButton = this.page.getByRole('button', { name: 'Choose File' });
    this.uploadButton = this.page.getByRole('button').nth(2);
    this.sendToManagerButton = this.page.getByRole('button', { name: 'Send to Manager/Owner' });
  }

  // Navigate to Documents & Submit section
  public async openDocumentsSubmit() {
    await this.documentsSubmitTab.click();
  }

  // Helper to handle dialog and click button
  private async clickWithDialogHandler(button: Locator, acceptDialog: boolean = false) {
    // Set up dialog handler BEFORE clicking
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

  // Fill Document verification checkboxes and submit
  public async fillDocumentAndSubmit(data: any) {
    await this.openDocumentsSubmit();
    await this.editButton.click();

    // Check income verification checkboxes based on data
    if (data.incomeTaxChecked === 'Yes' || data.incomeTaxChecked === true) {
      await this.incomeTaxCheckbox.check();
    }
    if (data.tractorIncomeChecked === 'Yes' || data.tractorIncomeChecked === true) {
      await this.tractorIncomeCheckbox.check();
    }
    if (data.rentChecked === 'Yes' || data.rentChecked === true) {
      await this.rentCheckbox.check();
    }
    if (data.dairyIncomeChecked === 'Yes' || data.dairyIncomeChecked === true) {
      await this.dairyIncomeCheckbox.check();
    }
    if (data.agriIncomeChecked === 'Yes' || data.agriIncomeChecked === true) {
      await this.agriIncomeCheckbox.check();
    }
    if (data.livestockIncomeChecked === 'Yes' || data.livestockIncomeChecked === true) {
      await this.livestockIncomeCheckbox.check();
    }
    if (data.grossIncomeChecked === 'Yes' || data.grossIncomeChecked === true) {
      await this.grossIncomeCheckbox.check();
    }

    // Click Save with dialog handler (dialog appears after save)
    await this.clickWithDialogHandler(this.saveButton, true);
    
    // Wait for save to complete
    await this.page.waitForTimeout(1000);
    
    await this.nextButton.click();

    // Upload document if specified
    if (data.documentType && data.documentPath) {
      await this.addDocumentButton.click();
      await this.documentTypeSelect.selectOption(String(data.documentType));
      await this.chooseFileButton.setInputFiles(data.documentPath);
      await this.uploadButton.click();
      await this.page.waitForTimeout(1000);
    }

    // Click Send to Manager with dialog handler
    await this.clickWithDialogHandler(this.sendToManagerButton, true);
  }
}

