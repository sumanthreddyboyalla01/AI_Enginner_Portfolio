import { test, expect } from "@playwright/test";

test.describe("Portfolio Homepage", () => {
  test("loads and displays hero section", async ({ page }) => {
    await page.goto("/");

    // Expect the title to have specific text (or at least wait for load)
    await expect(page).toHaveTitle(/Sumanth/i);

    // Check if the Hero section text is visible
    const heroText = page.locator("text=Sumanth");
    await expect(heroText.first()).toBeVisible();
  });

  test("navigation works", async ({ page }) => {
    await page.goto("/");

    // Click on Contact link
    const contactLink = page.getByRole("link", { name: /Contact/i }).first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/.*#contact/);
    }
  });
});
