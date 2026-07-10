Feature: LendPerfect Application - Login and Proposal Creation

  @Smoke @E2E
  Scenario: Login and create new MSME proposal
    Given Launch the application
    When Login with empty credentials
    Then I should see mandatory field alert
    When Login with username only
    Then I should see mandatory field alert
    When Login with password only
    Then I should see mandatory field alert
    When Login with invalid credentials
    Then I should see invalid credentials alert
    When Login as valid user
    And I click here to navigate
    Then I should see the home page
    When I navigate to proposal creation page
    When I add existing customer from CBS
    When I fill lead details for new proposal
    When I fill registered address details
    When I add communication address
    When I select product and facility
    When I fill loan amount and tenure
    When I save the proposal
    Then I should see proposal saved successfully
    When I create the application
    When I navigate to customer details page
    When I fill customer details
    Then I should see customer details saved successfully
    When I add co-borrower customer
    When I fill co-borrower details
    Then I should see co-borrower saved successfully
    When I navigate to share holding pattern page
    When I fill capital structure details
    Then I should see share holding pattern saved successfully
    When I delete the second capital market row
    When I delete the second shareholder row
    When I navigate to list of directors page
    When I add new director
    Then I should see director added successfully
    When I navigate to exposure with our bank page
    When I fill exposure with our bank details
    Then I should see exposure with our bank saved successfully
    When I navigate to exposure with other bank page
    When I fill exposure with other bank details
    Then I should see exposure with other bank saved successfully
    When I navigate to proposed facility details page
    When I fill proposed facility details
    Then I should see proposed facility details saved successfully
    When I navigate to security details page
    When I add new security with basic info
    Then I should see security details saved successfully
    When I fill security property details
    Then I should see security details saved successfully
    When I attach security to facility
    When I attach document to security
    When I view attached securities
    When I navigate to document details page
    When I add new document
    Then I should see document details saved successfully
    When I navigate to security coverage page
    When I fill security coverage details
    Then I should see security coverage saved successfully
    When I navigate to personal and corporate guarantee page
    When I fill personal and corporate guarantee details
    Then I should see personal and corporate guarantee saved successfully
    When I navigate to credit updates page
    When I add credit update
    Then I should see credit update saved successfully
    When I navigate to business updates page
    When I add business update
    Then I should see business update saved successfully
    When I navigate to value of account MSME page
    When I fill value of account MSME details
    Then I should see value of account MSME saved successfully
    When I navigate to consortium share holding page
    When I fill consortium term loan details
    Then I should see consortium share holding saved successfully
    When I navigate to exposure norms page
    When I fill exposure norms details
    Then I should see exposure norms saved successfully
    When I navigate to group company operational page
    When I fill group company operational details
    Then I should see group company operational saved successfully
    When I navigate to current account with other bank page
    When I fill current account with other bank details
    Then I should see current account with other bank saved successfully
    When I navigate to financial comments page
    When I fill financial comments
    Then I should see financial comments saved successfully
    When I navigate to group companies financial page
    When I fill group companies financial data
    Then I should see group companies financial saved successfully

  @Debug @CurrentPage
  Scenario: Current page execution with existing proposal
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page
    When I wait for manual proposal selection
    When I navigate to proposed facility details page
    When I fill proposed facility details
    Then I should see proposed facility details saved successfully

  @Debug @CaptureHtml
  Scenario: Capture proposed facility details html
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page
    When I wait for manual proposal selection
    When I navigate to proposed facility details page
    When I capture proposed facility details page html
