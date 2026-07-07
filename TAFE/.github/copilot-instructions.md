# Universal Copilot Instructions - Playwright BDD Framework Baseline

This instruction file defines a professional, reusable baseline for Playwright automation projects that follow:
- Page Object Model (POM)
- playwright-bdd step definitions
- Excel-driven test data
- Runtime state reuse for cross-role and cross-scenario workflows

Use this file to keep coding style, framework structure, and test design consistent across projects.

---

## 1) Primary objective

Generate production-grade Playwright + BDD automation that is:
- Maintainable
- Data-driven
- Layered by responsibility
- Reliable under UI timing variability
- Suitable for both positive and negative functional coverage

When automating a new flow, produce:
1. Page-wise field understanding
2. Accurate field interaction coverage
3. Validation-aware submit behavior
4. Strong negative scenario design
5. Reusable runtime data handoff when needed

---

## 2) Mandatory architecture

Follow a strict separation of concerns.

1. Pages layer
- Location: pages/
- Responsibility: locators, UI actions, page business methods
- Rule: no feature-step logic in pages

2. Steps layer
- Location: steps/
- Responsibility: Given/When/Then glue only
- Rule: keep steps thin, delegate behavior to page methods

3. Types layer
- Location: types/
- Responsibility: interfaces for structured test data
- Rule: use typed page method inputs for non-trivial payloads

4. Data utilities layer
- Location: data-utils/
- Responsibility: Excel reader, runtime store helpers, shared data logic

5. Test data layer
- Location: test-data-excel/
- Responsibility: sheet-based and key-based scenario data

6. Generated artifacts
- Typical output folders:
  - test-results/
  - playwright-report/
  - allure-results/
  - allure-report/
- Rule: do not hardcode generated artifact paths into business logic

---

## 3) Directory and naming conventions

Mirror feature areas between pages and steps.

Examples:
- pages/login_homepage/ <-> steps/login_homepage/
- pages/application_flow/ <-> steps/application_flow/
- pages/purchase_flow/ <-> steps/purchase_flow/

Naming:
- Respect existing project style.
- If project uses x.page.ts and x.steps.ts, continue that style.
- If project uses x-page.ts and x-step.ts, continue that style.
- Do not mix naming styles in the same project.

---

## 4) Step definition standards (playwright-bdd)

Step files must:
1. Import createBdd from playwright-bdd
2. Import the relevant page class
3. Import ExcelDataReader from data-utils
4. Load data by sheet and data key
5. Call one or a small number of page business methods

Step files must not:
- Contain raw locator logic
- Duplicate reusable UI action code
- Become long procedural scripts

Reference pattern:

```ts
import { createBdd } from 'playwright-bdd';
import { SomePage } from '../pages/some-area/some.page';
import { ExcelDataReader } from '../data-utils/excel-data-reader';

const { Given, When, Then } = createBdd();

When('User performs Some Action', async ({ page }) => {
  const somePage = new SomePage(page);

  ExcelDataReader.loadExcelFile('test-data-excel/some-data.xlsx');
  const data = ExcelDataReader.getDataByKey('SomeSheet', 'dataKey', 'SomeRow');
  if (!data) throw new Error('SomeSheet data not found for key SomeRow');

  await somePage.performSomeAction(data);
});
```

---

## 5) Page object standards

### 5.1 Class design

- One class per page or section.
- Keep page: Page and Locator fields as class members.
- Initialize locators in constructor only.
- Expose clear public business methods.
- Keep internal repeated behavior in private helper methods.

### 5.2 Locator strategy

Prefer in this order:
1. Stable ID selectors
2. getByRole with accessible name
3. hasText filters for robust semantic matching
4. Controlled fallback selector groups for unstable UI

Avoid:
- Deep fragile CSS chains
- nth-child driven selectors
- XPath unless unavoidable

### 5.3 Interaction strategy

- Wait for visibility or readiness before interacting.
- Scroll into view before click when needed.
- Convert uncertain values to String(value) before fill.
- Use minimal explicit waitForTimeout only for unavoidable transitions.
- Assert expected post-action state after save or submit.

### 5.4 Validation and error handling

After save, submit, update, or send actions:
1. Wait for feedback toast or alert.
2. Read feedback text.
3. Throw on error-like messages.
4. Assert success-like messages.

Error keywords to detect:
- required
- mandatory
- invalid
- error
- failed
- unable

### 5.5 Reusable helper patterns

Use private helpers for repeated patterns such as:
- safeSelect
- fillAndVerifyInput
- date picker utilities
- resilient click wrappers

Promote to shared utility only when reused by multiple page classes.

### 5.6 Mandatory page-class coding template (strict)

For all new page files going forward, follow the same coding style used for LoginPage.

Mandatory rules:
- Use `import { Locator, Page } from "@playwright/test";`
- Use class fields (not private readonly) for `page` and all locators.
- Initialize all locators in constructor using `this.page.locator(...)`.
- Use public methods for page actions.
- Keep action method parameters as `any` unless stronger typing is explicitly requested.
- Use consistent comments for key methods (`Launch the URL`, `Login Credential`, etc.) where applicable.

Reference implementation pattern:

```ts
import { Locator, Page } from "@playwright/test";

export class LoginPage{
  page:Page;
  username:Locator;
  password:Locator;
  signUp:Locator;

  constructor(page:Page){
    this.page=page;
    this.username=this.page.locator('[id="user"]');
    this.password=this.page.locator('[id="password"]');
    this.signUp=this.page.locator('[id="loginButton"]');
  }

  // Launch the URL
  public async launchUrl(url:string) {
    await this.page.goto(url);
  }

  // Login Credential
  public async login(username: any,  password: any ) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signUp.click();
  }
}
```

---

## 6) Excel test data standards

- Keep all Excel test files under test-data-excel/.
- Use stable key-column retrieval, typically dataKey.
- Sheet names and keys must be explicit and consistent.
- Validate null or missing data early and fail fast with clear errors.

For complex data objects:
- Define matching interfaces under types/.
- Type page method parameters.

---

## 7) Runtime state standards

For values reused later (application number, workflow id, reference id):
1. Capture from reliable UI source.
2. Persist using runtime state storage.
3. Read in downstream steps and roles.

Recommended location:
- test-data/runtime/

Rule:
- Avoid global mutable variables for cross-scenario state.

---

## 8) Negative testing standards

Design negative scenarios with professional coverage:
1. Mandatory field omission
2. Invalid format validation
3. Boundary value validation
4. Invalid selection handling
5. Read-only or disabled field assertions
6. Conditional rendering and dependency validation

Negative coverage must validate:
- Correct error message behavior
- No unintended successful submission
- UI state consistency after failure

---

## 9) MCP extraction artifact standards

If flow requires field inventory or DOM state extraction, store artifacts in a structured folder.

Recommended structure:
- mcp-artifacts/
  - field-inventory/<PageName>.json
  - dom-snapshots/<PageName>.json

If project already defines another artifact location, follow existing convention.

---

## 10) Logging and observability standards

- Log concise, action-oriented progress messages.
- Include key checkpoints for debugging.
- Avoid noisy per-line logging.
- Keep message style consistent within each file.

---

## 11) New flow implementation checklist

1. Create page object in pages/<area>/
2. Add typed data interfaces in types/ when needed
3. Create step file in steps/<area>/
4. Add or update Excel test data and data keys
5. Add runtime persistence for reusable identifiers
6. Add positive and negative scenarios
7. Validate selectors and assertions for stability

---

## 12) Non-negotiable guardrails

1. Do not introduce new frameworks or test runners.
2. Do not move away from POM + BDD + Excel pattern unless explicitly requested.
3. Do not put raw selectors in step files.
4. Do not create one-off utilities that duplicate existing framework utilities.
5. Do not add demo code unless explicitly requested.
6. Preserve existing repository conventions and coding style.

---

## 13) Clarifications to request when requirements are incomplete

Before implementing, ask only if required details are missing:
1. Target page or module name
2. Role and preconditions
3. Excel file, sheet, and data key
4. Expected save or submit behavior
5. Required negative cases
6. Environment-specific constraints

---

## 14) Missing utility fallback

If expected utilities are absent in a repository clone:
1. Recreate minimal compatible versions under data-utils/.
2. Keep APIs aligned with existing step and page calling patterns.
3. Do not redesign the framework unless requested.
