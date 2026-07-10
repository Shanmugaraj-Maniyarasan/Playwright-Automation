# Base-MSME Playwright BDD Automation Framework

A professional Playwright automation framework using:
- **Page Object Model (POM)** architecture
- **playwright-bdd** for BDD step definitions
- **Excel-driven test data** management
- **Allure reporting** integration

## Project Structure

```
Base-msme/
├── data-utils/           # Utilities (Excel reader, runtime helpers)
├── features/             # Gherkin feature files
├── pages/                # Page Object classes
│   ├── login/
│   └── home/
├── steps/                # BDD step definitions
├── types/                # TypeScript interfaces for test data
├── test-data-excel/      # Excel test data files
├── test-data/documents/  # Documents for upload scenarios
├── recordings/           # Playwright codegen recordings
├── playwright.config.ts  # Playwright configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

3. **Add test data:**
   - Create `test-data-excel/login-data.xlsx` with a `LoginData` sheet
   - Required columns: `dataKey`, `url`, `userName`, `passWord`
   - Add rows: `config` (with url), `user1` (with credentials)

## Running Tests

```bash
# Run all tests
npm test

# Run specific feature
npx playwright test --grep "Login"

# Run with specific tag
npx playwright test --grep "@Smoke"
```

## Reports

- **Playwright Report:** `Open-Playwright-Report.bat` or `npx playwright show-report`
- **Allure Report:** 
  ```bash
  npm run allure:generate
  npm run allure:open
  ```
  Or use `Open-Allure-Report.bat`

## Framework Guidelines

Refer to `.github/copilot-instructions.md` for:
- Coding standards
- Page object patterns
- Step definition conventions
- Test data management
- Negative testing guidelines

## Quick Start - Adding New Pages

1. Create page class in `pages/<area>/<area>-page.ts`
2. Add type interfaces in `types/<area>-data.ts`
3. Create step file in `steps/<area>-steps.ts`
4. Add Excel data in `test-data-excel/<area>-data.xlsx`
5. Write feature scenarios in `features/<area>.feature`
