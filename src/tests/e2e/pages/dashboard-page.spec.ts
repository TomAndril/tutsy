import { test, expect } from "@playwright/test";

test("should display the dashboard page", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");

  await expect(page.getByTestId("dashboard-aside")).toBeInViewport();
});
