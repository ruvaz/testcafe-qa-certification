import {Selector, t} from 'testcafe';

export default class LoginPage {
	
	constructor() {
		this.userInput = Selector("#user-name")
		this.passwordInput = Selector('#password')
		this.loginButton = Selector('#login-button')
		this.errorButton = Selector("button[class='error-button']")
		this.errorMessage = Selector("h3[data-test='error']")
	}
	
	async doLogin(user, pass) {
		await t
			.typeText(this.userInput, user)
			.typeText(this.passwordInput, pass)
			.click(this.loginButton)
	}
}
