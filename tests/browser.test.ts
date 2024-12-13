import { test } from '@playwright/test';


test('Test browser', async ({ page }) => {
  await page.goto('http://localhost:5173/pkmn');
  await page.pause()
});
