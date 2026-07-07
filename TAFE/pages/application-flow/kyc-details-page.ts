import { expect, Locator, Page } from "@playwright/test";

export class KycDetailsPage{
    page:Page;
    individualOption:Locator;
    disclaimerCheckbox:Locator;
    aadhaarInput:Locator;
    panInput:Locator;
    voterIdInput:Locator;
    existingCustomerButton:Locator;
    newButton:Locator;
    applicantNameInput:Locator;
    dobInput:Locator;
    yearButton:Locator;
    previousMonthButton:Locator;
    maleOption:Locator;
    fatherHusbandNameInput:Locator;
    alternateMobileInput:Locator;
    emailInput:Locator;
    agriOption:Locator;
    govtOption:Locator;
    tenureInput:Locator;
    ownedOption:Locator;
    residenceYearsInput:Locator;
    marriedOption:Locator;
    ratingThreeIcon:Locator;
    nextButton:Locator;
    permanentKycTypeAadhaar:Locator;
    permanentAddressLine1Input:Locator;
    stateSelect:Locator;
    districtSelect:Locator;
    talukSelect:Locator;
    villageSelect:Locator;
    stateDropdownAnchor:Locator;
    stateSelectedValue:Locator;
    stateSearchbox:Locator;
    districtDropdown:Locator;
    talukDropdown:Locator;
    villageDropdown:Locator;
    permanentPincodeInput:Locator;
    copyAddressCheckbox:Locator;
    saveButton:Locator;
    generateLeadScoreButton:Locator;
    closeButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.individualOption=this.page.getByText('Individual');
        this.disclaimerCheckbox=this.page.locator('#disclaimer');
        this.aadhaarInput=this.page.getByRole('textbox', { name: '-....-....' });
        this.panInput=this.page.locator('#panNo');
        this.voterIdInput=this.page.locator('#voterId');
        this.existingCustomerButton=this.page.getByRole('button', { name: 'Check if existing customer' });
        this.newButton=this.page.getByRole('button', { name: 'New' });
        this.applicantNameInput=this.page.locator('#appName').nth(1);
        this.dobInput=this.page.getByRole('textbox', { name: 'dd/mm/yyyy' });
        this.yearButton=this.page.getByRole('button', { name: '2026' });
        this.previousMonthButton=this.page.getByRole('button', { name: '‹' });
        this.maleOption=this.page.getByText('Male', { exact: true });
        this.fatherHusbandNameInput=this.page.locator('sai-input').filter({ hasText: 'Father / Husband name *' }).locator('#fatherHusbName');
        this.alternateMobileInput=this.page.locator('input[name="altMobnumber"]');
        this.emailInput=this.page.getByRole('textbox', { name: 'Enter Email ID' });
        this.agriOption=this.page.getByText('Agri');
        this.govtOption=this.page.getByText('Govt');
        this.tenureInput=this.page.locator('input[name="tenure"]');
        this.ownedOption=this.page.getByText('Owned');
        this.residenceYearsInput=this.page.locator('input[name="resYears"]');
        this.marriedOption=this.page.getByText('Married', { exact: true });
        this.ratingThreeIcon=this.page.getByTitle('Rate 3').locator('path');
        this.nextButton=this.page.getByRole('button', { name: 'Next' });
        this.permanentKycTypeAadhaar=this.page.locator('#permKycType').getByText('Aadhaar');
        this.permanentAddressLine1Input=this.page.locator('#permAdd1Focus').getByRole('textbox');
        this.stateSelect=this.page.locator('#perm_state');
        this.districtSelect=this.page.locator('#perm_district');
        this.talukSelect=this.page.locator('#perm_taluk');
        this.villageSelect=this.page.locator('#perm_village');
        this.stateDropdownAnchor=this.page.getByLabel('', { exact: true }).first();
        this.stateSelectedValue=this.page.locator('#select2-perm_state-container');
        this.stateSearchbox=this.page.getByRole('searchbox');
        this.districtDropdown=this.page.locator('#select2-perm_district-container');
        this.talukDropdown=this.page.locator('#select2-perm_taluk-container');
        this.villageDropdown=this.page.locator('#select2-perm_village-container');
        this.permanentPincodeInput=this.page.locator('#perm_pincode').nth(1);
        this.copyAddressCheckbox=this.page.locator('#copyAddress');
        this.saveButton=this.page.getByRole('button', { name: 'Save' });
        this.generateLeadScoreButton=this.page.getByRole('button', { name: 'Generate Lead Score' });
        this.closeButton=this.page.getByRole('button', { name: 'Close', exact: true });
    }

    // Fill KYC details and submit
    public async fillKycDetails(data: any) {
        await this.individualOption.click();
        await this.disclaimerCheckbox.check();
        await this.aadhaarInput.fill(String(data.aadhaarNumber));
        await this.panInput.fill(String(data.panNumber));
        await this.voterIdInput.click();
        await this.existingCustomerButton.click();
        await this.newButton.click();
        await this.applicantNameInput.fill(String(data.applicantName));

        await this.selectDateOfBirth(data.birthYear, data.birthMonth, data.birthDay);

        await this.maleOption.click();
        await this.fatherHusbandNameInput.fill(String(data.fatherOrHusbandName));
        await this.alternateMobileInput.fill(String(data.alternateMobileNumber));
        await this.emailInput.fill(String(data.email));
        await this.agriOption.click();
        await this.govtOption.click();
        await this.tenureInput.fill(String(data.tenureMonths));
        await this.ownedOption.click();
        await this.residenceYearsInput.fill(String(data.residenceYears));
        await this.marriedOption.click();
        await this.ratingThreeIcon.click();
        await this.nextButton.click();
        

        await this.permanentKycTypeAadhaar.click();
        await this.page.waitForTimeout(500); // Wait for address fields to load based on KYC type selection
        await this.permanentAddressLine1Input.fill(String(data.permanentAddressLine1));

        await this.selectNativeOptionByLabel(this.stateSelect, String(data.stateName));
        await expect(this.stateSelectedValue).toContainText(String(data.stateName));

        await this.waitForDependentSelectOptions(this.districtSelect);
        await this.selectNativeOptionByLabel(this.districtSelect, String(data.districtName));
        await expect(this.districtDropdown).toContainText(String(data.districtName));

        await this.waitForDependentSelectOptions(this.talukSelect);
        await this.selectNativeOptionByLabel(this.talukSelect, String(data.talukName));
        await expect(this.talukDropdown).toContainText(String(data.talukName));

        await this.waitForDependentSelectOptions(this.villageSelect);
        await this.selectNativeOptionByLabel(this.villageSelect, String(data.villageName));
        await expect(this.villageDropdown).toContainText(String(data.villageName));

        await this.permanentPincodeInput.fill(String(data.permanentPincode));
        await this.copyAddressCheckbox.check();
        await this.saveButton.click();
        await expect(this.generateLeadScoreButton).toBeVisible();
        await this.generateLeadScoreButton.click();
        await this.closeButton.click();
    }

    // Pick date from date picker controls
    public async selectDateOfBirth(year: any, month: any, day: any) {
        await this.dobInput.click();
        await this.yearButton.click();
        await this.previousMonthButton.click();
        await this.previousMonthButton.click();
        await this.page.getByText(String(year)).click();
        await this.page.getByText(String(month)).click();
        await this.page.getByText(String(day), { exact: true }).click();
    }

    // Select value from native select by label
    public async selectNativeOptionByLabel(selectLocator: Locator, label: any) {
        await selectLocator.waitFor({ state: 'attached', timeout: 15000 });
        await selectLocator.selectOption({ label: String(label) });
    }

    // Wait until dependent select options are populated
    public async waitForDependentSelectOptions(selectLocator: Locator) {
        await selectLocator.waitFor({ state: 'attached', timeout: 15000 });
        const selector = await selectLocator.evaluate((el) => `#${(el as HTMLElement).id}`);
        await this.page.waitForFunction((cssSelector) => {
            const select = document.querySelector(cssSelector) as HTMLSelectElement | null;
            if (!select) return false;
            const options = Array.from(select.options).filter((option) => option.value && option.value.trim() !== '');
            return options.length > 0;
        }, selector);
    }
}
