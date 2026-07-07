// Generated from: features\sample-login.feature
import { test } from "playwright-bdd";

test.describe('Application flow', () => {

  test('Login as default user', async ({ Given, When, page }) => { 
    await Given('Launch the application', null, { page }); 
    await When('Login as a dealer sales person'); 
  });

  test('Search and open a lead from New / Open Cases', async ({ Given, When, Then, And, page }) => { 
    await Given('Launch the application', null, { page }); 
    await When('Login as a dealer sales person'); 
    await And('I open New Open Cases from Zoho', null, { page }); 
    await And('I search by configured Prospect Id'); 
    await Then('I should be able to open the searched prospect record', null, { page }); 
  });

  test('Complete Dealer Sales Person workflow (ZDSP)', { tag: ['@Regression', '@ZDSP'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('Launch the application', null, { page }); 
    await When('Login as a dealer sales person'); 
    await And('I search by configured Prospect Id in New Open Cases', null, { page }); 
    await Then('I should be able to open the searched prospect record', null, { page }); 
    await And('I complete KYC details for a new applicant', null, { page }); 
    await Then('KYC details should be submitted successfully'); 
    await And('I navigate to Income and Expenses tab', null, { page }); 
    await And('I complete Income and Expenses details', null, { page }); 
    await Then('Income and Expenses details should be saved successfully'); 
    await And('I navigate to Sales and Loan Details tab', null, { page }); 
    await And('I complete Sales and Loan details', null, { page }); 
    await Then('Sales and Loan details should be saved successfully', null, { page }); 
    await And('I complete Document and Submit details', null, { page }); 
    await Then('Document and Submit should be completed successfully', null, { page }); 
    await Then('I logout from the application', null, { page }); 
  });

  test('Complete Dealer Manager workflow (ZDM)', { tag: ['@Regression', '@ZDM'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('Launch the application', null, { page }); 
    await When('Login as a dealer manager'); 
    await And('I search by configured Prospect Id in Lead Prioritization', null, { page }); 
    await Then('I should be able to open the searched prospect record', null, { page }); 
    await And('I complete Sales and Loan details as Dealer Manager', null, { page }); 
    await Then('Sales and Loan details should be completed by Dealer Manager', null, { page }); 
    await And('I complete Funder Selection and In-Principle Offer', null, { page }); 
    await Then('Funder Selection should be submitted to Financier', null, { page }); 
    await Then('I logout from the application', null, { page }); 
  });

  test('Test Funder Selection in Loan Lead Req Details', { tag: ['@CurrentPageTest'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('Launch the application', null, { page }); 
    await When('Login as a dealer manager'); 
    await And('I search by configured Prospect Id in Loan Lead Req Details', null, { page }); 
    await Then('I should be able to open the searched prospect record', null, { page }); 
    await And('I complete Funder Selection and In-Principle Offer', null, { page }); 
    await Then('Funder Selection should be submitted to Financier', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\sample-login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given Launch the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When Login as a dealer sales person","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":7,"tags":[],"steps":[{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given Launch the application","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When Login as a dealer sales person","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And I open New Open Cases from Zoho","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I search by configured Prospect Id","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I should be able to open the searched prospect record","stepMatchArguments":[]}]},
  {"pwTestLine":19,"pickleLine":15,"tags":["@Regression","@ZDSP"],"steps":[{"pwStepLine":20,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given Launch the application","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When Login as a dealer sales person","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I search by configured Prospect Id in New Open Cases","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should be able to open the searched prospect record","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And I complete KYC details for a new applicant","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then KYC details should be submitted successfully","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And I navigate to Income and Expenses tab","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And I complete Income and Expenses details","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then Income and Expenses details should be saved successfully","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And I navigate to Sales and Loan Details tab","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And I complete Sales and Loan details","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then Sales and Loan details should be saved successfully","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And I complete Document and Submit details","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then Document and Submit should be completed successfully","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then I logout from the application","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":33,"tags":["@Regression","@ZDM"],"steps":[{"pwStepLine":38,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"Given Launch the application","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"When Login as a dealer manager","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And I search by configured Prospect Id in Lead Prioritization","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then I should be able to open the searched prospect record","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And I complete Sales and Loan details as Dealer Manager","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then Sales and Loan details should be completed by Dealer Manager","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And I complete Funder Selection and In-Principle Offer","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then Funder Selection should be submitted to Financier","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then I logout from the application","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":45,"tags":["@CurrentPageTest"],"steps":[{"pwStepLine":50,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given Launch the application","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When Login as a dealer manager","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"And I search by configured Prospect Id in Loan Lead Req Details","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then I should be able to open the searched prospect record","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"And I complete Funder Selection and In-Principle Offer","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then Funder Selection should be submitted to Financier","stepMatchArguments":[]}]},
]; // bdd-data-end