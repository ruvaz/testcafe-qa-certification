import {Selector} from 'testcafe'

export default class ProductsPage {
	
	constructor() {
		this.titleElement = Selector('.product_label')
		this.burgerMenu = Selector('#react-burger-menu-btn')
		this.logoutButton = Selector('#logout_sidebar_link')
		this.shopingCartButton = Selector('#shopping_cart_container')
		
	}
}
