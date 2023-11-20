const {test, expect} = require('@playwright/test');

test('Verify "All Books" link is visible', async ({page}) => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" link is visible', async ({page}) => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('nav.navbar');
    const loginLink = await page.$('a[href="/login"]');
    const isLinkVisible = await loginLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Register" link is visible', async ({page}) => {
    await page.goto('http://localhost:3001');
    await page.waitForSelector('nav.navbar');
    const registerLink = await page.$('a[href="/register"]');
    const isLinkVisible = await registerLink.isVisible();
    expect(isLinkVisible).toBe(true);
});