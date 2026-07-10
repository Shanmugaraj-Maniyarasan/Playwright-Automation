import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

// Create LoginData sheet data based on recorded scenarios
const loginData = [
  // Config row with application URL
  { dataKey: 'config', url: 'http://10.100.0.247:18081/lendperfect/login', userName: '', passWord: '' },
  // Valid user credentials
  { dataKey: 'user1', url: '', userName: 'SAI797', passWord: 'laps' },
  // Invalid credentials for negative testing
  { dataKey: 'invalidUser', url: '', userName: 'SAI79799', passWord: 'laps4534' },
  // Empty credentials for mandatory field validation
  { dataKey: 'emptyCredentials', url: '', userName: '', passWord: '' },
  // Username only - no password
  { dataKey: 'usernameOnly', url: '', userName: 'SAI797', passWord: '' },
  // Password only - no username
  { dataKey: 'passwordOnly', url: '', userName: '', passWord: 'laps' }
];

// Create workbook and worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(loginData);

// Set column widths for better readability
worksheet['!cols'] = [
  { wch: 20 }, // dataKey
  { wch: 50 }, // url
  { wch: 15 }, // userName
  { wch: 15 }  // passWord
];

// Add worksheet to workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'LoginData');

// Ensure output directory exists
const outputDir = path.resolve(process.cwd(), 'test-data-excel');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write Excel file
const outputPath = path.join(outputDir, 'login-data.xlsx');
XLSX.writeFile(workbook, outputPath);

console.log(`Excel file created successfully at: ${outputPath}`);
console.log('LoginData sheet contains the following rows:');
console.table(loginData);
