import { Locator, Page } from "@playwright/test";

export class FinancialCommentsPage {
  page: Page;
  
  // Navigation
  financialAnalysisMenu: Locator;
  financialCommentsLink: Locator;
  
  // Action buttons
  editButton: Locator;
  saveButton: Locator;
  deleteButton: Locator;
  
  // Rich text editor (single editor used for multiple rows)
  richTextEditor: Locator;
  
  // Financial parameter cells (clickable to edit comment)
  termLiabilityCell: Locator;
  paidUpCapitalCell: Locator;
  currentAssetCell: Locator;
  currentLiabilityCell: Locator;
  currentRatioCell: Locator;
  debtEquityRatioCell: Locator;
  tolTnwCell: Locator;
  adjTolTnwCell: Locator;
  iscrCell: Locator;
  netSalesCell: Locator;
  netWorkingCapitalCell: Locator;
  netProfitAfterTaxCell: Locator;
  netBlockCell: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.financialAnalysisMenu = this.page.getByRole('link', { name: ' Financial Analysis' });
    this.financialCommentsLink = this.page.locator('a').filter({ hasText: 'Financial Comments' });
    
    // Action buttons
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' });
    
    // Rich text editor
    this.richTextEditor = this.page.getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Financial parameter cells
    this.termLiabilityCell = this.page.getByRole('cell', { name: 'Term Liability' });
    this.paidUpCapitalCell = this.page.getByRole('cell', { name: 'Paid Up Capital' });
    this.currentAssetCell = this.page.getByRole('cell', { name: 'Current Asset' });
    this.currentLiabilityCell = this.page.getByRole('cell', { name: 'Current Liability' });
    this.currentRatioCell = this.page.getByRole('cell', { name: 'Current Ratio' });
    this.debtEquityRatioCell = this.page.getByRole('cell', { name: 'Debt Equity Ratio' });
    this.tolTnwCell = this.page.getByRole('cell', { name: 'TOL/TNW', exact: true });
    this.adjTolTnwCell = this.page.getByRole('cell', { name: 'Adj TOL/TNW' });
    this.iscrCell = this.page.getByRole('cell', { name: 'ISCR' });
    this.netSalesCell = this.page.getByRole('cell', { name: 'Net Sales' });
    this.netWorkingCapitalCell = this.page.getByRole('cell', { name: 'Net working capital' });
    this.netProfitAfterTaxCell = this.page.getByRole('cell', { name: 'Net profit after tax' });
    this.netBlockCell = this.page.getByRole('cell', { name: 'Net Block' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Financial Comments page
  public async navigateToFinancialComments() {
    await this.financialAnalysisMenu.click();
    await this.financialCommentsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.financialCommentsLink.click();
    await this.page.waitForTimeout(1000);
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.click();
    await this.page.waitForTimeout(500);
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
  }

  // Click Delete button (handles confirmation dialog)
  public async clickDelete() {
    this.page.once('dialog', dialog => {
      dialog.dismiss().catch(() => {});
    });
    await this.deleteButton.click();
    await this.page.waitForTimeout(500);
  }

  // Check if a cell is visible on the page
  private async isCellVisible(parameterCell: Locator): Promise<boolean> {
    try {
      return await parameterCell.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  // Fill comment for a specific financial parameter (only if cell exists)
  public async fillComment(parameterCell: Locator, comment: string) {
    const isVisible = await this.isCellVisible(parameterCell);
    if (!isVisible) {
      console.log(`Skipping comment - cell not visible on page`);
      return;
    }
    await this.richTextEditor.click();
    await parameterCell.click();
    await this.richTextEditor.click();
    await this.richTextEditor.fill(comment);
  }

  // Fill all financial comments dynamically (only for visible headings)
  public async fillAllComments(data: any) {
    // Define mapping of data keys to cells
    const commentMappings: { dataKey: string; cell: Locator }[] = [
      { dataKey: 'termLiability', cell: this.termLiabilityCell },
      { dataKey: 'paidUpCapital', cell: this.paidUpCapitalCell },
      { dataKey: 'currentAsset', cell: this.currentAssetCell },
      { dataKey: 'currentLiability', cell: this.currentLiabilityCell },
      { dataKey: 'currentRatio', cell: this.currentRatioCell },
      { dataKey: 'debtEquityRatio', cell: this.debtEquityRatioCell },
      { dataKey: 'tolTnw', cell: this.tolTnwCell },
      { dataKey: 'adjTolTnw', cell: this.adjTolTnwCell },
      { dataKey: 'iscr', cell: this.iscrCell },
      { dataKey: 'netSales', cell: this.netSalesCell },
      { dataKey: 'netWorkingCapital', cell: this.netWorkingCapitalCell },
      { dataKey: 'netProfitAfterTax', cell: this.netProfitAfterTaxCell },
      { dataKey: 'netBlock', cell: this.netBlockCell },
    ];

    for (const mapping of commentMappings) {
      const commentValue = data[mapping.dataKey];
      if (commentValue) {
        await this.fillComment(mapping.cell, commentValue);
      }
    }
  }

  // Complete Financial Comments flow
  public async completeFinancialCommentsEntry(data: any) {
    await this.clickEdit();
    await this.fillAllComments(data);
    await this.clickSave();
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await this.successAlert.waitFor({ state: 'visible', timeout: 5000 });
  }
}
