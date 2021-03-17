import {Selector} from 'testcafe';

export default class LoginPage {
	
	constructor() {
		this.userInput = Selector("#user-name")
		this.passwordInput = Selector('#password')
		this.loginButton = Selector('#login-button')
		this.errorMessage = Selector("h3[data-test='error']")
	}
	
}
