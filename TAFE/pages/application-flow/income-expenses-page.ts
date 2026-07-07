import { expect, Locator, Page } from "@playwright/test";

export class IncomeExpensesPage{
    page:Page;
    incomeExpensesTab:Locator;
    landOwnershipOwned:Locator;
    landAcresInput:Locator;
    freeLandOption:Locator;
    irrigatedOption:Locator;
    cropSearchIcon:Locator;
    cropOption6:Locator;
    cropOption7:Locator;
    cropCloseButton:Locator;
    saveButton:Locator;
    incomeSlider:Locator;
    grossIncomeInput:Locator;
    emiRepayInput:Locator;
    bankCodeSearchIcon:Locator;
    stateBankOfIndiaCell:Locator;
    existingBankSearchIcon:Locator;
    existingBankTextbox:Locator;
    existingBankCheck0:Locator;
    closeButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.incomeExpensesTab=this.page.getByText('Income & Expenses').first();
        this.landOwnershipOwned=this.page.getByText('Owned');
        this.landAcresInput=this.page.getByRole('textbox').first();
        this.freeLandOption=this.page.getByText('Free Land');
        this.irrigatedOption=this.page.getByText('Irrigated ?');
        this.cropSearchIcon=this.page.locator('.existingSearch').first();
        this.cropOption6=this.page.locator('#cropCheck6');
        this.cropOption7=this.page.locator('#cropCheck7');
        this.cropCloseButton=this.page.locator('#cropModel').getByRole('button', { name: 'Close' });
        this.saveButton=this.page.getByRole('button', { name: 'Save' });
        this.incomeSlider=this.page.locator('#incomeSlideId');
        this.grossIncomeInput=this.page.locator('#fotherIncomesBasicid input[name="oiedGrossIncome1"]');
        this.emiRepayInput=this.page.locator('#fotherIncomesBasicid input[name="oiedEmiRepay1"]');
        this.bankCodeSearchIcon=this.page.locator('#oiedBankCodeFldB > .existingSearch > .landseachicon > .fa');
        this.stateBankOfIndiaCell=this.page.getByRole('cell', { name: 'STATE BANK OF INDIA' });
        this.existingBankSearchIcon=this.page.locator('#oiedExistingBankDeskB > .existingSearch > .landseachicon > .fa');
        this.existingBankTextbox=this.page.locator('#bank').getByRole('textbox');
        this.existingBankCheck0=this.page.locator('#bnkCheck0');
        this.closeButton=this.page.getByRole('button', { name: 'Close' });
    }

    // Wait for loader to disappear
    private async waitForLoaderToHide() {
        const loader = this.page.locator('#loader');
        await loader.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {
            console.log('Loader timeout, continuing...');
        });
    }

    // Fill Income & Expenses details and save
    public async fillIncomeAndExpenses(data: any) {
        // Skip tab click if already on the tab (navigated via step)
        const isTabActive = await this.incomeExpensesTab.getAttribute('class');
        if (!isTabActive?.includes('wizardactivetab')) {
            await this.incomeExpensesTab.click();
        }
        
        await this.landOwnershipOwned.click();
        await this.landAcresInput.click();
        await this.landAcresInput.fill(String(data.landOwnedAcres));
        await this.freeLandOption.click();
        await this.irrigatedOption.click();

        await this.cropSearchIcon.click();
        await this.cropOption6.check();
        await this.cropOption7.check();
        await this.cropCloseButton.click();
        await this.saveButton.click();
        
        // Wait for loader to hide after save
        await this.waitForLoaderToHide();

        await this.incomeSlider.click();
        await this.grossIncomeInput.fill(String(data.grossIncome));
        await this.emiRepayInput.fill(String(data.emiRepayment));
        await this.bankCodeSearchIcon.click();
        await this.stateBankOfIndiaCell.click();

        await this.existingBankSearchIcon.click();
        await this.existingBankTextbox.fill(String(data.existingBankName));
        await this.existingBankCheck0.check();
        await this.closeButton.click();
        await this.saveButton.click();
        
        // Wait for loader to hide after final save
        await this.waitForLoaderToHide();

        await expect(this.saveButton).toBeVisible();
    }
}
