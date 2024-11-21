import { test, expect } from "@playwright/test";
import { resetDatabase } from "./utils/resetDatabase";

test.describe("Dashboard Page testsx", () => {
  test.beforeEach(async ({ page }) => {
    resetDatabase();
    await page.goto("http://localhost:3001");
  });

  test("should render the SearchBar component", async ({ page }) => {
    const searchBarPlaceholder = "Digite um CPF válido";

    await expect(
      page.locator(`input[placeholder="${searchBarPlaceholder}"]`)
    ).toBeVisible();
  });

  test("should render columns with titles", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Aprovado" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pronto para revisar" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Reprovado" })
    ).toBeVisible();
  });

  test("should navigate to New Admission Page on button click", async ({
    page,
  }) => {
    await page.goto("/");
    const newAdmissionButton = page.locator("text=Nova Admissão");
    await newAdmissionButton.click();
    await page.waitForURL(/\/#\/new-user$/, { timeout: 10000 });
    expect(page.url()).toMatch(/\/#\/new-user$/);
  });

  test("should search records by CPF", async ({ page }) => {
    await expect(page.getByTestId("registration-card").first()).toBeVisible({
      timeout: 5000,
    });
    const cpfInput = page.locator('input[placeholder="Digite um CPF válido"]');
    await cpfInput.fill("087.149.259-82");

    await page.waitForTimeout(500);

    const registrationCards = page.locator('[data-testid="registration-card"]');
    await expect(registrationCards).toHaveCount(3);

    await expect(
      page.getByRole("heading", { name: "Test User 1" }).first()
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Test User 1" })
    ).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: "Test User 2" })
    ).toHaveCount(1);
    await expect(
      page.getByRole("heading", { name: "Test User 3" })
    ).toHaveCount(1);
  });

  test("should search records by Status", async ({ page }) => {
    await expect(page.getByTestId("registration-card").first()).toBeVisible({
      timeout: 5000,
    });

    const statusSelect = page.locator("select");
    await statusSelect.selectOption("REVIEW");

    await page.waitForTimeout(500);

    const registrationCards = page.locator('[data-testid="registration-card"]');
    await expect(registrationCards).toHaveCount(2);

    await expect(
      page.getByRole("heading", { name: "Test User 1" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Test User 3" })
    ).toBeVisible();
  });

  test("should approve a record under review", async ({ page }) => {
    await expect(page.getByTestId("registration-card").first()).toBeVisible({
      timeout: 5000,
    });

    await expect(
      page.locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
    ).toHaveCount(2);
    await expect(
      page.locator(
        '[data-testid="column-APPROVED"] [data-testid="registration-card"]'
      )
    ).toHaveCount(1);

    const firstReviewCard = page
      .locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
      .first();
    await firstReviewCard.getByRole("button", { name: "Aprovar" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Prosseguir" }).click();

    await expect(
      page.locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
    ).toHaveCount(1);
    await expect(
      page.locator(
        '[data-testid="column-APPROVED"] [data-testid="registration-card"]'
      )
    ).toHaveCount(2);
  });

  test("should reject a record under review", async ({ page }) => {
    await expect(page.getByTestId("registration-card").first()).toBeVisible({
      timeout: 5000,
    });

    await expect(
      page.locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
    ).toHaveCount(2);
    await expect(
      page.locator(
        '[data-testid="column-REPROVED"] [data-testid="registration-card"]'
      )
    ).toHaveCount(0);

    const reviewCard = page
      .locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
      .first();
    await reviewCard.getByRole("button", { name: "Reprovar" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Prosseguir" }).click();

    await expect(
      page.locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
    ).toHaveCount(1);
    await expect(
      page.locator(
        '[data-testid="column-REPROVED"] [data-testid="registration-card"]'
      )
    ).toHaveCount(1);
  });

  test("should return a rejected record to review", async ({ page }) => {
    await expect(page.getByTestId("registration-card").first()).toBeVisible({
      timeout: 5000,
    });

    const reviewCard = page
      .locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
      .first();
    await reviewCard.getByRole("button", { name: "Reprovar" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Prosseguir" }).click();

    const reprovedCard = page
      .locator(
        '[data-testid="column-REPROVED"] [data-testid="registration-card"]'
      )
      .first();

    await reprovedCard
      .getByRole("button", { name: "Revisar novamente" })
      .click();

    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Prosseguir" }).click();

    await expect(
      page.locator(
        '[data-testid="column-REVIEW"] [data-testid="registration-card"]'
      )
    ).toHaveCount(2);
    await expect(
      page.locator(
        '[data-testid="column-REPROVED"] [data-testid="registration-card"]'
      )
    ).toHaveCount(0);
  });
});
