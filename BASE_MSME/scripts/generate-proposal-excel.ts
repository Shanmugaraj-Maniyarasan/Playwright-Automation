import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

// Customer data sheet
const customerData = [
  { dataKey: 'validCustomer', cbsId: '12345678' },
  { dataKey: 'invalidCustomer', cbsId: '99999999' }
];

// Lead details data sheet
const leadData = [
  {
    dataKey: 'proposal1',
    partyType: '5',
    altMobile: '9786753525',
    lineOfActivity: 'Service',
    gstApplicable: 'N',
    gstNumber: '',
    urnApplicable: '1',
    udyamNumber: 'UDYAM-AS-18-3524133',
    urnClassification: '2',
    cinApplicable: 'N',
    cinNumber: '',
    leiApplicable: 'N',
    leiNumber: '',
    psl: '1',
    ecgcApplicable: 'N',
    ecgcNumber: '',
    beneficialOwnerApplicable: 'N',
    beneficialOwner: '',
    sectorCode: '05',
    keyPerson: 'shan'
  },
  {
    dataKey: 'proposal2',
    partyType: '5',
    altMobile: '9876543210',
    lineOfActivity: 'Manufacturing',
    gstApplicable: 'Y',
    gstNumber: '29ABCDE1234F1Z5',
    urnApplicable: '2',
    udyamNumber: 'UDYAM-TY-56-1908976',
    urnClassification: '2',
    cinApplicable: 'Y',
    cinNumber: '90654314',
    leiApplicable: 'Y',
    leiNumber: '156566987',
    psl: '1',
    ecgcApplicable: 'Y',
    ecgcNumber: '542125467',
    beneficialOwnerApplicable: 'Y',
    beneficialOwner: 'VIMAL',
    sectorCode: '05',
    keyPerson: 'kumar'
  }
];

// Address data sheet
const addressData = [
  {
    dataKey: 'address1',
    addressType: '1',
    address1: 'ASH',
    address2: 'Test address',
    address3: 'North street',
    state: 'TAMILNADU',
    district: '603',
    city: '0001',
    pincode: '600122'
  },
  {
    dataKey: 'address2',
    addressType: '2',
    address1: 'Building 101',
    address2: 'Main Road',
    address3: 'South Area',
    state: 'TAMILNADU',
    district: '603',
    city: '0001',
    pincode: '600001'
  }
];

// Product/Facility data sheet
const productData = [
  {
    dataKey: 'product1',
    schemeId: '80380',
    mainFacilityId: '75517',
    subFacilityId: '75518',
    loanType: 'F',
    projectCost: '1500000',
    proposedLimit: '500000'
  },
  {
    dataKey: 'product2',
    schemeId: '80380',
    mainFacilityId: '75517',
    subFacilityId: '75518',
    loanType: 'F',
    projectCost: '2000000',
    proposedLimit: '750000'
  }
];

// Ensure output directory exists
const outputDir = path.resolve(process.cwd(), 'test-data-excel');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function writeSheet(workbook: XLSX.WorkBook, sheetName: string, data: any[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
}

function writeProposalCreationFile() {
  const workbook = XLSX.utils.book_new();

  writeSheet(workbook, 'CustomerData', customerData);
  writeSheet(workbook, 'LeadData', leadData);
  writeSheet(workbook, 'AddressData', addressData);
  writeSheet(workbook, 'ProductData', productData);

  const outputPath = path.join(outputDir, 'proposal-creation-data.xlsx');
  XLSX.writeFile(workbook, outputPath);
  console.log(`Excel file created successfully at: ${outputPath}`);
}

writeProposalCreationFile();

console.log('\nSheets created:');
console.log('1. CustomerData');
console.table(customerData);
console.log('2. LeadData');
console.table(leadData);
console.log('3. AddressData');
console.table(addressData);
console.log('4. ProductData');
console.table(productData);
