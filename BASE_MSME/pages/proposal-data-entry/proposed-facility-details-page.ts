import { Locator, Page, expect } from "@playwright/test";

export class ProposedFacilityDetailsPage {
  page: Page;
  
  // Navigation
  proposalDataEntryMenu: Locator;
  proposedFacilityDetailsLink: Locator;
  
  // Section buttons
  editButton: Locator;
  saveButton: Locator;
  
  // Alert locators
  successAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.proposalDataEntryMenu = this.page.getByRole('link', { name: ' Proposal Data Entry' });
    this.proposedFacilityDetailsLink = this.page.locator('a').filter({ hasText: 'Proposed facility details' });
    
    // Section buttons
    this.editButton = this.page.locator('button[title="Edit"]').first();
    this.saveButton = this.page.locator('button[title="Save"]').first();
    
    // Alert locators
    this.successAlert = this.page.getByRole('alert', { name: /success/i }).first();
  }

  // Navigate to Proposed Facility Details page
  public async navigateToProposedFacilityDetails() {
    await this.proposalDataEntryMenu.click();
    await this.proposedFacilityDetailsLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.proposedFacilityDetailsLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    console.log('Proposed Facility Details page loaded');
  }

  // Click Edit button
  public async clickEdit() {
    await this.editButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.editButton.click();
    await this.page.waitForTimeout(1000);
    console.log('Clicked Proposed Facility Edit button');
  }

  // Click Save button
  public async clickSave() {
    await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked Proposed Facility Save button');
  }

  // Fill proposed facility details
  public async fillProposedFacilityDetails(data: any, index: number = 0) {
    if (data.loanType) {
      await this.selectVisibleById(`lfLoanType${index}`, data.loanType, `Loan Type row ${index}`);
    }

    if (data.bankArrangement) {
      await this.selectById(`lfBankArrangement${index}`, data.bankArrangement, `Banking Arrangement row ${index}`);
    }

    if (data.existingLimit !== undefined && data.existingLimit !== '') {
      await this.fillById(`lfExistLimit${index}`, data.existingLimit, `Existing Limit row ${index}`);
    }

    if (data.outstandingBalance !== undefined && data.outstandingBalance !== '') {
      await this.fillById(`lfOsLimit${index}`, data.outstandingBalance, `Outstanding Balance row ${index}`);
    }

    if (data.leadBankIsOur) {
      await this.checkRadioByValue(`lfIsUBI${index}`, data.leadBankIsOur, `Lead Bank is OUR row ${index}`);
    }

    if (data.limitWithOtherBank !== undefined && data.limitWithOtherBank !== '') {
      await this.fillById(`lfPropLimOtherBank${index}`, data.limitWithOtherBank, `Limit with Other Bank row ${index}`);
    }

    if (data.proposedLimit !== undefined && data.proposedLimit !== '') {
      await this.fillById(`lfProposedLimit${index}`, data.proposedLimit, `Proposed Limit row ${index}`);
    }

    if (data.projectCost !== undefined && data.projectCost !== '') {
      await this.fillById(`lfProjectCost${index}`, data.projectCost, `Project Cost row ${index}`);
    }

    if (data.tenor !== undefined && data.tenor !== '') {
      await this.fillById(`lfTenor${index}`, data.tenor, `Tenor row ${index}`);
    }

    if (data.moratorium !== undefined && data.moratorium !== '') {
      await this.fillById(`lfMoratorium${index}`, data.moratorium, `Moratorium row ${index}`);
    }

    if (data.roiType) {
      await this.selectById(`lfRoiType${index}`, data.roiType, `ROI Type row ${index}`);
    }

    if (data.roi !== undefined && data.roi !== '') {
      await this.fillById(`lfExistLmtROI${index}`, data.roi, `ROI/Commission row ${index}`);
    }

    if (data.spreadValue !== undefined && data.spreadValue !== '') {
      await this.fillById(`lfExistLmtSpread${index}`, data.spreadValue, `Spread Value row ${index}`);
    }

    if (data.roiApplicable !== undefined && data.roiApplicable !== '') {
      await this.fillById(`lfRoiApplicable${index}`, data.roiApplicable, `ROI Applicable row ${index}`);
    }

    if (data.margin !== undefined && data.margin !== '') {
      await this.fillById(`lfMargin${index}`, data.margin, `Margin row ${index}`);
    }

    if (data.facilitySecure) {
      await this.selectById(`lfFacSecure${index}`, data.facilitySecure, `Facility Secure row ${index}`);
    }

    if (data.revolving) {
      await this.checkRevolving(index, data.revolving);
    }

    if (data.govtCoverage) {
      await this.selectById(`lfFacCovered${index}`, data.govtCoverage, `Govt Coverage row ${index}`);
      await this.page.waitForTimeout(500);
    }

    const govtCoverage = String(data.govtCoverage || '').toUpperCase();
    if ((govtCoverage === '1' || govtCoverage === 'YES' || govtCoverage === 'Y') && data.coverageName) {
      await this.selectIfEnabled(`lfCoverageName${index}`, data.coverageName, `Coverage Name row ${index}`);
    } else {
      console.log(`Coverage Name skipped for row ${index}`);
    }

    console.log(`Filled proposed facility details for row ${index}`);
  }

  // Verify success alert
  public async verifySuccessAlert() {
    await this.page.waitForTimeout(2000);
    console.log('Proposed facility details saved successfully');
  }

  private async fillById(id: string, value: any, fieldName: string) {
    const field = this.page.locator(`#${id}`);
    if (await field.count() === 0) {
      console.log(`${fieldName} not found, skipped fill`);
      return;
    }
    await field.waitFor({ state: 'visible', timeout: 10000 });
    if (await field.isDisabled()) {
      console.log(`${fieldName} is disabled, skipped fill`);
      return;
    }
    await field.fill(String(value));
    console.log(`Filled ${fieldName}: ${value}`);
  }

  private async selectById(id: string, value: any, fieldName: string) {
    const dropdown = this.page.locator(`#${id}`);
    if (await dropdown.count() === 0) {
      console.log(`${fieldName} not found, skipped selection`);
      return;
    }
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    if (await dropdown.isDisabled()) {
      console.log(`${fieldName} is disabled, skipped selection`);
      return;
    }
    await this.selectByValueOrLabel(dropdown, value, fieldName);
  }

  private async selectVisibleById(id: string, value: any, fieldName: string) {
    const dropdown = await this.getVisibleLocatorById(id);
    if (!dropdown) {
      console.log(`${fieldName} visible dropdown not found, skipped selection`);
      return;
    }
    if (await dropdown.isDisabled()) {
      console.log(`${fieldName} is disabled, skipped selection`);
      return;
    }
    await this.selectByValueOrLabel(dropdown, value, fieldName);
  }

  private async selectIfEnabled(id: string, value: any, fieldName: string) {
    const dropdown = this.page.locator(`#${id}`);
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

  private async checkRadioByValue(id: string, value: any, fieldName: string) {
    const radio = this.page.locator(`input[id="${id}"][value="${String(value)}"]`);
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

  private async checkRevolving(index: number, value: any) {
    const revolving = String(value).toUpperCase();
    const selector = revolving === 'Y' ? `#lfFacRevolving${index}` : `#lfFacRevolving0_${index}`;
    const radio = this.page.locator(selector);
    if (await radio.count() === 0 || await radio.isDisabled()) {
      console.log(`Revolving row ${index} is not selectable, skipped selection`);
      return;
    }
    await radio.check();
    console.log(`Selected Revolving row ${index}: ${value}`);
  }

  private async selectByValueOrLabel(dropdown: Locator, value: any, fieldName: string) {
    const expectedValue = String(value);
    const options = await dropdown.locator('option').evaluateAll(options =>
      options.map(option => ({
        value: (option as HTMLOptionElement).value,
        label: option.textContent?.trim() || '',
        disabled: (option as HTMLOptionElement).disabled
      }))
    );
    const matchingOption = options.find(option => !option.disabled && (option.value === expectedValue || option.label === expectedValue || option.label.includes(expectedValue)));
    const optionToSelect = matchingOption || options.find(option => !option.disabled && option.value && !option.label.includes('Select'));
    if (!optionToSelect) {
      console.log(`No selectable options available for ${fieldName}, skipped selection`);
      return;
    }
    await dropdown.selectOption(optionToSelect.value);
    console.log(`Selected ${fieldName}: ${optionToSelect.label} (${optionToSelect.value})`);
  }

  private async getVisibleLocatorById(id: string) {
    const locators = this.page.locator(`[id="${id}"]`);
    const count = await locators.count();
    for (let locatorIndex = 0; locatorIndex < count; locatorIndex++) {
      const locator = locators.nth(locatorIndex);
      if (await locator.isVisible()) {
        return locator;
      }
    }
    return null;
  }
}
