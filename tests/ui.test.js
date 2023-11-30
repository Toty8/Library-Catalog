const {test, expect} = require('@playwright/test');
const pageURL = 'http://localhost:3001';
const loginUserPageURL = 'http://localhost:3001/login';
const registerUserPageURL = 'http://localhost:3001/register';
const catalogPageURL = 'http://localhost:3001/catalog';
const addBookPageURL = 'http://localhost:3001/create';
const navbar = 'nav.navbar';
const userEmail = 'john@abv.bg';
const userPassword = '123456';
const newUserEmail = 'test@test111.bg';
const newUserPassword = '123456';
const bookImageURL = 'https://example.com/book-image.jpg';

test('Verify "All Books" link is visible', async ({page}) => {
    await page.goto(pageURL);
    await page.waitForSelector(navbar);
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(false);
});

test('Verify "Login" link is visible', async ({page}) => {
    await page.goto(pageURL);
    await page.waitForSelector(navbar);
    const loginLink = await page.$('a[href="/login"]');
    const isLinkVisible = await loginLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Register" link is visible', async ({page}) => {
    await page.goto(pageURL);
    await page.waitForSelector(navbar);
    const registerLink = await page.$('a[href="/register"]');
    const isLinkVisible = await registerLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "All Books" link is visible after user login', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "My Books" link is visible after user login', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    const myBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Add Book" link is visible after user login', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    const addBookLink = await page.$('a[href="/create"]');
    const isLinkVisible = await addBookLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify That the User Email Address Is Visible', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    const userEmailMessage = await page.textContent('#user > span');
    expect(userEmailMessage).toBe(`Welcome, ${userEmail}`);
});

test('Login with valid credentials', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    await page.$('a[href = "/catalog"]');
    expect(page.url()).toBe(catalogPageURL);
});

test('Login with no credentials', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/login"]');
    expect(page.url()).toBe(loginUserPageURL);
});

test('Login with no email', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/login"]');
    expect(page.url()).toBe(loginUserPageURL);
});

test('Login with no password', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/login"]');
    expect(page.url()).toBe(loginUserPageURL);
});

test('Register with valid credentials', async ({page}) => {
    await page.goto(registerUserPageURL);
    await page.fill('input[name = "email"]', newUserEmail);
    await page.fill('input[name = "password"]', newUserPassword);
    await page.fill('input[name = "confirm-pass"]', newUserPassword);
    await page.click('input[type = "submit"]');
    await page.$('a[href = "/catalog"]');
    expect(page.url()).toBe(catalogPageURL);
});

test('Register with no credentials', async ({page}) => {
    await page.goto(registerUserPageURL);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/register"]');
    expect(page.url()).toBe(registerUserPageURL);
});

test('Register with no email', async ({page}) => {
    await page.goto(registerUserPageURL);
    await page.fill('input[name = "password"]', newUserPassword);
    await page.fill('input[name = "confirm-pass"]', newUserPassword);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/register"]');
    expect(page.url()).toBe(registerUserPageURL);
});

test('Register with no password', async ({page}) => {
    await page.goto(registerUserPageURL);
    await page.fill('input[name = "email"]', newUserEmail);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/register"]');
    expect(page.url()).toBe(registerUserPageURL);
});

test('Register with no confirm password', async ({page}) => {
    await page.goto(registerUserPageURL);
    await page.fill('input[name = "email"]', newUserEmail);
    await page.fill('input[name = "password"]', newUserPassword);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/register"]');
    expect(page.url()).toBe(registerUserPageURL);
});

test('Register with different passwords', async ({page}) => {
    await page.goto(registerUserPageURL);
    await page.fill('input[name = "email"]', newUserEmail);
    await page.fill('input[name = "password"]', newUserPassword);
    await page.fill('input[name = "confirm-pass"]', `${newUserPassword}09`);
    await page.click('input[type = "submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href = "/register"]');
    expect(page.url()).toBe(registerUserPageURL);
});

test('Add book with correct data', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href = "/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'Test Book description');
    await page.fill('#image', bookImageURL);
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    await page.waitForURL(catalogPageURL);
    expect(page.url()).toBe(catalogPageURL);
});

test('Add book with empty title field', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href = "/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#description', 'Test Book description');
    await page.fill('#image', bookImageURL);
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe(addBookPageURL);
});

test('Add book with empty description field', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href = "/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#image', bookImageURL);
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe(addBookPageURL);
});

test('Add book with empty image URL field', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href = "/create"]');
    await page.waitForSelector('#create-form');
    await page.fill('#title', 'Test Book');
    await page.fill('#description', 'Test Book description');
    await page.selectOption('#type', 'Fiction');
    await page.click('#create-form input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/create"]');
    expect(page.url()).toBe(addBookPageURL);
});

test('Login and verify all books are displayed', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.waitForSelector('.dashboard');
    const bookElements = await page.$$('.other-books-list li');
    expect(bookElements.length).toBeGreaterThan(0);
});

test.skip('Login and verify no books are displayed', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.waitForSelector('.dashboard');
    const noBooksMessage = await page.textContent('.no-books');
    expect(noBooksMessage).toBe('No books in database!');
});

test('Login and navigate to Details page', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Do not login and navigate to Details page', async ({page}) => {
    await page.goto(pageURL);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    expect(detailsPageTitle).toBe('Test Book');
});

test('Do not login and check if book info is correct', async ({page}) => {
    await page.goto(pageURL);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks a.button');
    await page.waitForSelector('.book-information');
    const detailsPageTitle = await page.textContent('.book-information h3');
    const detailsPageDescription = await page.textContent('.book-description p');
    const detailsPageImage = await page.innerHTML('.book-information p.img');
    const detailsPageType = await page.textContent('.book-information p.type');
    expect(detailsPageTitle).toBe('Test Book');
    expect(detailsPageDescription).toBe('Test Book description');
    expect(detailsPageImage).toContain(bookImageURL);
    expect(detailsPageType).toBe('Type: Fiction');
});

test('Login and navigate to Details page to check if Edit and Delete buttons are visible', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', 'peter@abv.bg');
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks:has-text("Outlander") a.button');
    await page.waitForSelector('.book-information');
    const editButton = await page.$('a:has-text("Edit")');
    const deleteButton = await page.$('a:has-text("Delete")');
    const isEditLinkVisible = await editButton.isVisible();
    const isDeleteLinkVisible = await deleteButton.isVisible();
    expect(isEditLinkVisible).toBe(true);
    expect(isDeleteLinkVisible).toBe(true);
});

test('Login and navigate to Details page to check if Edit and Delete buttons are not visible', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', 'peter@abv.bg');
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks:has-text("To Kill a Mockingbird") a.button');
    await page.waitForSelector('.book-information');
    const editButton = await page.$('a:has-text("Edit")');
    const deleteButton = await page.$('a:has-text("Delete")');
    expect(editButton).toBeNull();
    expect(deleteButton).toBeNull();
});

test('Login and navigate to Details page to check if Like button is visible', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', 'peter@abv.bg');
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks:has-text("To Kill a Mockingbird") a.button');
    await page.waitForSelector('.book-information');
    const likeButton = await page.$('a:has-text("Like")');
    const isLikeLinkVisible = await likeButton.isVisible();
    expect(isLikeLinkVisible).toBe(true);
});

test('Login and navigate to Details page to check if Like button is not visible', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', 'peter@abv.bg');
    await page.fill('input[name = "password"]', userPassword);
    await Promise.all([
        page.click('input[type = "submit"]'),
        page.waitForURL(catalogPageURL)
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks');
    await page.click('.otherBooks:has-text("Outlander") a.button');
    await page.waitForSelector('.book-information');
    const likeButton = await page.$('a:has-text("Like")');
    expect(likeButton).toBeNull();
});

test('Verify "Logout" link is visible after user login', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    const logoutLink = await page.$('a[href="javascript:void(0)"]');
    const isLinkVisible = await logoutLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Logout" link redirect correctly', async ({page}) => {
    await page.goto(loginUserPageURL);
    await page.fill('input[name = "email"]', userEmail);
    await page.fill('input[name = "password"]', userPassword);
    await page.click('input[type = "submit"]');
    await page.click('a[href="javascript:void(0)"]');
    expect(page.url()).toBe(catalogPageURL);
});