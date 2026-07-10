export interface ProposalCustomerData {
  dataKey: string;
  cbsId: string;
}

export interface ProposalLeadData {
  dataKey: string;
  partyType?: string;
  altMobile?: string;
  lineOfActivity?: string;
  gstApplicable?: string;
  gstNumber?: string;
  urnApplicable?: string;
  udyamNumber?: string;
  urnClassification?: string;
  cinApplicable?: string;
  cinNumber?: string;
  leiApplicable?: string;
  leiNumber?: string;
  leiExpDate?: string;
  customerDealingApplicable?: string;
  customerDealingDate?: string;
  psl?: string;
  ecgcApplicable?: string;
  ecgcNumber?: string;
  beneficialOwnerApplicable?: string;
  beneficialOwner?: string;
  constitutionChangeApplicable?: string;
  oldEntity?: string;
  oldConsPan?: string;
  sectorCode?: string;
  keyPerson?: string;
}

export interface ProposalAddressData {
  dataKey: string;
  addressType?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  state?: string;
  district?: string;
  city?: string;
  pincode?: string;
}

export interface ProposalProductData {
  dataKey: string;
  schemeId?: string;
  mainFacilityId?: string;
  subFacilityId?: string;
  loanType?: string;
  projectCost?: string;
  proposedLimit?: string;
}
