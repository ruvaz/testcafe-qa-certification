import '../pages/LoginPage'
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage"

fixture`QA certification Saucedemo Tests`
	.page`https://www.saucedemo.com`;

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();

test.skip('Login valid user', async t => {

	// valid login
	await loginPage.doLogin('standard_user', 'secret_sauce')
	
	await t.expect(productsPage.titleElement.innerText).eql('Products');
	
});

test.skip('Login Invalid user', async t => {
	
	// invalid login
	await loginPage.doLogin('wrong_user', 'secret')
	
	// validate error message
	await t
		.expect(loginPage.errorButton.exists).ok()
		.expect(loginPage.errorMessage.innerText)
		.eql('Epic sadface: Username and password do not match any user in this service');
	
});

test.skip('Logout from products page', async t => {
	
	// valid Login
	await loginPage.doLogin('standard_user', 'secret_sauce')
	
	// logout
	await t
		.expect(productsPage.titleElement.exists).ok()
		.expect(productsPage.titleElement.innerText).eql('Products')
		.click(productsPage.burgerMenu)
		.click(productsPage.logoutButton);
	
});

test('Navigate to shoping Cart', async t => {
	
	// valid login
	await loginPage.doLogin('standard_user', 'secret_sauce');
	
	// navigate to shoping cart
	await t
		.click(productsPage.shopingCartButton)
		.expect(cartPage.cartTitle.innerText).eql('Your Cart');
	
});
