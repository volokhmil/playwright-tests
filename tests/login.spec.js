import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import dotenv from "dotenv";

dotenv.config({ path: "/Users/admin/Desktop/Pet project/.env" });

// Ensure environment variables are set before running the test
if (!process.env.TEST_USER_EMAIL || !process.env.TEST_USER_PASSWORD) {
  throw new Error("Environment variables TEST_USER_EMAIL and TEST_USER_PASSWORD must be set.");
}

test("should log in and navigate to the dashboard", async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Use environment variables for credentials
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  await loginPage.goto();
  await loginPage.login(email, password);

  // Verify the URL after login
  await expect(page).toHaveURL(/\/am-dashboard$/);

  // Additional assertion to verify dashboard content
  await expect(page.locator("h1")).toHaveText("Let’s sort your day out");
});
