import { expect, test, type Page } from "@playwright/test";

// Headless WebGL runs on a software renderer: keep the viewport small and wait on positions, not durations.
test.use({ viewport: { width: 640, height: 400 } });

test.describe("parcours de base", () => {
  test("la page d'accueil mène à la scène 3D", async ({ page }) => {
    const pageErrors = collectPageErrors(page);

    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Cotonou Mission" })).toBeVisible();
    await page.getByRole("link", { name: "Jouer" }).click();

    await expect(page).toHaveURL(/\/play$/);
    await waitForScene(page);
    await expect(page.locator("canvas")).toBeVisible();
    await expect(page.getByTestId("game-hud")).toBeVisible();
    expect(pageErrors).toEqual([]);
  });

  test("le personnage avance et ne traverse pas les bâtiments", async ({ page }) => {
    await page.goto("/play");
    await waitForScene(page);

    const start = await getPlayerPosition(page);

    await page.keyboard.down("KeyW");
    await page.waitForFunction((startZ) => window.__cotonouDebug!.playerPosition[2] < startZ - 1.5, start[2]);
    await page.keyboard.up("KeyW");

    // The shop "nw-shop" faces the road at x = -7: without collisions the player would keep going to x = -40.
    await page.keyboard.down("KeyA");
    await waitForHorizontalStop(page);
    await page.keyboard.up("KeyA");

    const [x, y] = await getPlayerPosition(page);
    expect(x).toBeLessThan(-5.5);
    expect(x).toBeGreaterThan(-7);
    expect(y).toBeGreaterThan(0.1);
  });

  test("le joueur parle au PNJ de test avec E", async ({ page }) => {
    await page.goto("/play");
    await waitForScene(page);

    await page.keyboard.down("KeyW");
    await page.waitForFunction(() => window.__cotonouDebug!.playerPosition[2] < 10.3);
    await page.keyboard.up("KeyW");

    const prompt = page.getByRole("button", { name: /Parler au commerçant/ });
    await page.keyboard.down("KeyD");
    await expect(prompt).toBeVisible({ timeout: 30_000 });
    await page.keyboard.up("KeyD");

    await page.keyboard.press("KeyE");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText("Je suis un personnage de test");

    await page.keyboard.press("KeyE");
    await expect(dialog).toContainText("Tu veux savoir ce qui viendra ensuite ?");

    await page.keyboard.press("Digit3");
    await expect(dialog).toContainText("À tout à l'heure !");

    await page.keyboard.press("Enter");
    await expect(dialog).toBeHidden();
    await expect(prompt).toBeVisible();
  });
});

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

async function waitForScene(page: Page) {
  await page.waitForFunction(() => window.__cotonouDebug?.isPlayerGrounded === true, null, { timeout: 30_000 });
}

async function getPlayerPosition(page: Page) {
  return page.evaluate(() => [...(window.__cotonouDebug?.playerPosition ?? [0, 0, 0])]);
}

/** Resolves once the player has moved and its x position stayed still for one second. */
async function waitForHorizontalStop(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const startX = window.__cotonouDebug!.playerPosition[0];
        let lastX = startX;
        let stillSince = performance.now();
        const intervalId = setInterval(() => {
          const currentX = window.__cotonouDebug!.playerPosition[0];
          if (Math.abs(currentX - lastX) > 0.01) stillSince = performance.now();
          lastX = currentX;
          const hasMoved = Math.abs(currentX - startX) > 1;
          if (hasMoved && performance.now() - stillSince > 1000) {
            clearInterval(intervalId);
            resolve();
          }
        }, 100);
      }),
  );
}
