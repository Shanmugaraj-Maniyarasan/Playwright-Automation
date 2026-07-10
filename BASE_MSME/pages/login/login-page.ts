import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  page: Page;
  username: Locator;
  password: Locator;
  loginButton: Locator;
  logoutButton: Locator;
  mandatoryFieldAlert: Locator;
  invalidCredentialsAlert: Locator;
  clickHereButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locators based on recorded application interactions
    this.username = this.page.getByRole('textbox', { name: 'User name' });
    this.password = this.page.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.page.getByRole('button', { name: 'LOGIN' });
    this.logoutButton = this.page.locator('.logout');
    // Alert locators for validation messages - use first() to avoid strict mode violation
    this.mandatoryFieldAlert = this.page.getByRole('alert', { name: 'Kindly Fill All Mandatory(*)' }).first();
    this.invalidCredentialsAlert = this.page.getByRole('alert', { name: 'Invalid Username/Password' }).first();
    // Post-login click here button
    this.clickHereButton = this.page.getByRole('button', { name: 'Click Here' }).nth(1);
  }

  // Launch the URL
  public async launchUrl(url: string) {
    await this.page.goto(url);
  }

  // Login Credential
  public async login(username: any, password: any) {
    await this.username.clear();
    await this.username.fill(String(username));
    await this.password.clear();
    await this.password.fill(String(password));
    await this.loginButton.click();
  }

  // Login with empty credentials - negative scenario
  public async loginWithEmptyCredentials() {
    await this.username.clear();
    await this.password.clear();
    await this.loginButton.click();
  }

  // Click login without filling password
  public async loginWithUsernameOnly(username: any) {
    await this.username.clear();
    await this.username.fill(String(username));
    await this.password.clear();
    await this.loginButton.click();
  }

  // Click login without filling username
  public async loginWithPasswordOnly(password: any) {
    await this.username.clear();
    await this.password.clear();
    await this.password.fill(String(password));
    await this.loginButton.click();
  }

  // Verify mandatory field alert is displayed
  public async verifyMandatoryFieldAlert() {
    await expect(this.mandatoryFieldAlert).toBeVisible({ timeout: 2000 });
  }

  // Verify invalid credentials alert is displayed
  public async verifyInvalidCredentialsAlert() {
    await expect(this.invalidCredentialsAlert).toBeVisible({ timeout: 2000 });
  }

  // Click 'Click Here' button after successful login
  public async clickHereToNavigate() {
    await this.clickHereButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.clickHereButton.click();
  }

  // Wait for loader to disappear
  private async waitForLoaderToHide() {
    const loader = this.page.locator('#loader');
    await loader.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
      console.log('Loader timeout, continuing...');
    });
  }

  // Logout from application
  public async logout() {
    await this.waitForLoaderToHide();

    this.page.once('dialog', async dialog => {
      console.log(`Logout dialog: ${dialog.message()}`);
      await dialog.accept();
    });

    await this.logoutButton.click();
  }
}
