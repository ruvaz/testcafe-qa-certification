import {Selector, t} from 'testcafe'

export default class CheckoutPage {
	
	constructor() {
		this.firstNameField = Selector("#first-name")
		this.lastNameField = Selector(" #last-name")
		this.postalCodeField = Selector(" #postal-code")
		this.continueButton = Selector(".btn_primary.cart_button")
		this.errorMessage = Selector("h3[data-test='error']")
	}
	
	async doCheckout(firstName, lastName, codePostal) {
		await t
			.typeText(this.firstNameField, firstName)
			.typeText(this.lastNameField, lastName)
			.typeText(this.postalCodeField, codePostal)
			.click(this.continueButton)
	}
}
