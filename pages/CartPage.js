import {Selector} from 'testcafe'

export default class LoginPage {
	
	constructor() {
		this.cartTitle = Selector("div[class='subheader']");
		this.productName = Selector(".inventory_item_name");
		this.cartItem = Selector('.cart_item');
	}
	
}
