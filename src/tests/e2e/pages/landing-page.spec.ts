import { test, expect } from "@playwright/test";

test("should display the landing page", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveTitle(/Tutsy/)
});
