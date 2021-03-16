import {Selector} from 'testcafe'

export default class ProductsPage {
	
	constructor() {
		this.productsTitle = Selector('.product_label')
		this.burgerMenu = Selector('#react-burger-menu-btn')
		this.logoutButton = Selector('#logout_sidebar_link')
		this.shopingCartButton = Selector('#shopping_cart_container')
		this.addButtons = Selector('#inventory_container').nth(1).find('button').withText('ADD TO CART')
		
	}
}
