import JSONconfig from '../config/config.json';
import {Role} from "testcafe";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
import OverviewPage from "../pages/OverviewPage"
import FinishPage from "../pages/FinishPage"


const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();
const overviewPage = new OverviewPage();
const finishPage = new FinishPage();
const dataSet = require('../data/data.json');

fixture`QA certification - Assessment 1`.page(JSONconfig.url);

test('1. Valid user login.', async t => {
	await t
		.useRole(standardUser)
		.expect(productsPage.productsTitle.innerText).eql('Products');
});

test('2. Invalid user login.', async t => {
	await t
		.useRole(invalidUser)
		.expect(loginPage.loginButton.exists).ok()
});

test('3. Logout from products page.', async t => {
	await t
		.useRole(standardUser)
		.expect(productsPage.productsTitle.exists).ok()
		.expect(productsPage.productsTitle.innerText).eql('Products')
		.click(productsPage.burgerMenu)
		.click(productsPage.logoutButton);
});

test('4. Goes to the shopping cart.', async t => {
	await t
		.useRole(standardUser)
		.click(productsPage.shopingCartButton)
		.expect(cartPage.cartTitle.innerText).eql('Your Cart');
});

test('5. Add a single item to the shopping cart.', async t => {
	await t
		.useRole(standardUser)
		.click(productsPage.addButtons.nth(2))
		.click(productsPage.shopingCartButton())
		.expect(cartPage.cartTitle.innerText).eql('Your Cart');
	
	await t.expect(cartPage.productName.innerText).eql("Sauce Labs Bolt T-Shirt");
});


test('6. Add multiple items to the shopping cart.', async t => {
	// select 3 products
	await t
		.useRole(standardUser)
		.click(productsPage.addButtons.nth(3))
		.click(productsPage.addButtons.nth(2))
		.click(productsPage.addButtons.nth(1))
		.click(productsPage.shopingCartButton());
	
	const cartCount = cartPage.cartItem.count;
	
	// validate 3 products in cart list
	await t.expect(cartCount).eql(3);
});

test('7. User mail information fails', async t => {
	await t
		.useRole(standardUser)
		.click(productsPage.addButtons.nth(3))
		.click(productsPage.addButtons.nth(2))
		.click(productsPage.addButtons.nth(1))
		.click(productsPage.shopingCartButton())
		.click(cartPage.chekoutButton)
	
	await t
		.click(checkoutPage.continueButton)
		.expect(checkoutPage.errorMessage.exists).ok()
		.expect(checkoutPage.errorMessage.innerText).eql("Error: First Name is required");
});


test("8. Fill in the user information.", async t => {
	await t
		.useRole(standardUser)
		.click(productsPage.addButtons.nth(3))
		.click(productsPage.addButtons.nth(2))
		.click(productsPage.addButtons.nth(1))
		.click(productsPage.shopingCartButton)
		.click(cartPage.chekoutButton);
	
	await checkoutPage.doCheckout(dataSet.userInfo.name, dataSet.userInfo.lastname, dataSet.userInfo.zip);
	
	await t
		.expect(overviewPage.overviewTitle.innerText)
		.eql("Checkout: Overview")
});


test("9. Validate that the items on the overview page match the added items.", async t => {
	await t
		.useRole(standardUser)
		.click(productsPage.addButtons.nth(3)) //Sauce Labs Fleece Jacket
		.click(productsPage.addButtons.nth(2)) //Sauce Labs Bolt T-Shirt
		.click(productsPage.addButtons.nth(1)) //Sauce Labs Bike Light
		.click(productsPage.shopingCartButton)
		.click(cartPage.chekoutButton);
	
	await checkoutPage.doCheckout(dataSet.userInfo.name, dataSet.userInfo.lastname, dataSet.userInfo.zip);
	
	await t
		.expect(overviewPage.overviewTitle.innerText)
		.eql("Checkout: Overview")
		.expect(overviewPage.inventoryItem.exists).ok()
		.expect(overviewPage.inventoryItem.nth(0).innerText).eql("Sauce Labs Fleece Jacket")
		.expect(overviewPage.inventoryItem.nth(1).innerText).eql("Sauce Labs Bolt T-Shirt")
		.expect(overviewPage.inventoryItem.nth(2).innerText).eql("Sauce Labs Bike Light")
});

test("10. Purchase 3 items completed.", async t => {
	await t
		.useRole(standardUser)
		.click(productsPage.addButtons.nth(3)) //Sauce Labs Fleece Jacket
		.click(productsPage.addButtons.nth(2)) //Sauce Labs Bolt T-Shirt
		.click(productsPage.addButtons.nth(1)) //Sauce Labs Bike Light
		.click(productsPage.shopingCartButton)
		.click(cartPage.chekoutButton);
	
	await checkoutPage.doCheckout(dataSet.userInfo.name, dataSet.userInfo.lastname, dataSet.userInfo.zip);
	
	await t
		.click(overviewPage.finishButton)
		.expect(finishPage.completeHeader.exists).ok()
		.expect(finishPage.completeHeader.innerText).eql("THANK YOU FOR YOUR ORDER")
});


// Role for: stardar user login
const standardUser = Role(JSONconfig.url, async t => {
	await t
		.typeText(loginPage.userInput, dataSet.validUser.username)
		.typeText(loginPage.passwordInput, dataSet.validUser.passwd)
		.click(loginPage.loginButton)
}, {preserveUrl: true});

// Role for: invalid user login
const invalidUser = Role(JSONconfig.url, async t => {
	await t
		.typeText(loginPage.userInput, dataSet.invalidUser.username)
		.typeText(loginPage.passwordInput, dataSet.invalidUser.passwd)
		.click(loginPage.loginButton)
		.expect(loginPage.errorMessage.innerText)
		.eql('Epic sadface: Username and password do not match any user in this service');
}, {preserveUrl: true});
