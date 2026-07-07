import { Locator, Page } from "@playwright/test";

export class SalesLoanDetailsPage {
  page: Page;
  salesLoanDetailsTab: Locator;
  openLoanDetailsButton: Locator;
  loanCategorySelect: Locator;
  dealValueInput: Locator;
  marginInCashInput: Locator;
  exchangeYesOption: Locator;
  exchangeNoOption: Locator;
  oldTractorValueInput: Locator;
  tenureMonthsSelect: Locator;
  modeEmiSelect: Locator;
  freeOption: Locator;
  nominalOwnershipInput: Locator;
  hypothecationNoOption: Locator;
  hypothecationYesOption: Locator;
  saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.salesLoanDetailsTab = this.page.getByText('Sales & Loan Details');
    this.openLoanDetailsButton = this.page.getByRole('button', { name: 'Open Loan details' });
    this.loanCategorySelect = this.page.locator('#aldLoanCategory');
    this.dealValueInput = this.page.locator('input[name="dealValue"]');
    this.marginInCashInput = this.page.locator('input[name="marginInCash"]');
    this.exchangeYesOption = this.page.locator('#yesNo').getByText('Yes');
    this.exchangeNoOption = this.page.locator('#yesNo').getByText('No');
    this.oldTractorValueInput = this.page.locator('input[name="aldValOldTracter"]');
    this.tenureMonthsSelect = this.page.locator('#tenuremonths').getByRole('combobox');
    this.modeEmiSelect = this.page.locator('#modeemi').getByRole('combobox');
    this.freeOption = this.page.getByText('Free');
    this.nominalOwnershipInput = this.page.locator('input[name="aldNomOwnership"]');
    this.hypothecationNoOption = this.page.getByText('No', { exact: true }).nth(1);
    this.hypothecationYesOption = this.page.getByText('Yes', { exact: true }).nth(1);
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
  }

  // Wait for loader to disappear
  private async waitForLoaderToHide() {
    const loader = this.page.locator('#loader');
    await loader.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {
      console.log('Loader timeout, continuing...');
    });
  }

  // Navigate to Sales & Loan Details section
  public async openSalesLoanDetails() {
    await this.salesLoanDetailsTab.click();
    await this.openLoanDetailsButton.click();
  }

  // Fill Sales & Loan Details form
  public async fillSalesLoanDetails(data: any) {
    await this.openSalesLoanDetails();

    // Select loan category
    if (data.loanCategory) {
      await this.loanCategorySelect.selectOption(String(data.loanCategory));
    }

    // Fill deal value
    if (data.dealValue) {
      await this.dealValueInput.click();
      await this.dealValueInput.fill(String(data.dealValue));
    }

    // Fill margin in cash
    if (data.marginInCash) {
      await this.marginInCashInput.click();
      await this.marginInCashInput.fill(String(data.marginInCash));
    }

    // Select exchange option (Yes/No)
    if (data.hasExchange === 'Yes' || data.hasExchange === true) {
      await this.exchangeYesOption.click();
      // Fill old tractor value if exchange is Yes
      if (data.oldTractorValue) {
        await this.oldTractorValueInput.click();
        await this.oldTractorValueInput.fill(String(data.oldTractorValue));
      }
    } else if (data.hasExchange === 'No' || data.hasExchange === false) {
      await this.exchangeNoOption.click();
    }

    // Select tenure months
    if (data.tenureMonths) {
      await this.tenureMonthsSelect.selectOption(String(data.tenureMonths));
    }

    // Select EMI mode
    if (data.emiMode) {
      await this.modeEmiSelect.selectOption(String(data.emiMode));
    }

    // Select Free option if specified
    if (data.selectFree === 'Yes' || data.selectFree === true) {
      await this.freeOption.click();
    }

    // Fill nominal ownership
    if (data.nominalOwnership) {
      await this.nominalOwnershipInput.click();
      await this.nominalOwnershipInput.fill(String(data.nominalOwnership));
    }

    // Select hypothecation option
    if (data.hypothecation === 'No' || data.hypothecation === false) {
      await this.hypothecationNoOption.click();
    } else if (data.hypothecation === 'Yes' || data.hypothecation === true) {
      await this.hypothecationYesOption.click();
    }

    // Save the form
    await this.saveButton.click();
    
    // Wait for loader to hide after save
    await this.waitForLoaderToHide();
    console.log('Sales & Loan Details saved successfully');
  }
}
