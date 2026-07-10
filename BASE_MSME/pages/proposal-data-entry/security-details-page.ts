import { Locator, Page } from "@playwright/test";

export class SecurityDetailsPage {
  page: Page;
  
  // Navigation
  securityDetailsTab: Locator;
  
  // Main Actions
  addNewSecurityBtn: Locator;
  editBtn: Locator;
  saveBtn: Locator;
  closeBtn: Locator;
  odBtn: Locator;
  attachBtn: Locator;
  attachDocumentsBtn: Locator;
  attachedSecuritiesBtn: Locator;
  
  // Security Basic Info
  securityType: Locator;
  securityClassification: Locator;
  alreadyChargedYes: Locator;
  alreadyChargedNo: Locator;
  chargedInstitution: Locator;
  chargedAmount: Locator;
  typeOfCharge: Locator;
  natureOfCharge: Locator;
  totalSecurityValue: Locator;
  
  // Insurance Section
  insuranceRequiredYes: Locator;
  insuranceRequiredNo: Locator;
  insuranceCompany: Locator;
  insuredAmount: Locator;
  insuranceDueOn: Locator;
  lastValuationDate: Locator;
  
  // ROC Section
  rocChargeDelayedYes: Locator;
  rocChargeDelayedNo: Locator;
  securityRocRemarks: Locator;
  dateOfRegistration: Locator;
  
  // Property Basic Info
  securityDescription: Locator;
  propertyOwned: Locator;
  propertyTaxUtilityDetails: Locator;
  dateOfVisit: Locator;
  visitBy: Locator;
  cersaiRequired: Locator;
  additionalSecurity: Locator;
  propertyMortgagedFlag: Locator;
  remarks: Locator;
  finalCheckbox: Locator;
  
  // Property Details (Edit Modal)
  propertyType: Locator;
  occupationType: Locator;
  classPropertyType: Locator;
  address2: Locator;
  ownershipType: Locator;
  plotNo: Locator;
  taluk: Locator;
  subRegOffice: Locator;
  landmark: Locator;
  leaseTotalPeriod: Locator;
  tenantName: Locator;
  rentalDetails: Locator;
  technicalComments: Locator;
  legalOpinionObtained: Locator;
  
  // Boundaries
  westBoundary: Locator;
  eastBoundary: Locator;
  northBoundary: Locator;
  southBoundary: Locator;
  sarfaesiCompliance: Locator;
  
  // Valuer 1 Section
  valuerValue1: Locator;
  valuerUserName1: Locator;
  valuerSearchBtn1: Locator;
  valueDate1: Locator;
  lastValueDate1: Locator;
  valuerComments1: Locator;
  markValue1: Locator;
  realValue1: Locator;
  distSaleValue1: Locator;
  
  // Valuer 2 Section
  valuerValue2: Locator;
  valuerSearchBtn2: Locator;
  valueDate2: Locator;
  lastValueDate2: Locator;
  valuerComments2: Locator;
  technicalComments2: Locator;
  markValue2: Locator;
  realValue2: Locator;
  distSaleValue2: Locator;
  
  // Valuer 3 Section
  valuerValue3: Locator;
  valuerSearchBtn3: Locator;
  valueDate3: Locator;
  lastValueDate3: Locator;
  valuerComments3: Locator;
  technicalComments3: Locator;
  markValue3: Locator;
  realValue3: Locator;
  distSaleValue3: Locator;
  
  // Legal Opinion Section
  legalContactNo: Locator;
  legalReportDate: Locator;
  legalComments: Locator;
  legalDeviations1: Locator;
  legalAdverseRemark1: Locator;
  legalObservation1: Locator;
  legalSearchBtn1: Locator;
  
  // Legal Opinion 2 Section
  legalContactNo1: Locator;
  legalReportDate1: Locator;
  legalComments1: Locator;
  legalDeviations: Locator;
  legalAdverseRemark: Locator;
  legalObservation: Locator;
  legalSearchBtn2: Locator;
  
  // Search Modal
  searchLegalNameCheckbox: Locator;
  searchUserId: Locator;
  searchBtn: Locator;
  
  // Attach Modal
  attachingAs0: Locator;
  attachingAs1: Locator;
  
  // Document Upload Modal
  documentType: Locator;
  documentDatePicker: Locator;
  chooseFileBtn: Locator;
  uploadBtn: Locator;
  closeDialogBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Navigation
    this.securityDetailsTab = this.page.locator('a').filter({ hasText: 'Security Details' });
    
    // Main Actions
    this.addNewSecurityBtn = this.page.getByRole('button', { name: 'Add New Security' });
    this.editBtn = this.page.getByRole('button', { name: 'Edit' });
    this.saveBtn = this.page.getByRole('button', { name: 'Save' });
    this.closeBtn = this.page.getByRole('button', { name: 'Close' }).first();
    this.odBtn = this.page.getByRole('button', { name: 'OD' });
    this.attachBtn = this.page.getByRole('button', { name: 'Attach', exact: true });
    this.attachDocumentsBtn = this.page.getByRole('button', { name: 'Attach Documents' });
    this.attachedSecuritiesBtn = this.page.getByRole('button', { name: 'Attached Securities' });
    
    // Security Basic Info
    this.securityType = this.page.locator('#lsSecType');
    this.securityClassification = this.page.locator('#lsSecClassification');
    this.alreadyChargedYes = this.page.locator('#lsAlreadyCharged').first();
    this.alreadyChargedNo = this.page.locator('#lsAlreadyCharged').nth(1);
    this.chargedInstitution = this.page.locator('#lsChargedInstitution');
    this.chargedAmount = this.page.locator('#lsChargedAmt');
    this.typeOfCharge = this.page.locator('#lsTypeOfCharge');
    this.natureOfCharge = this.page.locator('#lsNatureOfCharge');
    this.totalSecurityValue = this.page.locator('#lsTotalSecurityVal');
    
    // Insurance Section
    this.insuranceRequiredYes = this.page.locator('#lsinsurancereq').first();
    this.insuranceRequiredNo = this.page.locator('#lsinsurancereq').nth(1);
    this.insuranceCompany = this.page.locator('#lsInsuranceCompany');
    this.insuredAmount = this.page.locator('#lsInsuredAmt');
    this.insuranceDueOn = this.page.locator('#lsInsuranceDueOn');
    this.lastValuationDate = this.page.locator('#lslastvaluationdate');
    
    // ROC Section
    this.rocChargeDelayedYes = this.page.locator('#lsRocChargeDelayed').first();
    this.rocChargeDelayedNo = this.page.locator('#lsRocChargeDelayed').nth(1);
    this.securityRocRemarks = this.page.locator('textarea[name="lsSecRoc"]');
    this.dateOfRegistration = this.page.locator('#lsDateOfRegis');
    
    // Property Basic Info
    this.securityDescription = this.page.locator('#lsSecDesc');
    this.propertyOwned = this.page.locator('#lspropertyOwned');
    this.propertyTaxUtilityDetails = this.page.locator('#lspropertyTaxUtilityDetails');
    this.dateOfVisit = this.page.locator('#lsDateOfVisit');
    this.visitBy = this.page.locator('#lsVisitBy');
    this.cersaiRequired = this.page.locator('#lsCersaiRequired');
    this.additionalSecurity = this.page.locator('#lsadditionalSecurity');
    this.propertyMortgagedFlag = this.page.locator('#lspropMortgagedFlag');
    this.remarks = this.page.locator('#lsRemarks');
    this.finalCheckbox = this.page.getByRole('checkbox');
    
    // Property Details (Edit Modal)
    this.propertyType = this.page.locator('#lspPropType');
    this.occupationType = this.page.locator('#lspOccType').first();
    this.classPropertyType = this.page.locator('#lspClasspropType');
    this.address2 = this.page.locator('#iblspAddr2');
    this.ownershipType = this.page.locator('#lspOwnershipType');
    this.plotNo = this.page.locator('#lspPlotNo');
    this.taluk = this.page.locator('#lsptaluk');
    this.subRegOffice = this.page.locator('#lspsubregOffice');
    this.landmark = this.page.locator('#lsplandmark');
    this.leaseTotalPeriod = this.page.locator('#lspLeaseTotalPeriod');
    this.tenantName = this.page.locator('#lsptenantname');
    this.rentalDetails = this.page.locator('#lsprentaldetails');
    this.technicalComments = this.page.locator('#lspTechnicalComments');
    this.legalOpinionObtained = this.page.locator('#lspLegalOpinionObtained');
    
    // Boundaries
    this.westBoundary = this.page.locator('#lspWest');
    this.eastBoundary = this.page.locator('#lspEast');
    this.northBoundary = this.page.locator('#lspNorth');
    this.southBoundary = this.page.locator('#lspSouth');
    this.sarfaesiCompliance = this.page.locator('#lspSarfaesiComp');
    
    // Valuer 1 Section
    this.valuerValue1 = this.page.locator('#lspValuerValue');
    this.valuerUserName1 = this.page.locator('#lspValuerUserName');
    this.valuerSearchBtn1 = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3);
    this.valueDate1 = this.page.locator('#lspValueDate');
    this.lastValueDate1 = this.page.locator('#lspLastValueDate');
    this.valuerComments1 = this.page.locator('#lspValuerCmts');
    this.markValue1 = this.page.locator('#lspmarkval3');
    this.realValue1 = this.page.locator('#lsprealval3');
    this.distSaleValue1 = this.page.locator('#lspdistsaleval3');
    
    // Valuer 2 Section
    this.valuerValue2 = this.page.locator('#lspValuerValue2');
    this.valuerSearchBtn2 = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(4);
    this.valueDate2 = this.page.locator('#lspValueDate2');
    this.lastValueDate2 = this.page.locator('#lspLastValueDate2');
    this.valuerComments2 = this.page.locator('#lspValuerCmts2');
    this.technicalComments2 = this.page.locator('#lspTechnicalComments2');
    this.markValue2 = this.page.locator('input[name="lspMarkVal23"]');
    this.realValue2 = this.page.locator('input[name="lspRealVal23"]');
    this.distSaleValue2 = this.page.locator('input[name="lspDistSaleVal23"]');
    
    // Valuer 3 Section
    this.valuerValue3 = this.page.locator('#lspValuerValue3');
    this.valuerSearchBtn3 = this.page.getByRole('button').filter({ hasText: /^$/ }).nth(5);
    this.valueDate3 = this.page.locator('#lspValueDate3');
    this.lastValueDate3 = this.page.locator('#lspLastValueDate3');
    this.valuerComments3 = this.page.locator('#lspValuerCmts3');
    this.technicalComments3 = this.page.locator('#lspTechnicalComments3');
    this.markValue3 = this.page.locator('input[name="lspMarkVal33"]');
    this.realValue3 = this.page.locator('input[name="lspRealVal33"]');
    this.distSaleValue3 = this.page.locator('input[name="lspDistSaleVal33"]');
    
    // Legal Opinion Section
    this.legalContactNo = this.page.locator('#lspContactNo');
    this.legalReportDate = this.page.locator('#lspReportDate');
    this.legalComments = this.page.locator('#lspComments');
    this.legalDeviations1 = this.page.locator('#lspDeviations1');
    this.legalAdverseRemark1 = this.page.locator('#lspAdverseRemark1');
    this.legalObservation1 = this.page.locator('#lspObservation1');
    this.legalSearchBtn1 = this.page.locator('div:nth-child(59) > .form-group > div > .input-group > .input-group-text > .btn');
    
    // Legal Opinion 2 Section
    this.legalContactNo1 = this.page.locator('#lspContactNo1');
    this.legalReportDate1 = this.page.locator('#lspReportDate1');
    this.legalComments1 = this.page.locator('#lspComments1');
    this.legalDeviations = this.page.locator('#lspDeviations');
    this.legalAdverseRemark = this.page.locator('#lspAdverseRemark');
    this.legalObservation = this.page.locator('#lspObservation');
    this.legalSearchBtn2 = this.page.locator('div:nth-child(67) > .form-group > div > .input-group > .input-group-text > .btn');
    
    // Search Modal
    this.searchLegalNameCheckbox = this.page.locator('#srcLegalName');
    this.searchUserId = this.page.locator('#srcUserId');
    this.searchBtn = this.page.getByRole('button', { name: 'Search' });
    
    // Attach Modal
    this.attachingAs0 = this.page.locator('#attachingAs0');
    this.attachingAs1 = this.page.locator('#attachingAs1');
    
    // Document Upload Modal
    this.documentType = this.page.locator('#documentType');
    this.documentDatePicker = this.page.getByRole('textbox', { name: 'dd/mm/yyyy' });
    this.chooseFileBtn = this.page.getByRole('button', { name: 'Choose File' });
    this.uploadBtn = this.page.getByRole('button', { name: ' Upload' });
    this.closeDialogBtn = this.page.getByRole('dialog').getByLabel('Close');
  }

  // Navigate to Security Details tab
  public async navigateToSecurityDetails() {
    await this.securityDetailsTab.click();
    await this.page.waitForTimeout(1000);
  }

  // Add New Security with basic info
  public async addNewSecurity(data: any) {
    await this.addNewSecurityBtn.click();
    await this.page.waitForTimeout(500);
    
    if (data.securityType) {
      await this.securityType.selectOption(String(data.securityType));
    }
    if (data.securityClassification) {
      await this.securityClassification.selectOption(String(data.securityClassification));
    }
    if (data.alreadyCharged === 'Yes' || data.alreadyCharged === true) {
      await this.alreadyChargedYes.check();
    }
    if (data.chargedInstitution) {
      await this.chargedInstitution.fill(String(data.chargedInstitution));
    }
    if (data.chargedAmount) {
      await this.chargedAmount.fill(String(data.chargedAmount));
    }
    if (data.typeOfCharge) {
      await this.typeOfCharge.selectOption(String(data.typeOfCharge));
    }
    if (data.natureOfCharge) {
      await this.natureOfCharge.selectOption(String(data.natureOfCharge));
    }
    if (data.totalSecurityValue) {
      await this.totalSecurityValue.fill(String(data.totalSecurityValue));
    }
  }

  // Fill Insurance Details
  public async fillInsuranceDetails(data: any) {
    if (data.insuranceRequired === 'Yes' || data.insuranceRequired === true) {
      await this.insuranceRequiredYes.check();
    }
    if (data.insuranceCompany) {
      await this.insuranceCompany.fill(String(data.insuranceCompany));
    }
    if (data.insuredAmount) {
      await this.insuredAmount.fill(String(data.insuredAmount));
    }
    if (data.insuranceDueOn) {
      await this.insuranceDueOn.click();
      await this.selectDateByText(data.insuranceDueOn);
    }
    if (data.lastValuationDate) {
      await this.lastValuationDate.click();
      await this.selectDateByText(data.lastValuationDate);
    }
  }

  // Fill ROC Section
  public async fillRocDetails(data: any) {
    if (data.rocChargeDelayed === 'Yes' || data.rocChargeDelayed === true) {
      await this.rocChargeDelayedYes.check();
    }
    if (data.securityRocRemarks) {
      await this.securityRocRemarks.fill(String(data.securityRocRemarks));
    }
    if (data.dateOfRegistration) {
      await this.dateOfRegistration.click();
      await this.selectDateByText(data.dateOfRegistration);
    }
  }

  // Fill Property Basic Info
  public async fillPropertyBasicInfo(data: any) {
    if (data.securityDescription) {
      await this.securityDescription.fill(String(data.securityDescription));
    }
    if (data.propertyOwned) {
      await this.propertyOwned.selectOption(String(data.propertyOwned));
    }
    if (data.propertyTaxUtilityDetails) {
      await this.propertyTaxUtilityDetails.fill(String(data.propertyTaxUtilityDetails));
    }
    if (data.dateOfVisit) {
      await this.dateOfVisit.click();
      await this.selectDateByText(data.dateOfVisit);
    }
    if (data.visitBy) {
      await this.visitBy.fill(String(data.visitBy));
    }
    if (data.cersaiRequired) {
      await this.cersaiRequired.selectOption(String(data.cersaiRequired));
    }
    if (data.additionalSecurity) {
      await this.additionalSecurity.fill(String(data.additionalSecurity));
    }
    if (data.propertyMortgagedFlag) {
      await this.propertyMortgagedFlag.selectOption(String(data.propertyMortgagedFlag));
    }
    if (data.remarks) {
      await this.remarks.fill(String(data.remarks));
    }
    if (data.checkFinal === true || data.checkFinal === 'Yes') {
      await this.finalCheckbox.check();
    }
  }

  // Save and Close Security
  public async saveAndCloseSecurity() {
    await this.saveBtn.click();
    await this.page.waitForTimeout(1000);
    await this.closeBtn.click();
  }

  // Click OD and Edit for Property Details
  public async openPropertyDetailsEdit() {
    await this.odBtn.click();
    await this.page.waitForTimeout(500);
    await this.editBtn.click();
    await this.page.waitForTimeout(500);
  }

  // Fill Property Details in Edit Modal
  public async fillPropertyDetails(data: any) {
    if (data.propertyType) {
      await this.propertyType.selectOption(String(data.propertyType));
    }
    if (data.occupationType) {
      await this.occupationType.selectOption(String(data.occupationType));
    }
    if (data.classPropertyType) {
      await this.classPropertyType.selectOption(String(data.classPropertyType));
    }
    if (data.address2) {
      await this.address2.fill(String(data.address2));
    }
    if (data.ownershipType) {
      await this.ownershipType.selectOption(String(data.ownershipType));
    }
    if (data.plotNo) {
      await this.plotNo.fill(String(data.plotNo));
    }
    if (data.taluk) {
      await this.taluk.fill(String(data.taluk));
    }
    if (data.subRegOffice) {
      await this.subRegOffice.fill(String(data.subRegOffice));
    }
    if (data.landmark) {
      await this.landmark.fill(String(data.landmark));
    }
    if (data.leaseTotalPeriod) {
      await this.leaseTotalPeriod.fill(String(data.leaseTotalPeriod));
    }
    if (data.tenantName) {
      await this.tenantName.fill(String(data.tenantName));
    }
    if (data.rentalDetails) {
      await this.rentalDetails.fill(String(data.rentalDetails));
    }
    if (data.technicalComments) {
      await this.technicalComments.fill(String(data.technicalComments));
    }
    if (data.legalOpinionObtained) {
      await this.legalOpinionObtained.selectOption(String(data.legalOpinionObtained));
    }
  }

  // Fill Boundaries
  public async fillBoundaries(data: any) {
    if (data.westBoundary) {
      await this.westBoundary.fill(String(data.westBoundary));
    }
    if (data.eastBoundary) {
      await this.eastBoundary.fill(String(data.eastBoundary));
    }
    if (data.northBoundary) {
      await this.northBoundary.fill(String(data.northBoundary));
    }
    if (data.southBoundary) {
      await this.southBoundary.fill(String(data.southBoundary));
    }
    if (data.sarfaesiCompliance) {
      await this.sarfaesiCompliance.selectOption(String(data.sarfaesiCompliance));
    }
  }

  // Fill Valuer 1 Section
  public async fillValuer1Details(data: any) {
    if (data.valuerValue1) {
      await this.valuerValue1.fill(String(data.valuerValue1));
    }
    if (data.valuerUserId1) {
      await this.valuerSearchBtn1.click();
      await this.searchAndSelectUser(data.valuerUserId1);
    }
    if (data.valueDate1) {
      await this.valueDate1.click();
      await this.selectDateByText(data.valueDate1);
    }
    if (data.lastValueDate1) {
      await this.lastValueDate1.click();
      await this.selectDateByText(data.lastValueDate1);
    }
    if (data.valuerComments1) {
      await this.valuerComments1.fill(String(data.valuerComments1));
    }
    if (data.markValue1) {
      await this.markValue1.fill(String(data.markValue1));
    }
    if (data.realValue1) {
      await this.realValue1.fill(String(data.realValue1));
    }
    if (data.distSaleValue1) {
      await this.distSaleValue1.fill(String(data.distSaleValue1));
    }
  }

  // Fill Valuer 2 Section
  public async fillValuer2Details(data: any) {
    if (data.valuerValue2) {
      await this.valuerValue2.fill(String(data.valuerValue2));
    }
    if (data.valuerUserId2) {
      await this.valuerSearchBtn2.click();
      await this.searchAndSelectUser(data.valuerUserId2);
    }
    if (data.valueDate2) {
      await this.valueDate2.click();
      await this.selectDateByText(data.valueDate2);
    }
    if (data.lastValueDate2) {
      await this.lastValueDate2.click();
      await this.selectDateByText(data.lastValueDate2);
    }
    if (data.valuerComments2) {
      await this.valuerComments2.fill(String(data.valuerComments2));
    }
    if (data.technicalComments2) {
      await this.technicalComments2.fill(String(data.technicalComments2));
    }
    if (data.markValue2) {
      await this.markValue2.fill(String(data.markValue2));
    }
    if (data.realValue2) {
      await this.realValue2.fill(String(data.realValue2));
    }
    if (data.distSaleValue2) {
      await this.distSaleValue2.fill(String(data.distSaleValue2));
    }
  }

  // Fill Valuer 3 Section
  public async fillValuer3Details(data: any) {
    if (data.valuerValue3) {
      await this.valuerValue3.fill(String(data.valuerValue3));
    }
    if (data.valuerUserId3) {
      await this.valuerSearchBtn3.click();
      await this.searchAndSelectUser(data.valuerUserId3);
    }
    if (data.valueDate3) {
      await this.valueDate3.click();
      await this.selectDateByText(data.valueDate3);
    }
    if (data.lastValueDate3) {
      await this.lastValueDate3.click();
      await this.selectDateByText(data.lastValueDate3);
    }
    if (data.valuerComments3) {
      await this.valuerComments3.fill(String(data.valuerComments3));
    }
    if (data.technicalComments3) {
      await this.technicalComments3.fill(String(data.technicalComments3));
    }
    if (data.markValue3) {
      await this.markValue3.fill(String(data.markValue3));
    }
    if (data.realValue3) {
      await this.realValue3.fill(String(data.realValue3));
    }
    if (data.distSaleValue3) {
      await this.distSaleValue3.fill(String(data.distSaleValue3));
    }
  }

  // Fill Legal Opinion Section 1
  public async fillLegalOpinion1(data: any) {
    if (data.legalUserId1) {
      await this.legalSearchBtn1.click();
      await this.searchAndSelectUser(data.legalUserId1);
    }
    if (data.legalContactNo) {
      await this.legalContactNo.fill(String(data.legalContactNo));
    }
    if (data.legalReportDate) {
      await this.legalReportDate.click();
      await this.selectDateByText(data.legalReportDate);
    }
    if (data.legalComments) {
      await this.legalComments.fill(String(data.legalComments));
    }
    if (data.legalDeviations1) {
      await this.legalDeviations1.fill(String(data.legalDeviations1));
    }
    if (data.legalAdverseRemark1) {
      await this.legalAdverseRemark1.fill(String(data.legalAdverseRemark1));
    }
    if (data.legalObservation1) {
      await this.legalObservation1.fill(String(data.legalObservation1));
    }
  }

  // Fill Legal Opinion Section 2
  public async fillLegalOpinion2(data: any) {
    if (data.legalUserId2) {
      await this.legalSearchBtn2.click();
      await this.searchAndSelectUser(data.legalUserId2);
    }
    if (data.legalContactNo1) {
      await this.legalContactNo1.fill(String(data.legalContactNo1));
    }
    if (data.legalReportDate1) {
      await this.legalReportDate1.click();
      await this.selectDateByText(data.legalReportDate1);
    }
    if (data.legalComments1) {
      await this.legalComments1.fill(String(data.legalComments1));
    }
    if (data.legalDeviations) {
      await this.legalDeviations.fill(String(data.legalDeviations));
    }
    if (data.legalAdverseRemark) {
      await this.legalAdverseRemark.fill(String(data.legalAdverseRemark));
    }
    if (data.legalObservation) {
      await this.legalObservation.fill(String(data.legalObservation));
    }
  }

  // Attach Security to Facility
  public async attachSecurityToFacility(data: any) {
    await this.attachBtn.click();
    await this.page.waitForTimeout(500);
    
    if (data.attachingAs0) {
      await this.attachingAs0.selectOption(String(data.attachingAs0));
    }
    if (data.attachingAs1) {
      await this.attachingAs1.selectOption(String(data.attachingAs1));
    }
    
    await this.saveBtn.click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Close' }).nth(1).click();
  }

  // Attach Document to Security
  public async attachDocument(data: any) {
    await this.attachDocumentsBtn.click();
    await this.page.waitForTimeout(500);
    
    if (data.documentType) {
      await this.documentType.selectOption(String(data.documentType));
    }
    if (data.documentDate) {
      await this.documentDatePicker.click();
      await this.selectDateByText(data.documentDate);
    }
    if (data.filePath) {
      await this.chooseFileBtn.setInputFiles(data.filePath);
    }
    
    await this.uploadBtn.click();
    await this.page.waitForTimeout(1000);
    await this.closeDialogBtn.click();
  }

  // View Attached Securities
  public async viewAttachedSecurities() {
    await this.attachedSecuritiesBtn.click();
    await this.page.waitForTimeout(500);
    await this.page.getByRole('button', { name: 'Close' }).nth(1).click();
  }

  // Helper: Search and select user in modal
  private async searchAndSelectUser(userId: string) {
    await this.page.waitForTimeout(300);
    await this.searchLegalNameCheckbox.check();
    await this.searchUserId.fill(String(userId));
    await this.searchBtn.click();
    await this.page.waitForTimeout(500);
    await this.page.getByText(userId.toUpperCase()).click();
    await this.page.waitForTimeout(300);
  }

  // Helper: Select date by day text
  private async selectDateByText(dayText: string) {
    await this.page.getByText(String(dayText), { exact: true }).click();
  }

  // Complete Security Entry Flow
  public async completeSecurityEntry(data: any) {
    await this.addNewSecurity(data);
    await this.fillInsuranceDetails(data);
    await this.fillRocDetails(data);
    await this.fillPropertyBasicInfo(data);
    await this.saveAndCloseSecurity();
  }

  // Complete Property Details Flow
  public async completePropertyDetailsEntry(data: any) {
    await this.openPropertyDetailsEdit();
    await this.fillPropertyDetails(data);
    await this.fillBoundaries(data);
    await this.fillValuer1Details(data);
    await this.fillValuer2Details(data);
    await this.fillValuer3Details(data);
    await this.fillLegalOpinion1(data);
    await this.fillLegalOpinion2(data);
    await this.saveAndCloseSecurity();
  }
}
