import { Locator, Page } from "@playwright/test";

export class DocumentDetailsPage {
  page: Page;
  
  // Navigation
  documentDetailsTab: Locator;
  
  // Actions
  editBtn: Locator;
  addNewDocumentBtn: Locator;
  saveBtn: Locator;
  
  // Document Selection Popup
  closeBtnF: Locator;
  
  // File Upload
  chooseFileBtn: Locator;
  uploadBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.documentDetailsTab = this.page.locator('a').filter({ hasText: 'Document Details' });
    
    // Actions
    this.editBtn = this.page.getByRole('button', { name: 'Edit' });
    this.addNewDocumentBtn = this.page.getByRole('button', { name: 'Add New Document' });
    this.saveBtn = this.page.getByRole('button', { name: 'Save' });
    
    // Document Selection Popup
    this.closeBtnF = this.page.locator('#closeBtnf');
    
    // File Upload
    this.chooseFileBtn = this.page.getByRole('button', { name: 'Choose File' });
    this.uploadBtn = this.page.getByRole('button', { name: ' Upload' });
  }

  // Navigate to Document Details tab
  public async navigateToDocumentDetails() {
    await this.documentDetailsTab.click();
    await this.page.waitForTimeout(1000);
  }

  // Click Edit button
  public async clickEdit() {
    await this.editBtn.click();
    await this.page.waitForTimeout(500);
  }

  // Add New Document Row
  public async addNewDocument() {
    await this.addNewDocumentBtn.click();
    await this.page.waitForTimeout(500);
  }

  // Open Document Selection Popup for a specific row
  public async openDocumentSelectionPopup(rowIndex: number) {
    const searchBtn = this.page.locator(`tr:nth-child(${rowIndex}) > td:nth-child(2) > .input-group > .input-group-text > .btn`);
    await searchBtn.click();
    await this.page.waitForTimeout(500);
  }

  // Select Document from popup by name
  public async selectDocumentByName(documentName: string) {
    await this.page.getByRole('cell', { name: documentName }).click();
    await this.page.waitForTimeout(300);
  }

  // Select Party for document row
  public async selectPartyForRow(rowIndex: number, partyValue: string) {
    const partyDropdown = this.page.locator(`#lpdPartyId${rowIndex}`);
    await partyDropdown.selectOption(String(partyValue));
  }

  // Check "Yes" for Received checkbox in row
  public async checkReceivedYes(rowName: string) {
    await this.page.getByRole('row', { name: rowName }).getByLabel('Yes').check();
  }

  // Select Document Type for row
  public async selectDocTypeForRow(rowIndex: number, docType: string) {
    const docTypeDropdown = this.page.locator(`#lpdDocType${rowIndex}`);
    await docTypeDropdown.selectOption(String(docType));
  }

  // Open Upload dialog for row
  public async openUploadDialogForRow(rowIndex: number) {
    const uploadBtn = this.page.locator(`#uploadbtn${rowIndex}`);
    await uploadBtn.click();
    await this.page.waitForTimeout(500);
  }

  // Upload file in dialog
  public async uploadFile(filePath: string) {
    await this.chooseFileBtn.setInputFiles(filePath);
    await this.uploadBtn.click();
    await this.page.waitForTimeout(1000);
    await this.closeBtnF.click();
  }

  // Click Save button
  public async clickSave() {
    await this.saveBtn.click();
    await this.page.waitForTimeout(1000);
  }

  // Add document with full details
  public async addDocumentWithDetails(data: any) {
    await this.addNewDocument();
    
    const rowIndex = data.rowIndex || 3;
    
    // Open document selection and select
    await this.openDocumentSelectionPopup(rowIndex);
    if (data.documentName) {
      await this.selectDocumentByName(data.documentName);
    }
    
    // Select party
    if (data.partyId) {
      await this.selectPartyForRow(rowIndex, data.partyId);
    }
    
    // Check received
    if (data.receivedYes && data.documentRowName) {
      await this.checkReceivedYes(data.documentRowName);
    }
    
    // Select document type
    if (data.docType) {
      await this.selectDocTypeForRow(rowIndex, data.docType);
    }
    
    // Upload file
    if (data.filePath) {
      await this.openUploadDialogForRow(rowIndex);
      await this.uploadFile(data.filePath);
    }
  }

  // Complete Document Entry Flow
  public async completeDocumentEntry(data: any) {
    await this.clickEdit();
    await this.addDocumentWithDetails(data);
    await this.clickSave();
  }
}
