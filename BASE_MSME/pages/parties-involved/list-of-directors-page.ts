import { Locator, Page } from "@playwright/test";

export class ListOfDirectorsPage {
  page: Page;
  
  // Tab navigation
  listOfDirectorsTab: Locator;
  cibilScoresOfDirectorsTab: Locator;
  cibilScoresOfCompanyTab: Locator;
  otherInformationTab: Locator;
  
  // Rich Text Editor (common pattern)
  richTextEditor: Locator;
  
  // Tab 4 - Other Information specific
  otherInfoDate: Locator;
  otherInfoGuaranteeRemarks: Locator;
  otherInfoCommentsRemarks: Locator;
  
  // Alerts
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Tab navigation - tabs are button elements within a tablist
    this.listOfDirectorsTab = this.page.getByRole('button', { name: 'List of Directors / Partners / Trustee / Members' });
    this.cibilScoresOfDirectorsTab = this.page.getByRole('button', { name: 'CIBIL Scores of Directors' });
    this.cibilScoresOfCompanyTab = this.page.getByRole('button', { name: /CIBIL Scores of Company/ });
    this.otherInformationTab = this.page.getByRole('button', { name: 'Other Information' });
    
    // Rich Text Editor - CKEditor (generic)
    this.richTextEditor = this.page.getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Tab 4 - Other Information specific locators
    this.otherInfoDate = this.page.getByRole('textbox', { name: 'dd/mm/yyyy' });
    this.otherInfoGuaranteeRemarks = this.page.locator('#loiGurantee').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    this.otherInfoCommentsRemarks = this.page.locator('#loiComments').getByRole('textbox', { name: 'Rich Text Editor. Editing' });
    
    // Alerts
    this.successAlert = this.page.locator('.alert-success');
    this.errorAlert = this.page.locator('.alert-danger');
  }

  // Navigate to List of Directors page
  public async navigateToListOfDirectors() {
    await this.page.getByRole('link', { name: ' Parties Involved' }).click();
    await this.page.waitForTimeout(500);
    await this.page.locator('a').filter({ hasText: 'List of Directors' }).click();
    await this.page.waitForTimeout(1000);
  }

  // ============ COMMON BUTTON METHODS (use .first() for Tab 1 default) ============

  // Click Edit button (first one - works for Tab 1 default)
  public async clickEdit() {
    await this.page.getByRole('button', { name: 'Edit' }).first().click();
    await this.page.waitForTimeout(500);
  }

  // Click Save button (first one)
  public async clickSave() {
    await this.page.getByRole('button', { name: 'Save' }).first().click();
    await this.page.waitForTimeout(1000);
  }

  // Click Add New button (first one)
  public async clickAddNew() {
    await this.page.getByRole('button', { name: 'Add New' }).first().click();
    await this.page.waitForTimeout(1000); // Wait for row to be created
  }

  // ============ TAB NAVIGATION ============

  public async clickListOfDirectorsTab() {
    await this.listOfDirectorsTab.click();
    await this.page.waitForTimeout(1000);
  }

  public async clickCibilScoresOfDirectorsTab() {
    console.log('Clicking CIBIL Scores of Directors tab...');
    await this.cibilScoresOfDirectorsTab.click();
    await this.page.waitForTimeout(1000);
    console.log('CIBIL Scores of Directors tab clicked');
  }

  public async clickCibilScoresOfCompanyTab() {
    console.log('Clicking CIBIL Scores of Company tab...');
    // Tab 3 - Use tablist context and partial text match
    const tablist = this.page.locator('[role="tablist"]');
    const tab = tablist.locator('button').filter({ hasText: 'CIBIL Scores of Company' });
    await tab.waitFor({ state: 'visible', timeout: 10000 });
    await tab.click();
    await this.page.waitForTimeout(1000);
    console.log('CIBIL Scores of Company tab clicked');
  }

  public async clickOtherInformationTab() {
    console.log('Clicking Other Information tab...');
    // Tab 4 - Use tablist context
    const tablist = this.page.locator('[role="tablist"]');
    const tab = tablist.locator('button').filter({ hasText: 'Other Information' });
    await tab.waitFor({ state: 'visible', timeout: 10000 });
    await tab.click();
    await this.page.waitForTimeout(1000);
    console.log('Other Information tab clicked');
  }

  // ============ HELPER METHODS ============

  // Helper: Fill field only if it's empty
  private async fillIfEmpty(locator: Locator, value: string) {
    const currentValue = await locator.inputValue();
    if (!currentValue || currentValue.trim() === '') {
      await locator.fill(value);
    }
  }

  // Helper: Fill Rich Text Editor (first visible one)
  private async fillRichTextEditor(text: string) {
    await this.richTextEditor.click();
    await this.richTextEditor.fill(text);
  }

  // ============ TAB 1: LIST OF DIRECTORS ============
  // Note: IDs like lodNameOfPromoter0 exist in both Tab 1 and Tab 2 (CIBIL tab has disabled copies)
  // Tab 2 elements are inside #cibilScore-direcors container, so we use .first() to get Tab 1 elements

  // Get Tab 1 row locators using dynamic index - use .first() to avoid Tab 2 duplicates
  private getDirectorRowLocators(index: number) {
    return {
      nameOfPromoter: this.page.locator(`#lodNameOfPromoter${index}`).first(),
      relationshipWithPromoters: this.page.locator(`#lodRelationwithPromoter${index}`).first(),
      dinNumber: this.page.locator(`#lodDinNumber${index}`).first(),
      panNumber: this.page.locator(`#lodPanNo${index}`).first(),
      designation: this.page.locator(`#lodDesignation${index}`).first(),
      netWorthInAmount: this.page.locator(`#lodNetworth${index}`).first(),
      netWorthAsPreviousYear: this.page.locator(`#lodNetWorthAsPrevious${index}`).first(),
      netWorthAsCurrentYear: this.page.locator(`#lodNetWorthAsCurrent${index}`).first(),
      netWorth: this.page.locator(`#lodMeanOf${index}`).first(),
    };
  }

  // Add new director row in Tab 1
  public async addNewDirector(data: any, index: number = 0) {
    // Click Add New if adding beyond first row
    if (index > 0) {
      await this.clickAddNew();
    }
    
    const fields = this.getDirectorRowLocators(index);
    
    // Wait for the name field to be visible before proceeding
    await fields.nameOfPromoter.waitFor({ state: 'visible', timeout: 10000 });
    
    // Fill all fields in order
    if (data.nameOfPromoter) {
      await fields.nameOfPromoter.fill(String(data.nameOfPromoter));
    }
    if (data.relationshipWithKeyPromoters) {
      await fields.relationshipWithPromoters.fill(String(data.relationshipWithKeyPromoters));
    }
    if (data.dinNumber) {
      await fields.dinNumber.fill(String(data.dinNumber));
    }
    if (data.panNumber) {
      console.log(`Filling PAN Number for director ${index}: ${data.panNumber}`);
      await fields.panNumber.scrollIntoViewIfNeeded();
      await fields.panNumber.click();
      await fields.panNumber.clear();
      // Use pressSequentially for PAN to handle any validation
      await fields.panNumber.pressSequentially(String(data.panNumber), { delay: 50 });
      await this.page.waitForTimeout(200);
      // Verify the value was entered
      const enteredPan = await fields.panNumber.inputValue();
      console.log(`PAN Number entered: ${enteredPan}`);
      if (!enteredPan) {
        console.log('PAN field is empty - trying fill() as fallback');
        await fields.panNumber.fill(String(data.panNumber));
      }
    } else {
      console.log(`No PAN Number data for director ${index}`);
    }
    if (data.designation) {
      await fields.designation.selectOption(String(data.designation));
    }
    if (data.netWorthInAmount) {
      await fields.netWorthInAmount.fill(String(data.netWorthInAmount));
    }
    if (data.netWorthAsPreviousYear) {
      await fields.netWorthAsPreviousYear.fill(String(data.netWorthAsPreviousYear));
    }
    if (data.netWorthAsCurrentYear) {
      await fields.netWorthAsCurrentYear.fill(String(data.netWorthAsCurrentYear));
    }
    if (data.netWorth) {
      await fields.netWorth.fill(String(data.netWorth));
    }
  }

  // Fill Details of Proprietor/Partners/Directors Rich Text Editor
  public async fillDetailsOfDirectors(text: string) {
    await this.fillRichTextEditor(text);
  }

  // Delete director row
  public async deleteDirectorRow(index: number) {
    const deleteButton = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4 + index);
    this.page.once('dialog', dialog => dialog.accept());
    await deleteButton.click();
    await this.page.waitForTimeout(500);
  }

  // ============ TAB 2: CIBIL SCORES OF DIRECTORS ============

  // Get Tab 2 row locators
  private getCibilDirectorRowLocators(index: number) {
    return {
      nameOfPromoter: this.page.locator(`#lodNameOfPromoter${index + 1}`),
      panNumber: this.page.getByRole('textbox').nth(4 + (index * 3)),
      cibilScore: this.page.locator(`#lodCibilScorecsd${index}`),
      viewCibilSummary: this.page.getByRole('button', { name: 'View CIBIL summary' }).nth(index),
    };
  }

  // Fill existing CIBIL Director row (check and fill only if empty)
  public async fillCibilDirectorRow(data: any, index: number = 0) {
    const cibilScore = this.page.locator(`#lodCibilScorecsd${index}`);
    
    if (data.cibilScore) {
      await this.fillIfEmpty(cibilScore, String(data.cibilScore));
    }
  }

  // Add new CIBIL Director row
  public async addCibilDirector(data: any, index: number = 0) {
    if (index > 0) {
      await this.clickAddNew();
    }
    
    const nameField = this.page.locator(`#lodNameOfPromoter${index + 1}`);
    const cibilScore = this.page.locator(`#lodCibilScorecsd${index}`);
    
    if (data.nameOfPromoter) {
      await this.fillIfEmpty(nameField, String(data.nameOfPromoter));
    }
    if (data.cibilScore) {
      await cibilScore.fill(String(data.cibilScore));
    }
  }

  // Fill CIBIL Remarks Rich Text Editor
  public async fillCibilRemarks(text: string) {
    await this.fillRichTextEditor(text);
  }

  // ============ TAB 3: CIBIL SCORES OF COMPANY ============

  // Get Tab 3 row locators
  private getCompanyCibilRowLocators(index: number) {
    return {
      nameOfPromoter: this.page.locator(`#cscNameOfPromoter${index}`),
      panNumber: this.page.locator(`#cscPanNumber${index}`),
      cibilScore: this.page.locator('#cscCibilScore').nth(index),
    };
  }

  // Fill Company CIBIL row (check and fill only if empty)
  public async fillCompanyCibilRow(data: any, index: number = 0) {
    const fields = this.getCompanyCibilRowLocators(index);
    
    if (data.nameOfPromoter) {
      await this.fillIfEmpty(fields.nameOfPromoter, String(data.nameOfPromoter));
    }
    if (data.panNumber) {
      await this.fillIfEmpty(fields.panNumber, String(data.panNumber));
    }
    if (data.cibilScore) {
      await this.fillIfEmpty(fields.cibilScore, String(data.cibilScore));
    }
  }

  // Add new Company CIBIL row
  public async addCompanyCibilRow(data: any, index: number = 0) {
    if (index > 0) {
      await this.clickAddNew();
    }
    
    const fields = this.getCompanyCibilRowLocators(index);
    
    if (data.nameOfPromoter) {
      await fields.nameOfPromoter.fill(String(data.nameOfPromoter));
    }
    if (data.panNumber) {
      await fields.panNumber.fill(String(data.panNumber));
    }
    if (data.cibilScore) {
      await fields.cibilScore.fill(String(data.cibilScore));
    }
  }

  // Fill Company CIBIL Remarks
  public async fillCompanyCibilRemarks(text: string) {
    await this.fillRichTextEditor(text);
  }

  // ============ TAB 4: OTHER INFORMATION ============

  // Fill CRILC Date (using date picker or direct fill)
  public async fillCrilcDate(date: string) {
    await this.otherInfoDate.fill(date);
  }

  // Fill Guarantee Remarks (first rich text in Tab 4)
  public async fillGuaranteeRemarks(text: string) {
    await this.otherInfoGuaranteeRemarks.click();
    await this.otherInfoGuaranteeRemarks.fill(text);
  }

  // Click sub-tab by name and fill comments remarks
  private async clickSubTabAndFillRemarks(tabName: string, text: string) {
    // Sub-tabs can be either 'tab' or 'button' role depending on state
    const subTab = this.page.locator('[role="tab"], button').filter({ hasText: tabName }).first();
    await subTab.waitFor({ state: 'visible', timeout: 10000 });
    await subTab.click();
    await this.page.waitForTimeout(500);
    await this.otherInfoCommentsRemarks.click();
    await this.otherInfoCommentsRemarks.fill(text);
  }

  // Sub-tab: Whether reported to Central Fraud Registry [CFR]
  public async fillCentralFraudRegistry(text: string) {
    await this.clickSubTabAndFillRemarks('Whether reported to Central', text);
  }

  // Sub-tab: Any litigation in force
  public async fillLitigation(text: string) {
    await this.clickSubTabAndFillRemarks('Any litigation in force', text);
  }

  // Sub-tab: Whether account is taken / to be taken over
  public async fillAccountTakeover(text: string) {
    await this.clickSubTabAndFillRemarks('Whether account is taken / to', text);
  }

  // Sub-tab: Whether director/partner/proprietor is a director in our/other bank
  public async fillDirectorInBank(text: string) {
    await this.clickSubTabAndFillRemarks('Whether director / partner / proprietor is a director in our / other bank or is', text);
  }

  // Sub-tab: Whether director/partner/proprietor is a director
  public async fillDirectorProprietor(text: string) {
    const subTab = this.page.locator('[role="tab"], button').filter({ hasText: 'Whether director / partner / proprietor is a director' }).first();
    await subTab.waitFor({ state: 'visible', timeout: 10000 });
    await subTab.click();
    await this.page.waitForTimeout(500);
    await this.otherInfoCommentsRemarks.click();
    await this.otherInfoCommentsRemarks.fill(text);
  }

  // Sub-tab: Whether the name of the concern (first)
  public async fillRbiDefaulters(text: string) {
    const subTab = this.page.locator('[role="tab"], button').filter({ hasText: 'Whether the name of the' }).first();
    await subTab.waitFor({ state: 'visible', timeout: 10000 });
    await subTab.click();
    await this.page.waitForTimeout(500);
    await this.otherInfoCommentsRemarks.click();
    await this.otherInfoCommentsRemarks.fill(text);
  }

  // Sub-tab: Comments on Due Diligence
  public async fillDueDiligence(text: string) {
    await this.clickSubTabAndFillRemarks('Comments on Due Diligence *', text);
  }

  // Sub-tab: Comments on Credit report
  public async fillCreditReport(text: string) {
    await this.clickSubTabAndFillRemarks('Comments on Credit report (', text);
  }

  // Sub-tab: Background of concern/promoters
  public async fillBackgroundConcern(text: string) {
    await this.clickSubTabAndFillRemarks('Background of concern/', text);
  }

  // Sub-tab: Whether reported as Red Flagged account
  public async fillRedFlaggedAccount(text: string) {
    await this.clickSubTabAndFillRemarks('Whether reported as Red', text);
  }

  // Sub-tab: Whether reported as default Borrower
  public async fillCrilcReport(text: string) {
    await this.clickSubTabAndFillRemarks('Whether reported as default', text);
  }

  // Sub-tab: Central Economic Intelligence Bureau (CEIB) Report
  public async fillCeibReport(text: string) {
    await this.clickSubTabAndFillRemarks('Central Economic Intelligence', text);
  }

  // Sub-tab: Infrastructure Projects (FSA/ PPA)
  public async fillInfrastructureProjects(text: string) {
    await this.clickSubTabAndFillRemarks('Infrastructure Projects (FSA', text);
  }

  // Sub-tab: SCOD/ Extended SCOD
  public async fillScod(text: string) {
    await this.clickSubTabAndFillRemarks('SCOD/ Extended SCOD (In case', text);
  }

  // Sub-tab: Whether the name of the concern (second - duplicate)
  public async fillRbiDefaulters2(text: string) {
    const subTab = this.page.locator('[role="tab"], button').filter({ hasText: 'Whether the name of the' }).nth(1);
    await subTab.waitFor({ state: 'visible', timeout: 10000 });
    await subTab.click();
    await this.page.waitForTimeout(500);
    await this.otherInfoCommentsRemarks.click();
    await this.otherInfoCommentsRemarks.fill(text);
  }

  // Sub-tab: Name of such Director with name of the Bank
  public async fillDirectorNameBank(text: string) {
    await this.clickSubTabAndFillRemarks('Name of such Director with', text);
  }

  // Sub-tab: Type of Relation
  public async fillTypeOfRelation(text: string) {
    await this.clickSubTabAndFillRemarks('Type of Relation *', text);
  }

  // Fill all Other Information sub-tabs
  public async fillAllOtherInformation(data: any) {
    if (data.crilcDate) {
      await this.fillCrilcDate(String(data.crilcDate));
    }
    if (data.guaranteeRemarks) {
      await this.fillGuaranteeRemarks(String(data.guaranteeRemarks));
    }
    if (data.centralFraudRegistry) {
      await this.fillCentralFraudRegistry(String(data.centralFraudRegistry));
    }
    if (data.litigation) {
      await this.fillLitigation(String(data.litigation));
    }
    if (data.accountTakeover) {
      await this.fillAccountTakeover(String(data.accountTakeover));
    }
    if (data.directorInBank) {
      await this.fillDirectorInBank(String(data.directorInBank));
    }
    if (data.directorProprietor) {
      await this.fillDirectorProprietor(String(data.directorProprietor));
    }
    if (data.rbiDefaulters) {
      await this.fillRbiDefaulters(String(data.rbiDefaulters));
    }
    if (data.dueDiligence) {
      await this.fillDueDiligence(String(data.dueDiligence));
    }
    if (data.creditReport) {
      await this.fillCreditReport(String(data.creditReport));
    }
    if (data.backgroundConcern) {
      await this.fillBackgroundConcern(String(data.backgroundConcern));
    }
    if (data.redFlaggedAccount) {
      await this.fillRedFlaggedAccount(String(data.redFlaggedAccount));
    }
    if (data.crilcReport) {
      await this.fillCrilcReport(String(data.crilcReport));
    }
    if (data.ceibReport) {
      await this.fillCeibReport(String(data.ceibReport));
    }
    if (data.infrastructureProjects) {
      await this.fillInfrastructureProjects(String(data.infrastructureProjects));
    }
    if (data.scodExtended) {
      await this.fillScod(String(data.scodExtended));
    }
    if (data.directorNameBank) {
      await this.fillDirectorNameBank(String(data.directorNameBank));
    }
    if (data.typeOfRelation) {
      await this.fillTypeOfRelation(String(data.typeOfRelation));
    }
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await this.successAlert.waitFor({ state: 'visible', timeout: 5000 });
  }
}
