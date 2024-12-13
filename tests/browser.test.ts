import { devices, test } from '@playwright/test';

test.use({
  ...devices['iPhone 13'],
  locale: 'en-US',
})

test('Test browser', async ({ page }) => {
  await page.goto('http://localhost:5173/pkmn');
  await page.pause()
});
