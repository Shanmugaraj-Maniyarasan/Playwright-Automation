/**
 * Co-Borrower Data Interface
 * Used for typing co-borrower details from Excel test data
 */
export interface CoBorrowerData {
  // Data key for Excel lookup
  dataKey: string;
  
  // Co-Borrower CBS ID
  cbsId: string;
  
  // Co-Borrower specific fields
  partyType?: string;           // 'C' for Co-Borrower
  constitution?: string;        // e.g., '5'
  bsrCode?: string;            // BSR Code search
  leiApplicable?: string;      // 'Y' or 'N'
  irbCompanyCode?: string;
  lineOfActivity?: string;
  cinApplicable?: string;      // 'Y' or 'N'
  cinNumber?: string;
  udyamType?: string;          // e.g., '1'
  udyamNumber?: string;        // e.g., 'UDYAM-AS-35-6347873'
  sectorCode?: string;         // e.g., '05'
  
  // Common Customer Details fields
  rocNumber?: string;
  totalEmployees?: string;
  ownerType?: string;          // e.g., '1'
  group?: string;
  bankingSince?: string;
  industryType?: string;       // e.g., '1'
  comments?: string;
  creditFacSince?: string;
  corpCustomer?: string;       // 'Y' or 'N'
  
  // Search popup fields
  annualIncome?: string;       // Search text for Annual Income
  custOccupation?: string;     // Search text for Customer Occupation
  resProofType?: string;       // Search text for Residence Proof Type
  resIdReference?: string;     // Residence ID Reference value
  idProofType?: string;        // Search text for ID Proof Type
  idReference?: string;        // ID Reference value
  incomeSource?: string;       // Search text for Source of Income
  networth?: string;           // Search text for Networth
  annualTurnOver?: string;     // Search text for Annual Turn Over
  natOfActivity?: string;      // Search text for Nature of Activity
  annualTurnOverEst?: string;  // Search text for Annual Turn Over (Estimated)
  riskCategory?: string;       // Search text for Risk Categorization
  
  // Dropdown fields
  pooledAcc?: string;          // 'Y' or 'N'
  ofac?: string;               // e.g., '1'
  foreignInwardRem?: string;   // 'Y' or 'N'
  sleepingPartner?: string;    // e.g., '1'
  politicalExposed?: string;   // e.g., '1'
  familyShare?: string;        // e.g., '1'
  gstApplicable?: string;      // 'Y' or 'N'
  gstNo?: string;
  bankRelation?: string;       // 'Y' or 'N'
  zedRating?: string;          // 'Y' or 'N'
  gemRating?: string;
  copyAddress?: string;        // Address ID to copy from
}
