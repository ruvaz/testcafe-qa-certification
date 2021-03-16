import {Selector} from 'testcafe'

export default class CheckoutPage {
	
	constructor() {
		this.continueButton = Selector(".btn_primary.cart_button")
		this.errorMessage = Selector("h3[data-test='error']")
	}
	
}
