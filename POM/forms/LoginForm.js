class LoginForm {

    get title() {
        return cy.contains('app-signin-modal h4', 'Log in');
    }
    
    get emailField() {
        return cy.get('#signinEmail');
    }
    
    get passwordField() {
        return cy.get('#signinPassword');
    }

    get loginButton() {
        return cy.get('.modal-footer .btn-primary');
    }

    get closeIcon() {
        return cy.get('app-signin-modal [aria-label="Close"]');
    }

    get emailValidationError() {
        return cy.get('.form-group:nth-child(1) .invalid-feedback p');
    }

    get passwordValidationError() {
        return cy.get('.form-group:nth-child(2) .invalid-feedback p');
    }

    get wrongCredentialsError() {
        return cy.contains('.alert-danger', 'Wrong email or password');
    }

    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    clickLoginButton() {
        this.loginButton.click()
    }

    closeForm() {
        this.closeIcon.click();
    }

    signInWithCredentials(email, password) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLoginButton();
    }

    triggerErrorOnField(fieldName) {
        let element;

        if(fieldName === 'email') {
            element = this.emailField;
        } else if (fieldName === 'password') {
            element = this.passwordField;
        } else {
            throw new Error('Wrong fieldName');
        }

        element.focus();
        element.blur();
    }

    verifyValidationIsTriggeredOnField(fieldName, errorType) {
        let errorMessage = errorType === 'empty' ? 'required' : 'is incorrect';
        if (fieldName === 'email') {
            this.emailField.should('have.class', 'ng-invalid');
            this.emailValidationError.should('have.text', `Email ${errorMessage}`);
        } else if (fieldName === 'password') {
            this.passwordField.should('have.class', 'ng-invalid');
            this.passwordValidationError.should('have.text', `Password ${errorMessage}`);
        } else {
            throw new Error('Wrong fieldName');
        }
    }

    verifyWrongCredentialsErrorIsVisible() {
        this.wrongCredentialsError.should('be.visible');
    }

    verifyTitleIsNotVisible() {
        this.title.should('not.be.visible');
    }

}    

export default new LoginForm();