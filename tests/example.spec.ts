import { test, expect } from '@playwright/test';

const url = import.meta.env?.BASE_URL || 'http://localhost:5173';


test('sanity check, see if nav is visible', async ({ page }) => {
  await page.goto(url);
    // Check if the navigation menu is visible
    const navMenu = page.locator('nav');
    await expect(navMenu).toBeVisible();

})

test('test all public page links', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveTitle(/New Remix App/);

  await page.goto(url + '/courses');
  await expect(page).toHaveTitle(/All Courses/);

  await page.goto(url + '/blog');
  await expect(page).toHaveTitle(/Blog/);


  await page.goto(url + '/auth/signup');
  await expect(page).toHaveTitle(/Sign Up/);



});

test('check nav signup link and navigate', async ({ page }) => {
  await page.goto('http://localhost:5173/');


  await page.getByText('Sign Up').click();
  await expect(page).toHaveURL('http://localhost:5173/auth/signup');

  

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
