import { Locator, Page } from "@playwright/test";

export class GroupCompaniesFinancialPage {
  page: Page;
  
  // Navigation
  financialAnalysisMenu: Locator;
  groupCompaniesFinancialLink: Locator;
  
  // Action buttons
  editButton: Locator;
  saveButton: Locator;
  deleteButton: Locator;
  
  // Company Name fields (8 companies)
  nameOfParty1: Locator;
  nameOfParty2: Locator;
  nameOfParty3: Locator;
  nameOfParty4: Locator;
  nameOfParty5: Locator;
  nameOfParty6: Locator;
  nameOfParty7: Locator;
  nameOfParty8: Locator;
  
  // Year of Financial fields (8 years)
  yearOfFinancial1: Locator;
  yearOfFinancial2: Locator;
  yearOfFinancial3: Locator;
  yearOfFinancial4: Locator;
  yearOfFinancial5: Locator;
  yearOfFinancial6: Locator;
  yearOfFinancial7: Locator;
  yearOfFinancial8: Locator;
  
  // Alert locators
  successAlert: Locator;
  errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.financialAnalysisMenu = this.page.getByRole('link', { name: ' Financial Analysis' });
    this.groupCompaniesFinancialLink = this.page.locator('a').filter({ hasText: 'Group Companies Financial' });
    
    // Action buttons
    this.editButton = this.page.getByRole('button', { name: 'Edit' });
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
    this.deleteButton = this.page.getByRole('button', { name: 'Delete' });
    
    // Company Name fields - first 6 use nth, last 2 use ID
    this.nameOfParty1 = this.page.getByRole('textbox').first();
    this.nameOfParty2 = this.page.getByRole('textbox').nth(1);
    this.nameOfParty3 = this.page.getByRole('textbox').nth(2);
    this.nameOfParty4 = this.page.getByRole('textbox').nth(3);
    this.nameOfParty5 = this.page.getByRole('textbox').nth(4);
    this.nameOfParty6 = this.page.getByRole('textbox').nth(5);
    this.nameOfParty7 = this.page.locator('#nameOfTheParty7');
    this.nameOfParty8 = this.page.locator('#nameOfTheParty8');
    
    // Year of Financial fields
    this.yearOfFinancial1 = this.page.locator('#yearOfFinancial1');
    this.yearOfFinancial2 = this.page.locator('#yearOfFinancial2');
    this.yearOfFinancial3 = this.page.locator('#yearOfFinancial3');
    this.yearOfFinancial4 = this.page.locator('#yearOfFinancial4');
    this.yearOfFinancial5 = this.page.locator('#yearOfFinancial5');
    this.yearOfFinancial6 = this.page.locator('#yearOfFinancial6');
    this.yearOfFinancial7 = this.page.locator('#yearOfFinancial7');
    this.yearOfFinancial8 = this.page.locator('#yearOfFinancial8');
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert').filter({ hasText: /success/i }).first();
    this.errorAlert = this.page.getByRole('alert').filter({ hasText: /error|fail|invalid|required/i }).first();
  }

  // Navigate to Group Companies Financial page
  public async navigateToGroupCompaniesFinancial() {
    await this.financialAnalysisMenu.click();
    await this.groupCompaniesFinancialLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.groupCompaniesFinancialLink.click();
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

  // Fill company names
  public async fillCompanyNames(data: any) {
    if (data.company1) {
      await this.nameOfParty1.click();
      await this.nameOfParty1.fill(String(data.company1));
    }
    if (data.company2) {
      await this.nameOfParty2.click();
      await this.nameOfParty2.fill(String(data.company2));
    }
    if (data.company3) {
      await this.nameOfParty3.click();
      await this.nameOfParty3.fill(String(data.company3));
    }
    if (data.company4) {
      await this.nameOfParty4.click();
      await this.nameOfParty4.fill(String(data.company4));
    }
    if (data.company5) {
      await this.nameOfParty5.click();
      await this.nameOfParty5.fill(String(data.company5));
    }
    if (data.company6) {
      await this.nameOfParty6.click();
      await this.nameOfParty6.fill(String(data.company6));
    }
    if (data.company7) {
      await this.nameOfParty7.click();
      await this.nameOfParty7.fill(String(data.company7));
    }
    if (data.company8) {
      await this.nameOfParty8.click();
      await this.nameOfParty8.fill(String(data.company8));
    }
  }

  // Fill year of financial fields
  public async fillYearOfFinancial(data: any) {
    if (data.year1) {
      await this.yearOfFinancial1.click();
      await this.yearOfFinancial1.fill(String(data.year1));
    }
    if (data.year2) {
      await this.yearOfFinancial2.click();
      await this.yearOfFinancial2.fill(String(data.year2));
    }
    if (data.year3) {
      await this.yearOfFinancial3.click();
      await this.yearOfFinancial3.fill(String(data.year3));
    }
    if (data.year4) {
      await this.yearOfFinancial4.click();
      await this.yearOfFinancial4.fill(String(data.year4));
    }
    if (data.year5) {
      await this.yearOfFinancial5.click();
      await this.yearOfFinancial5.fill(String(data.year5));
    }
    if (data.year6) {
      await this.yearOfFinancial6.click();
      await this.yearOfFinancial6.fill(String(data.year6));
    }
    if (data.year7) {
      await this.yearOfFinancial7.click();
      await this.yearOfFinancial7.fill(String(data.year7));
    }
    if (data.year8) {
      await this.yearOfFinancial8.click();
      await this.yearOfFinancial8.fill(String(data.year8));
    }
  }

  // Fill all group companies financial data
  public async fillGroupCompaniesFinancialData(data: any) {
    await this.fillCompanyNames(data);
    await this.fillYearOfFinancial(data);
  }

  // Complete Group Companies Financial flow
  public async completeGroupCompaniesFinancialEntry(data: any) {
    await this.clickEdit();
    await this.fillGroupCompaniesFinancialData(data);
    await this.clickSave();
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await this.successAlert.waitFor({ state: 'visible', timeout: 5000 });
  }
}
