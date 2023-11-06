import { test, expect } from "@playwright/test";

test("should display the dashboard page", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard");

  await expect(page.getByTestId("dashboard-aside")).toBeVisible();
  await expect(page.getByTestId("dashboard-videos")).toBeVisible();
});

test("should be able to add a new video and to delete it", async ({ page }) => {
  await page.goto("http://localhost:3000/dashboard/add");

  const addVideoForm = page.getByTestId("add-video-input");
  const searchVideoButton = page.getByTestId("search-video-button");
  const videoData = page.getByTestId("add-video-fetched-data");
  const addVideoButton = page.getByTestId("add-video-button");

  await expect(addVideoForm).toBeVisible();
  await expect(searchVideoButton).toBeVisible();

  await addVideoForm.fill("Invalid URL");
  await searchVideoButton.click();

  expect(page.getByText("Invalid YouTube URL")).toBeVisible();

  await addVideoForm.fill("https://www.youtube.com/watch?v=PtX5PF17tlQ");
  await searchVideoButton.click();

  await page.waitForLoadState("networkidle");

  expect(videoData).toBeVisible();

  await addVideoButton.click();

  await page.waitForLoadState("networkidle");

  // Go to dashboard page
  await page.goto("http://localhost:3000/dashboard");

  const videoCard = page.getByTestId("video-card-PtX5PF17tlQ");
  const dropdownButton = page.getByTestId(
    "video-card-actions-button-PtX5PF17tlQ"
  );
  const deleteVideoButton = page.getByText("Delete");
  const alertDialog = page.getByRole("alertdialog", {
    name: "Are you sure you want to delete this video?",
  });

  const confirmDeleteButton = page.getByTestId("confirm-delete-video");;

  await expect(videoCard).toBeVisible();

  await dropdownButton.click();

  await expect(deleteVideoButton).toBeVisible();

  await deleteVideoButton.click();

  await expect(alertDialog).toBeVisible();

  await confirmDeleteButton.click();

  await page.waitForLoadState("networkidle");

  await expect(videoCard).not.toBeVisible();
});
