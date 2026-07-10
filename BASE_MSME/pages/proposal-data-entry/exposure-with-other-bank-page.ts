import { Locator, Page, expect } from "@playwright/test";

export class ExposureWithOtherBankPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  exposureWithOtherBankLink: Locator;
  
  // Section buttons
  editButton: Locator;
  saveButton: Locator;
  newExposureDetailButton: Locator;
  
  // Alert locators
  successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.exposureWithOtherBankLink = this.page.locator('a').filter({ hasText: 'Exposure with Other Bank' });
    
    // Section buttons
    this.editButton = this.page.locator('button[title="Edit"]').first();
    this.saveButton = this.page.locator('button[title="Save"]').first();
    this.newExposureDetailButton = this.page.getByRole('button', { name: 'New Exposure' });
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert', { name: /success/i }).first();
  }

  // Navigate to Exposure with Other Bank page
  public async navigateToExposureWithOtherBank() {
    await this.proposalDataEntryMenu.click();
    await this.exposureWithOtherBankLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.exposureWithOtherBankLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    console.log('Exposure with Other Bank page loaded');
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.editButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked Edit button');
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked Save button');
  }

  // Click New Exposure Detail button to add a new row
  public async clickNewExposureDetail() {
    await this.newExposureDetailButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.newExposureDetailButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked New Exposure Detail button');
  }

  // Fill exposure with other bank details
  public async fillExposureDetails(data: any, index: number = 0) {
    // Bank Name
    if (data.bankName) {
      const bankNameDropdown = await this.getRowDropdown(index, `#leeBankName${index}`, 0);
      await this.selectByValueOrLabel(bankNameDropdown, data.bankName, `Bank Name row ${index}`);
    }
    
    // Party Name
    if (data.partyName) {
      const partyNameDropdown = await this.getRowDropdown(index, `#leePartyId${index}`, 1);
      await this.selectByValueOrLabel(partyNameDropdown, data.partyName, `Party Name row ${index}`);
    }
    
    // Party Type
    if (data.partyType) {
      await this.page.locator(`#leePartyType${index}`).selectOption(String(data.partyType));
      console.log(`Selected Party Type: ${data.partyType}`);
    }
    
    // Facilities
    if (data.facilities) {
      await this.page.locator(`#leeFacilities${index}`).fill(String(data.facilities));
      console.log(`Filled Facilities: ${data.facilities}`);
    }
    
    // Sanction Amount
    if (data.sancAmt) {
      await this.page.locator(`#leeSancAmt${index}`).fill(String(data.sancAmt));
      console.log(`Filled Sanction Amount: ${data.sancAmt}`);
    }
    
    // Outstanding Amount
    if (data.osAmt) {
      await this.page.locator(`#leeOsAmt${index}`).fill(String(data.osAmt));
      console.log(`Filled Outstanding Amount: ${data.osAmt}`);
    }

    // Outstanding Date
    if (data.osDate) {
      await this.fillIfEnabled(`#leeOsDate${index}`, data.osDate, `Outstanding Date row ${index}`);
      console.log(`Filled Outstanding Date: ${data.osDate}`);
    }
    
    // Tenor
    if (data.tenor) {
      await this.page.locator(`#leeTenor${index}`).fill(String(data.tenor));
      console.log(`Filled Tenor: ${data.tenor}`);
    }
    
    // Margin
    if (data.margin) {
      await this.page.locator(`#leeMargin${index}`).fill(String(data.margin));
      console.log(`Filled Margin: ${data.margin}`);
    }
    
    // Is Overdue
    if (data.isOverdue) {
      await this.page.locator(`#leeIsOverdue${index}`).selectOption(String(data.isOverdue));
      await this.page.waitForTimeout(500);
      console.log(`Selected Is Overdue: ${data.isOverdue}`);
    }

    const isOverdue = String(data.isOverdue || '').toUpperCase();
    if (isOverdue === 'Y') {
      // Overdue
      if (data.overdue !== undefined && data.overdue !== '') {
        await this.fillRequiredEnabled(`#leeOverdue${index}`, data.overdue, `Overdue Amount row ${index}`);
        console.log(`Filled Overdue: ${data.overdue}`);
      }

      // Overdue Since
      if (data.overdueSince) {
        await this.fillRequiredEnabled(`#leeOverdueSince${index}`, data.overdueSince, `Overdue Since row ${index}`);
        console.log(`Filled Overdue Since: ${data.overdueSince}`);
      }
    } else if (isOverdue === 'N') {
      await expect(this.page.locator(`#leeOverdue${index}`)).toBeDisabled();
      await expect(this.page.locator(`#leeOverdueSince${index}`)).toBeDisabled();
      console.log(`Overdue and Overdue Since are disabled for row ${index}`);
    }
    
    // Asset Classification
    if (data.assetClassification) {
      await this.page.locator(`#leeAssetClassification${index}`).selectOption(String(data.assetClassification));
      console.log(`Selected Asset Classification: ${data.assetClassification}`);
    }

    // Takeover
    if (data.ourBank) {
      await this.checkRadioIfEnabled(`#leeOurBank${index}`, data.ourBank, `Takeover row ${index}`);
      await this.page.waitForTimeout(500);
    }

    const takeover = String(data.ourBank || '').toUpperCase();
    if (takeover === 'Y') {
      // Facility Description
      if (data.facilityDesc) {
        await this.selectRequiredEnabled(`#leeFacilityDesc${index}`, data.facilityDesc, `Facility Description row ${index}`);
      }

      // Loan Purpose
      if (data.loanPurpose) {
        await this.selectIfEnabled(`#leeLoanPurpose${index}`, data.loanPurpose, `Loan Purpose row ${index}`);
      }
    } else if (takeover === 'N') {
      console.log(`Facility Description skipped because Takeover is No for row ${index}`);
    }

    console.log(`Filled exposure with other bank details for row ${index}`);
  }

  private async selectByValueOrLabel(dropdown: Locator, value: any, fieldName: string) {
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    const expectedValue = String(value);
    const options = await dropdown.locator('option').evaluateAll(options =>
      options.map(option => ({
        value: (option as HTMLOptionElement).value,
        label: option.textContent?.trim() || ''
      }))
    );
    const matchingOption = options.find(option => option.value === expectedValue || option.label === expectedValue || option.label.includes(expectedValue));
    const optionToSelect = matchingOption || options.find(option => option.value && option.label !== '--Select--');
    if (!optionToSelect) throw new Error(`No options available for ${fieldName}`);
    await dropdown.selectOption(optionToSelect.value);
    console.log(`Selected ${fieldName}: ${optionToSelect.label} (${optionToSelect.value})`);
  }

  private async getRowDropdown(index: number, selector: string, dropdownIndex: number) {
    const dropdownById = this.page.locator(selector);
    if (await dropdownById.count() > 0) {
      return dropdownById;
    }

    const row = this.page.locator('tr').filter({ has: this.page.locator(`#leePartyType${index}`) }).first();
    await row.waitFor({ state: 'visible', timeout: 10000 });
    return row.getByRole('combobox').nth(dropdownIndex);
  }

  private async fillIfEnabled(selector: string, value: any, fieldName: string) {
    const field = this.page.locator(selector);
    await field.waitFor({ state: 'visible', timeout: 10000 });
    if (await field.isDisabled()) {
      console.log(`${fieldName} is disabled, skipped fill`);
      return;
    }
    await field.fill(String(value));
  }

  private async fillRequiredEnabled(selector: string, value: any, fieldName: string) {
    const field = this.page.locator(selector);
    await field.waitFor({ state: 'visible', timeout: 10000 });
    await expect(field).toBeEnabled({ timeout: 10000 });
    await field.fill(String(value));
  }

  private async selectIfEnabled(selector: string, value: any, fieldName: string) {
    const dropdown = this.page.locator(selector);
    if (await dropdown.count() === 0) {
      console.log(`${fieldName} not found, skipped selection`);
      return;
    }
    if (!await dropdown.isVisible() || await dropdown.isDisabled()) {
      console.log(`${fieldName} is hidden or disabled, skipped selection`);
      return;
    }
    await this.selectByValueOrLabel(dropdown, value, fieldName);
  }

  private async selectRequiredEnabled(selector: string, value: any, fieldName: string) {
    const dropdown = this.page.locator(selector);
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await expect(dropdown).toBeEnabled({ timeout: 10000 });
    await this.selectByValueOrLabel(dropdown, value, fieldName);
  }

  private async checkRadioIfEnabled(selector: string, value: any, fieldName: string) {
    const radio = this.page.locator(`${selector}[value="${String(value)}"]`);
    if (await radio.count() === 0) {
      console.log(`${fieldName} radio option not found, skipped selection`);
      return;
    }
    if (await radio.isDisabled()) {
      console.log(`${fieldName} radio option is disabled, skipped selection`);
      return;
    }
    await radio.check();
    console.log(`Selected ${fieldName}: ${value}`);
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await expect(this.successAlert).toBeVisible({ timeout: 5000 });
  }
}
