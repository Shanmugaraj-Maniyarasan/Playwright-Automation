import { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class DomCaptureHelper {
  public static async captureBodyHtml(page: Page, fileName: string) {
    const outputPath = this.getSnapshotPath(fileName);
    const html = await page.locator('body').innerHTML();
    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`DOM HTML captured at: ${outputPath}`);
  }

  public static async captureFieldInventory(page: Page, fileName: string) {
    const outputPath = this.getSnapshotPath(fileName);
    const fields = await page.locator('input, select, textarea, button').evaluateAll(elements =>
      elements.map((element, index) => {
        const input = element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement;
        const labels = Array.from(document.querySelectorAll('label'));
        const matchingLabel = input.id ? labels.find(label => label.getAttribute('for') === input.id) : undefined;

        return {
          index,
          tagName: input.tagName.toLowerCase(),
          type: input.getAttribute('type') || '',
          id: input.id || '',
          name: input.getAttribute('name') || '',
          title: input.getAttribute('title') || '',
          placeholder: input.getAttribute('placeholder') || '',
          label: matchingLabel?.textContent?.trim() || '',
          text: input.textContent?.trim() || '',
          value: input.getAttribute('value') || '',
          disabled: input.hasAttribute('disabled'),
          readonly: input.hasAttribute('readonly'),
          visible: Boolean(input.offsetWidth || input.offsetHeight || input.getClientRects().length)
        };
      })
    );

    fs.writeFileSync(outputPath, JSON.stringify(fields, null, 2), 'utf8');
    console.log(`DOM field inventory captured at: ${outputPath}`);
  }

  private static getSnapshotPath(fileName: string) {
    const outputDir = path.resolve(process.cwd(), 'mcp-artifacts', 'dom-snapshots');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    return path.join(outputDir, fileName);
  }
}