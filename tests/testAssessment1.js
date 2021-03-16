import '../pages/LoginPage'
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"

fixture`QA certification - Assessment 1`
	.page`https://www.saucedemo.com`;

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

test('1. Login valid user', async t => {
	
	// valid login
	await loginPage.doLogin('standard_user', 'secret_sauce');
	
	await t.expect(productsPage.titleElement.innerText).eql('Products');
	
});

test('2. Login Invalid user', async t => {
	
	// invalid login
	await loginPage.doLogin('wrong_user', 'secret');
	
	// validate error message
	await t
		.expect(loginPage.errorButton.exists).ok()
		.expect(loginPage.errorMessage.innerText)
		.eql('Epic sadface: Username and password do not match any user in this service');
	
});

test('3. Logout from products page', async t => {
	
	// valid Login
	await loginPage.doLogin('standard_user', 'secret_sauce');
	
	// logout
	await t
		.expect(productsPage.titleElement.exists).ok()
		.expect(productsPage.titleElement.innerText).eql('Products')
		.click(productsPage.burgerMenu)
		.click(productsPage.logoutButton);
	
});

test('4. Navigate to shoping Cart', async t => {
	
	// valid login
	await loginPage.doLogin('standard_user', 'secret_sauce');
	
	// navigate to shoping cart
	await t
		.click(productsPage.shopingCartButton)
		.expect(cartPage.cartTitle.innerText).eql('Your Cart');
	
});

test('5. Add a single item to the shopping cart', async t => {
	
	// valid login
	await loginPage.doLogin('standard_user', 'secret_sauce');
	
	await t
		.click(productsPage.addButtons.nth(2))
		.click(productsPage.shopingCartButton())
		.expect(cartPage.cartTitle.innerText).eql('Your Cart');
	
	await t.expect(cartPage.productName.innerText).eql("Sauce Labs Bolt T-Shirt");
	
});


test('6. Add multiple items to the shopping cart', async t => {
	
	// valid login
	await loginPage.doLogin('standard_user', 'secret_sauce');
	
	// select 3 products
	await t
		.click(productsPage.addButtons.nth(3))
		.click(productsPage.addButtons.nth(2))
		.click(productsPage.addButtons.nth(1))
		.click(productsPage.shopingCartButton());
	
	const cartCount = cartPage.cartItem.count;
	
	// validate 3 products in cart list
	await t.expect(cartCount).eql(3);
	
});

test('7. Continue with missing mail information', async t => {
	// valid login
	await loginPage.doLogin('standard_user', 'secret_sauce');
	
	// select 3 products
	await t
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


