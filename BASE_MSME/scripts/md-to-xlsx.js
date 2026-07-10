/**
 * Script to convert markdown template to page-wise Excel xlsx files
 * Run: node scripts/md-to-xlsx.js
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const mdFilePath = path.join(__dirname, '../test-data-excel/PROPOSAL-DATA-ENTRY-TEMPLATE.md');
const outputFolderPath = path.join(__dirname, '../test-data-excel');

const sheetFileNames = {
  ExposureOurBank: 'exposure-with-our-bank-data.xlsx',
  ExposureOtherBank: 'exposure-other-bank-data.xlsx',
  ProposedFacility: 'proposed-facility-data.xlsx',
  SecurityDetails: 'security-details-data.xlsx',
  SecurityPropertyDetails: 'security-details-data.xlsx',
  SecurityAttach: 'security-details-data.xlsx',
  SecurityDocument: 'security-details-data.xlsx',
  SecurityCoverage: 'security-coverage-data.xlsx',
  DocumentDetails: 'document-details-data.xlsx',
  PersonalCorporateGuarantee: 'personal-corporate-guarantee-data.xlsx',
  CreditUpdates: 'credit-updates-data.xlsx',
  BusinessUpdates: 'business-updates-data.xlsx',
  ValueOfAccountMSME: 'value-of-account-msme-data.xlsx',
  ConsortiumTermLoan: 'consortium-share-holding-data.xlsx',
  ConsortiumWorkingCapital: 'consortium-share-holding-data.xlsx',
  ExposureNorms: 'exposure-norms-data.xlsx',
  GroupCompanyOperational: 'group-company-operational-data.xlsx',
  CurrentAccountOtherBank: 'current-account-other-bank-data.xlsx',
  ExposureOurBankMclr: 'exposure-with-our-bank-data.xlsx',
};

// Read markdown file
const mdContent = fs.readFileSync(mdFilePath, 'utf-8');

// Parse markdown tables
function parseMarkdownTables(content) {
  const sheets = {};
  
  // Split by sheet headers
  const sections = content.split(/## Sheet \d+: /);
  
  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const lines = section.split('\n');
    
    // First line is sheet name
    const sheetName = lines[0].trim();
    
    // Find table lines (lines starting with |)
    const tableLines = lines.filter(line => line.trim().startsWith('|'));
    
    if (tableLines.length < 2) continue;
    
    // First table line is headers
    const headerLine = tableLines[0];
    const headers = headerLine.split('|').map(h => h.trim()).filter(h => h && !h.match(/^-+$/));
    
    // Skip separator line (index 1), data starts at index 2
    const dataRows = [];
    for (let j = 2; j < tableLines.length; j++) {
      const line = tableLines[j];
      if (line.includes('---')) continue; // Skip separator lines
      
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length === 0) continue;
      
      const row = {};
      headers.forEach((header, index) => {
        let value = cells[index] || '';
        // Convert numeric strings to numbers
        if (/^\d+$/.test(value)) {
          value = parseInt(value, 10);
        } else if (/^\d+\.\d+$/.test(value)) {
          value = parseFloat(value);
        } else if (value.toLowerCase() === 'true') {
          value = true;
        } else if (value.toLowerCase() === 'false') {
          value = false;
        }
        row[header] = value;
      });
      dataRows.push(row);
    }
    
    if (dataRows.length > 0) {
      sheets[sheetName] = dataRows;
    }
  }
  
  return sheets;
}

function toKebabFileName(sheetName) {
  return `${sheetName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}-data.xlsx`;
}

// Create one Excel workbook per page, with each page tab as a sheet
function createExcelFiles(sheets) {
  const workbooksByFileName = {};

  for (const [sheetName, data] of Object.entries(sheets)) {
    const fileName = sheetFileNames[sheetName] || toKebabFileName(sheetName);
    if (!workbooksByFileName[fileName]) {
      workbooksByFileName[fileName] = XLSX.utils.book_new();
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbooksByFileName[fileName], worksheet, sheetName.substring(0, 31)); // Excel sheet name limit
  }

  for (const [fileName, workbook] of Object.entries(workbooksByFileName)) {
    const xlsxFilePath = path.join(outputFolderPath, fileName);
    XLSX.writeFile(workbook, xlsxFilePath);
    console.log(`Excel file created: ${xlsxFilePath} (${workbook.SheetNames.join(', ')})`);
  }
}

// Main
const sheets = parseMarkdownTables(mdContent);
console.log(`Found ${Object.keys(sheets).length} sheets:`, Object.keys(sheets));
createExcelFiles(sheets);
