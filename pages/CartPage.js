import {Selector} from 'testcafe'

export default class LoginPage {

    constructor() {
        this.cartTitle = Selector("div[class='subheader']")
    }
}