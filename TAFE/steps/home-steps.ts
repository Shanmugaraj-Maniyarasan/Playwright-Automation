import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { HomePage } from '@pages/home/home-page';
import { ExcelDataReader } from '@data-utils/excel-data-reader';
import type { HomeSearchRow } from '../types/home-data';

const { When, Then } = createBdd();

let homePage: HomePage;
let searchData: HomeSearchRow;

const excelPath = 'test-data-excel/home-data.xlsx';

When('I open New Open Cases from Zoho', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.openNewOpenCases();
});

When('I navigate inbox movement in order', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigateInboxMovementOrder();
});

When('I search by configured Prospect Id', async () => {
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectId(searchData.prospectId);
});

Then('I should be able to open the searched prospect record', async ({ page }) => {
  await expect(page.getByRole('cell', { name: searchData.prospectId })).toBeVisible();
  await homePage.openProspectRecord(searchData.prospectId);
});

When('I search by configured Prospect Id in New Open Cases', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.openNewOpenCases();
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectId(searchData.prospectId);
});

When('I search by configured Prospect Id in Lead Prioritization', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInLeadPrioritization(searchData.prospectId);
});

When('I search by configured Prospect Id in Loan Lead Req Details', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInLoanLeadReqDetails(searchData.prospectId);
});

When('I search by configured Prospect Id in R4 Case Referred', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInR4CaseReferredTo(searchData.prospectId);
});

When('I search by configured Prospect Id in R5 In-Principle Offer', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInR5InPrincipleOffer(searchData.prospectId);
});

When('I search by configured Prospect Id in R6 Case Referred', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInR6CaseReferredTo(searchData.prospectId);
});

When('I search by configured Prospect Id in R9 Credit Approval', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInR9CreditApproval(searchData.prospectId);
});

When('I search by configured Prospect Id in R10 Final Document', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInR10FinalDocument(searchData.prospectId);
});

When('I search by configured Prospect Id in R11 Bank Disbursement', async ({ page }) => {
  homePage = new HomePage(page);
  ExcelDataReader.loadExcelFile(excelPath);
  searchData = ExcelDataReader.getDataByKey('HomeData', 'dataKey', 'search1') as HomeSearchRow;
  if (!searchData?.prospectId) {
    throw new Error('HomeData search1 row missing prospectId value.');
  }
  await homePage.searchByProspectIdInR11BankDisbursement(searchData.prospectId);
});
