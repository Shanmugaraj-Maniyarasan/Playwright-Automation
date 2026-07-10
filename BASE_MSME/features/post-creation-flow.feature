@PostCreation @Smoke
Feature: LendPerfect Application - Post Creation Flow
  Verify all pages after manually opening an existing application

  Scenario: Verify Parties Involved and Proposal Data Entry pages
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens the proposal from dashboard
    When I wait for manual proposal selection

    # ============ Parties Involved ============
    
    # Customer Details (Primary Borrower)
    When I navigate to customer details page
    When I fill customer details
    Then I should see customer details saved successfully

    # Co-Borrower
    When I add co-borrower customer
    When I fill co-borrower details
    Then I should see co-borrower saved successfully

    # Share Holding Pattern
    When I navigate to share holding pattern page
    When I fill capital structure details
    Then I should see share holding pattern saved successfully

    # Delete second rows from Share Holding Pattern tables
    When I delete the second capital market row
    When I delete the second shareholder row

    # List of Directors
    When I navigate to list of directors page
    When I add new director
    Then I should see director added successfully

    # ============ Proposal Data Entry ============

    # Exposure with Our Bank
    When I navigate to exposure with our bank page
    When I fill exposure with our bank details
    Then I should see exposure with our bank saved successfully

    # Exposure with Other Bank
    When I navigate to exposure with other bank page
    When I fill exposure with other bank details
    Then I should see exposure with other bank saved successfully

    # Proposed Facility Details
    When I navigate to proposed facility details page
    When I fill proposed facility details
    Then I should see proposed facility details saved successfully

  @CoBorrower
  Scenario: Add and fill Co-Borrower only
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal and navigates to Customer Details
    When I wait for manual proposal selection

    # Navigate to Customer Details then Add Co-Borrower
    When I navigate to customer details page
    When I add co-borrower customer
    When I fill co-borrower details
    Then I should see co-borrower saved successfully

  @ShareHolding
  Scenario: Fill Share Holding Pattern only
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Share Holding Pattern
    When I navigate to share holding pattern page
    When I fill capital structure details
    Then I should see share holding pattern saved successfully

  @ShareHoldingDelete
  Scenario: Fill Share Holding Pattern and Delete Second Rows
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # 1. Navigate to Share Holding Pattern and fill data (2 rows each) + Save
    When I navigate to share holding pattern page
    When I fill capital structure details
    Then I should see share holding pattern saved successfully

    # 2. Click Edit → Delete second Capital Market row (auto-saved)
    When I delete the second capital market row

    # 3. Click Edit → Delete second Shareholder row (auto-saved)
    When I delete the second shareholder row

  @ListOfDirectors
  Scenario: Add Director in List of Directors page
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to List of Directors and add director
    When I navigate to list of directors page
    When I add new director
    Then I should see director added successfully

  @PersonalCorporateGuarantee
  Scenario: Fill Personal and Corporate Guarantee details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Personal and Corporate Guarantee and fill details
    When I navigate to personal and corporate guarantee page
    When I fill personal and corporate guarantee details
    Then I should see personal and corporate guarantee saved successfully

  @CreditUpdates
  Scenario: Add Credit Update
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Credit Updates and add entry
    When I navigate to credit updates page
    When I add credit update
    Then I should see credit update saved successfully

  @BusinessUpdates
  Scenario: Add Business Update
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Business Updates and add entry
    When I navigate to business updates page
    When I add business update
    Then I should see business update saved successfully

  @ValueOfAccountMSME
  Scenario: Fill Value of Account MSME details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Value of Account MSME and fill details
    When I navigate to value of account MSME page
    When I fill value of account MSME details
    Then I should see value of account MSME saved successfully

  @ConsortiumShareHolding
  Scenario: Fill Consortium and Share Holding Pattern
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Consortium Share Holding and fill details
    When I navigate to consortium share holding page
    When I fill consortium term loan details
    Then I should see consortium share holding saved successfully

  @ExposureNorms
  Scenario: Fill Exposure Norms details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Exposure Norms and fill details
    When I navigate to exposure norms page
    When I fill exposure norms details
    Then I should see exposure norms saved successfully

  @GroupCompanyOperational
  Scenario: Fill Group Company Operational details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Group Company Operational and fill details
    When I navigate to group company operational page
    When I fill group company operational details
    Then I should see group company operational saved successfully

  @CurrentAccountOtherBank
  Scenario: Fill Current Account With Other Bank details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Current Account With Other Bank and fill details
    When I navigate to current account with other bank page
    When I fill current account with other bank details
    Then I should see current account with other bank saved successfully

  @SecurityDetails
  Scenario: Add Security Details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Security Details and add security
    When I navigate to security details page
    When I add new security with basic info
    Then I should see security details saved successfully

    # Fill property details after clicking OD and Edit
    When I fill security property details
    Then I should see security details saved successfully

    # Attach security to facility
    When I attach security to facility

    # Attach document to security
    When I attach document to security

    # View attached securities
    When I view attached securities

  @SecurityCoverage
  Scenario: Fill Security Coverage details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Security Coverage and fill details
    When I navigate to security coverage page
    When I fill security coverage details
    Then I should see security coverage saved successfully

  @DocumentDetails
  Scenario: Add Document Details
    # Login and navigate to home
    Given Launch the application
    When Login as valid user
    And I click here to navigate
    Then I should see the home page

    # MANUAL ACTION: User opens proposal
    When I wait for manual proposal selection

    # Navigate to Document Details and add document
    When I navigate to document details page
    When I add new document
    Then I should see document details saved successfully
