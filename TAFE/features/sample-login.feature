Feature: Application flow

  Scenario: Login as default user
    Given Launch the application
    When Login as a dealer sales person

  Scenario: Search and open a lead from New / Open Cases
    Given Launch the application
    When Login as a dealer sales person
    And I open New Open Cases from Zoho
    And I search by configured Prospect Id
    Then I should be able to open the searched prospect record

  @Regression @ZDSP
  Scenario: Complete Dealer Sales Person workflow (ZDSP)
    Given Launch the application
    When Login as a dealer sales person
    And I search by configured Prospect Id in New Open Cases
    Then I should be able to open the searched prospect record
    And I complete KYC details for a new applicant
    Then KYC details should be submitted successfully
    And I navigate to Income and Expenses tab
    And I complete Income and Expenses details
    Then Income and Expenses details should be saved successfully
    And I navigate to Sales and Loan Details tab
    And I complete Sales and Loan details
    Then Sales and Loan details should be saved successfully
    And I complete Document and Submit details
    Then Document and Submit should be completed successfully
    Then I logout from the application

  @Regression @ZDM
  Scenario: Complete Dealer Manager workflow (ZDM)
    Given Launch the application
    When Login as a dealer manager
    And I search by configured Prospect Id in Lead Prioritization
    Then I should be able to open the searched prospect record
    And I complete Sales and Loan details as Dealer Manager
    Then Sales and Loan details should be completed by Dealer Manager
    And I complete Funder Selection and In-Principle Offer
    Then Funder Selection should be submitted to Financier
    Then I logout from the application

  @CurrentPageTest
  Scenario: Test Funder Selection in Loan Lead Req Details
    Given Launch the application
    When Login as a dealer manager
    And I search by configured Prospect Id in Loan Lead Req Details
    Then I should be able to open the searched prospect record
    And I complete Funder Selection and In-Principle Offer
    Then Funder Selection should be submitted to Financier
