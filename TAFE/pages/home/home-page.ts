import { Locator, Page } from "@playwright/test";

export class HomePage{
    page:Page;
    openLeadsFromZohoLink:Locator;
    prospectIdInput:Locator;
    customerNameInput:Locator;
    searchButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.openLeadsFromZohoLink=this.page.getByRole('link', { name: 'Open Open leads from Zoho' });
        this.prospectIdInput=this.page.getByRole('textbox', { name: 'Prospect Id' });
        this.customerNameInput=this.page.getByRole('textbox', { name: 'Customer name' });
        this.searchButton=this.page.getByRole('button', { name: 'Search' });
    }

    // Get the Open leads from Zoho panel with flexible count (works for any user)
    private getOpenLeadsPanel(): Locator {
        return this.page.getByLabel(/\d+Open leads from Zoho/);
    }

    // Open New / Open Cases under Open leads from Zoho
    public async openNewOpenCases() {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('New / Open Cases').click();
    }

    // Navigate inbox movement order from New/Open to target stages
    public async navigateInboxMovementOrder() {
        await this.openLeadsFromZohoLink.click();
        const panel = this.getOpenLeadsPanel();
        await panel.getByText('New / Open Cases').click();
        await panel.getByText('Lead Prioritization').click();
        await panel.getByText('Loan/ Lead Req. Details').click();
        await panel.getByText('R4 - Case Referred to').click();
        await panel.getByText('R5 - In-Principle Offer from').click();
        await panel.getByText('R6 - Case referred to').click();
        await panel.getByText('R9 - Credit Approval').click();
        await panel.getByText('R10 - Final Document').click();
        await panel.getByText('R11 - Bank Disbursement').click();
    }

    // Search by Prospect Id
    public async searchByProspectId(prospectId: any) {
        await this.prospectIdInput.click();
        await this.prospectIdInput.fill(prospectId);
        await this.customerNameInput.click();
        await this.searchButton.click();
    }

    // Open prospect record after search
    public async openProspectRecord(prospectId: any) {
        await this.page.getByRole('cell', { name: prospectId }).click();
    }

    // Search in New / Open Cases inbox
    public async searchByProspectIdInNewOpenCases(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('New / Open Cases').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in Lead Prioritization inbox
    public async searchByProspectIdInLeadPrioritization(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('Lead Prioritization').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in Loan/ Lead Req. Details inbox
    public async searchByProspectIdInLoanLeadReqDetails(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('Loan/ Lead Req. Details').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in R4 Case Referred inbox
    public async searchByProspectIdInR4CaseReferredTo(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('R4 - Case Referred to').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in R5 In-Principle Offer inbox
    public async searchByProspectIdInR5InPrincipleOffer(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('R5 - In-Principle Offer from').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in R6 Case Referred inbox
    public async searchByProspectIdInR6CaseReferredTo(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('R6 - Case referred to').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in R9 Credit Approval inbox
    public async searchByProspectIdInR9CreditApproval(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('R9 - Credit Approval').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in R10 Final Document inbox
    public async searchByProspectIdInR10FinalDocument(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('R10 - Final Document').click();
        await this.searchByProspectId(prospectId);
    }

    // Search in R11 Bank Disbursement inbox
    public async searchByProspectIdInR11BankDisbursement(prospectId: any) {
        await this.openLeadsFromZohoLink.click();
        await this.getOpenLeadsPanel().getByText('R11 - Bank Disbursement').click();
        await this.searchByProspectId(prospectId);
    }
}
