import { Locator, Page } from "@playwright/test";

export class ZdmSalesLoanPage {
  page: Page;
  salesLoanDetailsTab: Locator;
  openLoanDetailsButton: Locator;
  checkFinancierEligibilityButton: Locator;
  okButton: Locator;
  confirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.salesLoanDetailsTab = this.page.getByText('Sales & Loan Details');
    this.openLoanDetailsButton = this.page.getByRole('button', { name: 'Open Loan details' });
    this.checkFinancierEligibilityButton = this.page.getByRole('button', { name: 'Check Financier Eligibility' });
    this.okButton = this.page.getByRole('button', { name: 'Ok' });
    this.confirmButton = this.page.getByRole('button', { name: 'Confirm' });
  }

  // Navigate to Sales & Loan Details tab
  public async openSalesLoanDetailsTab() {
    await this.salesLoanDetailsTab.click();
  }

  // ZDM completes Sales & Loan Details - Open Loan details and Check Financier Eligibility
  public async completeSalesLoanAsZdm(data: any) {
    // Navigate to Sales & Loan Details tab
    await this.openSalesLoanDetailsTab();

    // Click Open Loan details button
    await this.openLoanDetailsButton.click();

    // Click Check Financier Eligibility
    await this.checkFinancierEligibilityButton.click();
    await this.okButton.click();

    // Confirm and Ok
    await this.confirmButton.click();
    await this.okButton.click();
  }
}
