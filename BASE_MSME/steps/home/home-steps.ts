import { createBdd } from 'playwright-bdd';
import { HomePage } from '../../pages/home/home-page';

const { Given, When, Then } = createBdd();

let homePage: HomePage;

Then('I should see the home page', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.verifyHomePageLoaded();
});

// Manual step: Pause for user to select proposal from dashboard
When('I wait for manual proposal selection', async ({ page }) => {
  console.log('\\n========== MANUAL ACTION REQUIRED ==========');
  console.log('Please open your proposal/application manually.');
  console.log('Click "Resume" in Playwright Inspector when ready.');
  console.log('=============================================\\n');
  await page.pause();
});

When('I navigate to dashboard', async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.navigateToDashboard();
});
