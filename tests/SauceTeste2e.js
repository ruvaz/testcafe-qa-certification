import {Selector} from 'testcafe';
import '../pages/LoginPage'
import LoginPage from "../pages/LoginPage";

fixture`My First Fixture`
    .page`https://www.saucedemo.com`;

test('Login', async t => {

    const successNotification = Selector('.alert.alert-success')
    const page = new LoginPage();
    await t
        .typeText(LoginPage., 'standard_user')
        .typeText('#password', 'secret_sauce')
        .click('button.btn.btn-primary')
        .expect(successNotification.innerText).eql('This is flash notice (success)');
});