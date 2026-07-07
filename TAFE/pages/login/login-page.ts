import { Locator, Page } from "@playwright/test";

export class LoginPage{
    page:Page;
    username:Locator;
    password:Locator;
    signUp:Locator;
    logoutButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.username=this.page.getByRole('textbox', { name: 'User Name' });
        this.password=this.page.getByRole('textbox', { name: 'Password' });
        this.signUp=this.page.getByRole('button', { name: 'Login' });
        this.logoutButton=this.page.locator('.logout');
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

    // Wait for loader to disappear
    private async waitForLoaderToHide() {
        const loader = this.page.locator('#loader');
        await loader.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {
            console.log('Loader timeout, continuing...');
        });
    }

    // Logout from application
    public async logout() {
        // Wait for loader to disappear first
        await this.waitForLoaderToHide();
        
        // Small delay to ensure any pending dialogs are handled
        await this.page.waitForTimeout(1000);
        
        // Set up dialog handler BEFORE clicking logout
        this.page.once('dialog', async dialog => {
            console.log(`Logout dialog: ${dialog.message()}`);
            await dialog.accept();
        });
        await this.logoutButton.click();
    }
}
