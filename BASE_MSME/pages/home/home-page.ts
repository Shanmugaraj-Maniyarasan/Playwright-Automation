import { Locator, Page, expect } from "@playwright/test";

export class HomePage {
  page: Page;
  // Home page locators
  welcomeMessage: Locator;
  dashboardLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Update these locators based on your application
    this.welcomeMessage = this.page.locator('.welcome-message');
    this.dashboardLink = this.page.locator('[data-testid="dashboard-link"]');
  }

  // Verify home page is loaded by checking URL
  public async verifyHomePageLoaded() {
    // Wait for navigation to homepage
    await this.page.waitForURL(/.*homepage.*/, { timeout: 30000 });
    // Verify URL contains homepage
    await expect(this.page).toHaveURL(/.*lendperfect\/home\/homepage.*/);
  }

  // Navigate to dashboard
  public async navigateToDashboard() {
    await this.dashboardLink.click();
  }
}
