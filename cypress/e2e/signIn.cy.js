/// <reference types="cypress" />

import HomePage from "../../POM/pages/HomePage";
import LoginForm from "../../POM/forms/LoginForm";
import GaragePage from "../../POM/pages/GaragePage";


describe ('Testing the registration form', () => {
    beforeEach(() => {
        cy.visit('/');
        HomePage.openSignInForm();
    })

    it('Successful Sign in', () => {
        // LoginForm.enterEmail('evie.maier.w@gmail.com');
        // LoginForm.enterPassword('Password123asd');
        // LoginForm.clickLoginButton();
        LoginForm.signInWithCredentials('evie.maier.w@gmail.com', 'Password123asd');
        GaragePage.header.should('have.text', 'Garage');
        // cy.url().should('include', '/panel/garage');
    })

    it('Sign in without email', () => {
        LoginForm.triggerErrorOnField('email');
        LoginForm.verifyValidationIsTriggeredOnField('email', 'empty');
    })

    it('Sign in with incorrect email', () => {
        LoginForm.enterEmail('email');
        LoginForm.triggerErrorOnField('email', 'incorrect');

    })

    it('Sign in without password', () => {
        LoginForm.triggerErrorOnField('password');
        LoginForm.verifyValidationIsTriggeredOnField('password', 'empty');
    })

    it('Sign in with wrong credentials', () => {
        LoginForm.signInWithCredentials('evie.maier.w@gmail.com', 'WRONGPassword');
        LoginForm.verifyWrongCredentialsErrorIsVisible();
    })

    it('CLose Log in form via close icon', () => {
        LoginForm.closeForm();
        LoginForm.verifyTitleIsNotVisible();
    })
})