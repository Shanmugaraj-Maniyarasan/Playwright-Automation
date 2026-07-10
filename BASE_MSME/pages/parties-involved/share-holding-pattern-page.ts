import { Locator, Page, expect } from "@playwright/test";

export class ShareHoldingPatternPage {
  page: Page;
  
  // Navigation
  partiesInvolvedMenu: Locator;
  shareHoldingPatternLink: Locator;
  
  // Section buttons
  editButton: Locator;
  saveButton: Locator;
  newShareHolderButton: Locator;
  addNewCapitalMarketButton: Locator;
  
  // Share holding pattern applicable
  shareHoldingPatternNoRadio: Locator;
  shareHoldingPatternYesRadio: Locator;
  
  // Capital Structure fields (when applicable = Yes)
  asOnDateInput: Locator;
  authorizedCapitalInput: Locator;
  issuedCapitalInput: Locator;
  paidUpCapitalInput: Locator;
  bookValueInput: Locator;
  marketPriceInput: Locator;
  fiftyTwoWeekHighInput: Locator;
  fiftyTwoWeekLowInput: Locator;  // 52-Week Low (Market Price)
  fiftyTwoWeekDateInput: Locator;
  marketCapitalizationInput: Locator;
  capitalStructureEditor: Locator;
  
  // Capital Market Perception - Company Listed Entity
  companyListedYesRadio: Locator;
  companyListedNoRadio: Locator;
  listedOnDropdown: Locator;
  faceValueInput: Locator;
  sharePriceAsOnInput: Locator;
  lastTradePriceInput: Locator;
  lowLast52WeekInput: Locator;
  highLast52WeekInput: Locator;
  mktCapitalizationInput: Locator;
  mktCapitalizationAsOnInput: Locator;
  
  // Rich text editors
  significantChangeEditor: Locator;
  quantumShareholdingEditor: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.partiesInvolvedMenu = this.page.getByRole('link', { name: ' Parties Involved' });
    this.shareHoldingPatternLink = this.page.locator('a.navLink').filter({ hasText: /^Share Holding Pattern$/ });
    
    // Section buttons - using title attribute
    this.editButton = this.page.locator('.buttonLeft button[title="Edit"]');
    this.saveButton = this.page.locator('.buttonLeft button[title="Save"]');
    this.newShareHolderButton = this.page.getByRole('button', { name: 'New Share Holder' });
    this.addNewCapitalMarketButton = this.page.locator('#CapitalMarket button.new-expo');
    
    // Share holding pattern applicable
    this.shareHoldingPatternNoRadio = this.page.locator('#lashareholdingpatternNo');
    this.shareHoldingPatternYesRadio = this.page.locator('#lashareholdingpattern');
    
    // Capital Structure fields
    this.asOnDateInput = this.page.locator('#lsrAsOnDate');
    this.authorizedCapitalInput = this.page.locator('#authcap');
    this.issuedCapitalInput = this.page.locator('#Issucap');
    this.paidUpCapitalInput = this.page.locator('#paicap');
    this.bookValueInput = this.page.locator('#bookval');
    this.marketPriceInput = this.page.locator('#makprce');
    this.fiftyTwoWeekHighInput = this.page.locator('#curprce');
    this.fiftyTwoWeekLowInput = this.page.locator('#lsrMaxValue');  // 52-Week Low (Market Price)
    this.fiftyTwoWeekDateInput = this.page.locator('#authdate');
    this.marketCapitalizationInput = this.page.locator('#lsrMktValue');
    // CKEditor for Capital Structure - first rich text editor on the page
    this.capitalStructureEditor = this.page.locator('.ck-editor__editable_inline[contenteditable="true"]').first();
    
    // Capital Market Perception - Company Listed Entity
    this.companyListedYesRadio = this.page.locator('input#companyListedEntity[value="Y"]');
    this.companyListedNoRadio = this.page.locator('input#companyListedEntity[value="N"]');
    this.listedOnDropdown = this.page.locator('#listedon0');
    this.faceValueInput = this.page.locator('#facevalue0');
    this.sharePriceAsOnInput = this.page.locator('#sharepriceason0');
    this.lastTradePriceInput = this.page.locator('#lasttradeprice0');
    this.lowLast52WeekInput = this.page.locator('#low0');
    this.highLast52WeekInput = this.page.locator('#high0');
    this.mktCapitalizationInput = this.page.locator('#marketcapitalizationcr0');
    this.mktCapitalizationAsOnInput = this.page.locator('#marketcapitalizationason0');
    
    // Rich text editors - using nth() for position-based selection
    // Significant Change is the 2nd CKEditor, Quantum is the 3rd CKEditor
    this.significantChangeEditor = this.page.locator('.ck-editor__editable_inline[contenteditable="true"]').nth(1);
    this.quantumShareholdingEditor = this.page.locator('.ck-editor__editable_inline[contenteditable="true"]').nth(2);
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /Kindly fill|error|required/i }).first();
  }

  // Navigate to Share Holding Pattern page
  public async navigateToShareHoldingPattern() {
    console.log('\n========== NAVIGATING TO SHARE HOLDING PATTERN ==========');
    
    // First check if Share Holding Pattern link is already visible (menu already expanded)
    const isLinkVisible = await this.shareHoldingPatternLink.isVisible();
    
    if (!isLinkVisible) {
      // Click Parties Involved menu to expand
      await this.partiesInvolvedMenu.click();
      await this.page.waitForTimeout(500);
    }
    
    // Wait for the submenu link to be visible
    await this.shareHoldingPatternLink.waitFor({ state: 'visible', timeout: 5000 });
    
    // Use force click to avoid interception issues
    await this.shareHoldingPatternLink.click({ force: true });
    await this.page.waitForTimeout(1000);
    console.log('Navigation complete');
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.editButton.click();
    await this.page.waitForTimeout(500);
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveButton.click();
    await this.page.waitForTimeout(500);
  }

  // Helper: Fill date picker
  public async fillDatePicker(dateInput: Locator, dateValue: string) {
    await dateInput.scrollIntoViewIfNeeded();
    await dateInput.click();
    await dateInput.clear();
    await dateInput.fill(dateValue);
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  // Helper: Fill CKEditor rich text field
  public async fillCKEditor(editor: Locator, text: string) {
    await editor.scrollIntoViewIfNeeded();
    await editor.click();
    await this.page.waitForTimeout(200);
    // Clear existing content and use fill() - faster than type() but works with CKEditor
    await this.page.keyboard.press('Control+a');
    await editor.fill(text);
    await this.page.waitForTimeout(100);
  }

  // Fill Share Holding Pattern details
  public async fillShareHoldingDetails(data: any) {
    console.log('\n========== FILLING SHARE HOLDING PATTERN ==========');
    
    // Click Edit first
    await this.clickEdit();
    
    // 1. Share Holding Pattern Applicable
    if (data.shareHoldingApplicable === 'N' || data.shareHoldingApplicable === 'No') {
      console.log('1. Share Holding Pattern Applicable: NO');
      await this.shareHoldingPatternNoRadio.check();
      console.log('========== SHARE HOLDING PATTERN COMPLETED ==========\n');
      return; // No need to fill other fields if not applicable
    }
    
    console.log('1. Share Holding Pattern Applicable: YES');
    await this.shareHoldingPatternYesRadio.check();
    await this.page.waitForTimeout(500);
    
    // 2. As on Date
    if (data.asOnDate) {
      console.log(`2. As on Date: ${data.asOnDate}`);
      await this.fillDatePicker(this.asOnDateInput, String(data.asOnDate));
    }
    
    // 3. Authorized Capital
    if (data.authorizedCapital) {
      console.log(`3. Authorized Capital: ${data.authorizedCapital}`);
      await this.authorizedCapitalInput.fill(String(data.authorizedCapital));
    }
    
    // 4. Issued & Subscribed Capital
    if (data.issuedCapital) {
      console.log(`4. Issued & Subscribed Capital: ${data.issuedCapital}`);
      await this.issuedCapitalInput.fill(String(data.issuedCapital));
    }
    
    // 5. Paid Up Capital
    if (data.paidUpCapital) {
      console.log(`5. Paid Up Capital: ${data.paidUpCapital}`);
      await this.paidUpCapitalInput.fill(String(data.paidUpCapital));
    }
    
    // 6. Book Value
    if (data.bookValue) {
      console.log(`6. Book Value: ${data.bookValue}`);
      await this.bookValueInput.fill(String(data.bookValue));
    }
    
    // 7. Market Price (NSE/BSE) - Current Price
    if (data.marketPrice) {
      console.log(`7. Market Price (NSE/BSE): ${data.marketPrice}`);
      await this.marketPriceInput.fill(String(data.marketPrice));
    }
    
    // 8. 52-Week High
    if (data.fiftyTwoWeekHigh) {
      console.log(`8. 52-Week High: ${data.fiftyTwoWeekHigh}`);
      await this.fiftyTwoWeekHighInput.fill(String(data.fiftyTwoWeekHigh));
    }
    
    // 8a. 52-Week Low (Market Price)
    if (data.fiftyTwoWeekLow) {
      console.log(`8a. 52-Week Low (Market Price): ${data.fiftyTwoWeekLow}`);
      await this.fiftyTwoWeekLowInput.fill(String(data.fiftyTwoWeekLow));
    }
    
    // 9. Date (52 Week Max/Min)
    if (data.fiftyTwoWeekDate) {
      console.log(`9. Date (52 Week Max/Min): ${data.fiftyTwoWeekDate}`);
      await this.fillDatePicker(this.fiftyTwoWeekDateInput, String(data.fiftyTwoWeekDate));
    }
    
    // 10. Market Capitalization
    if (data.marketCapitalization) {
      console.log(`10. Market Capitalization: ${data.marketCapitalization}`);
      await this.marketCapitalizationInput.fill(String(data.marketCapitalization));
    }
    
    // 10a. Capital Structure (Rich Text Editor)
    if (data.capitalStructure) {
      console.log(`10a. Capital Structure: ${data.capitalStructure}`);
      await this.fillCKEditor(this.capitalStructureEditor, String(data.capitalStructure));
    }
    
    // ========== Capital Market Perception ==========
    if (data.companyListed === 'Y' || data.companyListed === 'Yes') {
      console.log('\n--- Capital Market Perception ---');
      console.log('11. Company Listed Entity: YES');
      await this.companyListedYesRadio.check();
      await this.page.waitForTimeout(500);
      
      // Support multiple Capital Market rows
      if (data.capitalMarketRows && Array.isArray(data.capitalMarketRows) && data.capitalMarketRows.length > 0) {
        console.log('\n--- Adding Multiple Capital Market Rows ---');
        for (let i = 0; i < data.capitalMarketRows.length; i++) {
          await this.addCapitalMarketRow(data.capitalMarketRows[i], i);
        }
      } else {
        // Single capital market data in main data object (for backward compatibility)
        await this.addCapitalMarketRow(data, 0);
      }
    } else if (data.companyListed === 'N' || data.companyListed === 'No') {
      console.log('11. Company Listed Entity: NO');
      await this.companyListedNoRadio.check();
    }
    
    // ========== New Shareholder Section ==========
    if (data.shareholders && Array.isArray(data.shareholders) && data.shareholders.length > 0) {
      console.log('\n--- Adding Shareholders ---');
      for (let i = 0; i < data.shareholders.length; i++) {
        await this.addNewShareholder(data.shareholders[i], i + 1);
      }
    } else if (data.shareholderType || data.noOfShares) {
      // Single shareholder data directly in main data object
      console.log('\n--- Adding Single Shareholder ---');
      await this.addNewShareholder(data, 1);
    }
    
    // ========== Rich Text Editors ==========
    // 20. Any Significant change in Share Holding Pattern
    if (data.significantChange) {
      console.log(`\n20. Significant Change in Share Holding Pattern: ${data.significantChange}`);
      await this.fillCKEditor(this.significantChangeEditor, String(data.significantChange));
    }
    
    // 21. Quantum of Shareholding pledged by Promoter
    if (data.quantumShareholding) {
      console.log(`21. Quantum of Shareholding pledged by Promoter: ${data.quantumShareholding}`);
      await this.fillCKEditor(this.quantumShareholdingEditor, String(data.quantumShareholding));
    }
    
    console.log('========== SHARE HOLDING PATTERN COMPLETED ==========\n');
  }

  // Add new shareholder (clicks New Share Holder button for every row since table starts empty)
  public async addNewShareholder(data: any, index: number = 1) {
    console.log(`\n--- Adding New Shareholder (Row ${index}) ---`);
    
    // Always click "New Share Holder" to add a row (table starts empty)
    await this.newShareHolderButton.scrollIntoViewIfNeeded();
    await this.newShareHolderButton.click();
    await this.page.waitForTimeout(500);
    
    // Fill shareholder details
    // 1. Share Holders / Partners dropdown (#lpshBshName)
    if (data.shareholderType) {
      console.log(`  Share Holders/Partners: ${data.shareholderType}`);
      await this.page.locator(`#lpshBshName${index}`).selectOption(String(data.shareholderType));
      await this.page.waitForTimeout(300);
      
      // If "Other" is selected (value "OT"), fill the other name field
      if (data.shareholderType === 'OT' && data.shareholderName) {
        console.log(`  Shareholder Name (Other): ${data.shareholderName}`);
        await this.page.locator(`#lpshBshNameOther${index}`).fill(String(data.shareholderName));
      }
    }
    
    // 2. Partner's Capital / Position dropdown (#lpshBshPosition)
    if (data.position) {
      console.log(`  Position: ${data.position}`);
      await this.page.locator(`#lpshBshPosition${index}`).selectOption(String(data.position));
    }
    
    // 3. No of Shares (#lpshNoOfShare)
    if (data.noOfShares) {
      console.log(`  No of Shares: ${data.noOfShares}`);
      await this.page.locator(`#lpshNoOfShare${index}`).fill(String(data.noOfShares));
    }
    
    // 4. Face Value (#lpshFaceValue)
    if (data.shareholderFaceValue) {
      console.log(`  Face Value: ${data.shareholderFaceValue}`);
      await this.page.locator(`#lpshFaceValue${index}`).fill(String(data.shareholderFaceValue));
    }
    
    // 5. Current Date (#lpshCurrDate)
    if (data.currentDate) {
      console.log(`  Current Date: ${data.currentDate}`);
      await this.fillDatePicker(this.page.locator(`#lpshCurrDate${index}`), String(data.currentDate));
    }
    
    // 6. Current % (#lpshCurrPerc)
    if (data.currentPercent) {
      console.log(`  Current %: ${data.currentPercent}`);
      await this.page.locator(`#lpshCurrPerc${index}`).fill(String(data.currentPercent));
    }
    
    // 7. Previous Date (#lpshPrevDate)
    if (data.previousDate) {
      console.log(`  Previous Date: ${data.previousDate}`);
      await this.fillDatePicker(this.page.locator(`#lpshPrevDate${index}`), String(data.previousDate));
    }
    
    // 8. Previous % (#lpshPrevPerc)
    if (data.previousPercent) {
      console.log(`  Previous %: ${data.previousPercent}`);
      await this.page.locator(`#lpshPrevPerc${index}`).fill(String(data.previousPercent));
    }
  }

  // Add new Capital Market Perception row (index starts at 0)
  public async addCapitalMarketRow(data: any, index: number = 0) {
    console.log(`\n--- Adding Capital Market Row (Row ${index + 1}) ---`);
    
    // Click Add New button for additional rows (index > 0)
    if (index > 0) {
      await this.addNewCapitalMarketButton.click();
      await this.page.waitForTimeout(500);
    }
    
    // 1. Listed On
    if (data.listedOn) {
      console.log(`  Listed On: ${data.listedOn}`);
      await this.page.locator(`#listedon${index}`).selectOption(String(data.listedOn));
    }
    
    // 2. Face Value
    if (data.faceValue) {
      console.log(`  Face Value: ${data.faceValue}`);
      await this.page.locator(`#facevalue${index}`).fill(String(data.faceValue));
    }
    
    // 3. Share Price As On
    if (data.sharePriceAsOn) {
      console.log(`  Share Price As On: ${data.sharePriceAsOn}`);
      await this.fillDatePicker(this.page.locator(`#sharepriceason${index}`), String(data.sharePriceAsOn));
    }
    
    // 4. Last Trade Price
    if (data.lastTradePrice) {
      console.log(`  Last Trade Price: ${data.lastTradePrice}`);
      await this.page.locator(`#lasttradeprice${index}`).fill(String(data.lastTradePrice));
    }
    
    // 5. Low (Last 52 Week)
    if (data.lowLast52Week) {
      console.log(`  Low (Last 52 Week): ${data.lowLast52Week}`);
      await this.page.locator(`#low${index}`).fill(String(data.lowLast52Week));
    }
    
    // 6. High (Last 52 Weeks)
    if (data.highLast52Week) {
      console.log(`  High (Last 52 Weeks): ${data.highLast52Week}`);
      await this.page.locator(`#high${index}`).fill(String(data.highLast52Week));
    }
    
    // 7. Market Capitalization (Cr)
    if (data.mktCapitalization) {
      console.log(`  Market Capitalization (Cr): ${data.mktCapitalization}`);
      await this.page.locator(`#marketcapitalizationcr${index}`).fill(String(data.mktCapitalization));
    }
    
    // 8. Market Capitalization As On
    if (data.mktCapitalizationAsOn) {
      console.log(`  Market Capitalization As On: ${data.mktCapitalizationAsOn}`);
      await this.fillDatePicker(this.page.locator(`#marketcapitalizationason${index}`), String(data.mktCapitalizationAsOn));
    }
  }

  // Delete Capital Market row by index (0-based)
  public async deleteCapitalMarketRow(index: number) {
    console.log(`\n--- Deleting Capital Market Row ${index + 1} ---`);
    
    // Set up dialog handler before clicking delete
    this.page.once('dialog', async dialog => {
      console.log(`  Alert: ${dialog.message()}`);
      await dialog.accept(); // Click OK
    });
    
    // Find the delete button in the row containing the field with matching index
    const deleteButton = this.page.locator(`#CapitalMarket table tbody tr:has(#listedon${index}) button.btn-danger`);
    await deleteButton.click();
    await this.page.waitForTimeout(500);
    console.log(`  Capital Market Row ${index + 1} deleted`);
  }

  // Delete Shareholder row by index (1-based, matching field IDs)
  public async deleteShareholderRow(index: number) {
    console.log(`\n--- Deleting Shareholder Row ${index} ---`);
    
    // Set up dialog handler before clicking delete
    this.page.once('dialog', async dialog => {
      console.log(`  Alert: ${dialog.message()}`);
      await dialog.accept(); // Click OK
    });
    
    // Find the delete button in the row containing the field with matching index
    const deleteButton = this.page.locator(`#shareHolding table tbody tr:has(#lpshBshName${index}) button.btn-danger`);
    await deleteButton.click();
    await this.page.waitForTimeout(500);
    console.log(`  Shareholder Row ${index} deleted`);
  }

  // Delete multiple Capital Market rows (deletes from highest index to lowest to avoid index shift)
  public async deleteCapitalMarketRows(indexes: number[]) {
    // Sort in descending order to delete from bottom to top
    const sortedIndexes = [...indexes].sort((a, b) => b - a);
    for (const index of sortedIndexes) {
      await this.deleteCapitalMarketRow(index);
    }
  }

  // Delete multiple Shareholder rows (deletes from highest index to lowest to avoid index shift)
  public async deleteShareholderRows(indexes: number[]) {
    // Sort in descending order to delete from bottom to top
    const sortedIndexes = [...indexes].sort((a, b) => b - a);
    for (const index of sortedIndexes) {
      await this.deleteShareholderRow(index);
    }
  }
}
