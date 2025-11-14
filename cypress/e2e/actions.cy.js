/// <reference types="cypress" />

describe('Testing the registration form', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	context('Registration and login buttons exist and open the form', () => {
		it('The Signin button exists and open the form', () => {
			cy.get('.header_signin').should('be.visible').click();
			cy.contains('.btn-primary', 'Login').should('be.visible');
		});
		it('The Registration button exists and open the form', () => {
			cy.get('.header_signin').click();
			cy.contains('.btn-link', 'Registration').click();
			cy.contains('.btn-primary', 'Register').should('be.visible');
		});
		it('The Sign up button exists and open the form', () => {
			cy.get('.hero-descriptor_btn').click();
			cy.contains('.btn-primary', 'Register').should('be.visible');
		});
	});

	context('Testing the "Name" field', () => {
		beforeEach(() => {
			cy.get('.hero-descriptor_btn').click();
		});
		it('Error if field Name is empty', () => {
			cy.get('#signupName').clear().blur();
			cy.contains('Name required').should('be.visible');
			cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Correct name', () => {
			cy.get('#signupName').type('Evelina').blur().should('have.css', 'border-color', 'rgb(206, 212, 218)');
		});
		//  it('Correct name with a space', () => {
		//     cy.get('#signupName').type(' Evelina ').blur();
		//     cy.contains('Name is invalid').should('not.be.visible');//баг
		// })
		it('Error if the name is wrong', () => {
			cy.get('#signupName').type('8765!@#$%').blur();
			cy.contains('Name is invalid').should('be.visible');
			cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if the length is wrong, less than 2', () => {
			cy.get('#signupName').type('E').blur();
			cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
			cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if the length is wrong, more than 20', () => {
			cy.get('#signupName').type('Eyuiopnbtfgdjnbgfhdkd').blur();
			cy.contains('Name has to be from 2 to 20 characters long').should('be.visible');
			cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if the name is not in English', () => {
			cy.get('#signupName').type('Эвелина').blur();
			cy.contains('Name is invalid').should('be.visible');
			cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
	});

	context('Testing the "Last name" field', () => {
		beforeEach(() => {
			cy.get('.hero-descriptor_btn').click();
		});
		it('Error if field Last name is empty', () => {
			cy.get('#signupLastName').clear().blur();
			cy.contains('Last name required').should('be.visible');
			cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Correct last name', () => {
			cy.get('#signupLastName').type('Maier').blur().should('have.css', 'border-color', 'rgb(206, 212, 218)');
		});
		//  it('Correct last name with a space', () => {
		//     cy.get('#signupLastName').type(' Maier ').blur();
		//     cy.contains('Last name is invalid').should('not.be.visible');//баг
		// })
		it('Error if the last name is wrong', () => {
			cy.get('#signupLastName').type('8765!@#$%').blur();
			cy.contains('Last name is invalid').should('be.visible');
			cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if the length is wrong, less than 2', () => {
			cy.get('#signupLastName').type('M').blur();
			cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');
			cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if the length is wrong, more than 20', () => {
			cy.get('#signupLastName').type('Myuiopnbtfgdjnbgfhdkd').blur();
			cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible');
			cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if the last name is not in English', () => {
			cy.get('#signupLastName').type('Майер').blur();
			cy.contains('Last name is invalid').should('be.visible');
			cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
	});

	context('Testing the "Email" field', () => {
		beforeEach(() => {
			cy.get('.hero-descriptor_btn').click();
		});
		it('Error if field email is empty', () => {
			cy.get('#signupEmail').clear().blur();
			cy.contains('Email required').should('be.visible');
			cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Correct email', () => {
			cy.get('#signupEmail').type('test@gmail.com').blur().should('have.css', 'border-color', 'rgb(206, 212, 218)');
		});
		it('Error if the email is wrong', () => {
			cy.get('#signupEmail').type('987))имаил@gmail.com').blur();
			cy.contains('Email is incorrect').should('be.visible');
			cy.get('#signupEmail').type('test@gmail').blur();
			cy.contains('Email is incorrect').should('be.visible');
			cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
	});

	context('Testing the "Password" field', () => {
		beforeEach(() => {
			cy.get('.hero-descriptor_btn').click();
		});
		it('Error if field password is empty', () => {
			cy.get('#signupPassword').clear().blur();
			cy.contains('Password required').should('be.visible');
			cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Correct password', () => {
			cy.get('#signupPassword').type('Password123').blur().should('have.css', 'border-color', 'rgb(206, 212, 218)');
		});
		it('Error if the password is wrong', () => {
			const incorrectPassword = ['password', 'PASSWORD', '12345678', 'passwor1', 'PASSWOR1', 'Password'];
			incorrectPassword.forEach((value) => {
				cy.get('.hero-descriptor_btn').click({ force: true });
				cy.get('#signupPassword').clear();
				cy.get('#signupPassword').type(value).blur();
				cy.contains(
					'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
				).should('be.visible');
			});
		});
		it('Error if the length is wrong, less than 8 symbols', () => {
			cy.get('#signupPassword').type('Pa1').blur();
			cy.contains(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
			).should('be.visible');
			cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if the length is wrong, more than 15 symbols', () => {
			cy.get('#signupPassword').type('Password1Password2').blur();
			cy.contains(
				'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
			).should('be.visible');
			cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
	});

	context('Testing the "Re-enter password" field', () => {
		beforeEach(() => {
			cy.get('.hero-descriptor_btn').click();
		});
		it('Error if field Re-enter password is empty', () => {
			cy.get('#signupRepeatPassword').clear().blur();
			cy.contains('Re-enter password required').should('be.visible');
			cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
		it('Error if password do not match', () => {
			cy.get('#signupPassword').type('Password123');
			cy.get('#signupRepeatPassword').type('Password125').blur();
			cy.contains('Passwords do not match').should('be.visible');
			cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});
	});
});

describe('Testing registration and authorization', () => {
	it('The Register button is disabled if data incorrect', () => {
		cy.registration('Evelina', 'Maier', '123', 'Password123asd', 'Password123asd');
	});

	context('User registration, authorization', () => {
		const date = new Date();
		const uniqueEmail = `evie.maier.w+${date.getDate()}${date.getHours()}@gmail.com`;

		it('The Register button works and the user is created', () => {
			cy.registration('Evelina', 'Maier', uniqueEmail, 'Password123asd', 'Password123asd');
			cy.url().should('include', '/panel/garage');
		});
		it('Error if user re-registers', () => {
			cy.registration('Evelina', 'Maier', uniqueEmail, 'Password123asd', 'Password123asd');
			cy.contains('User already exists').should('be.visible');
		});

		it('Successful authorization, custom commands', () => {
			cy.registration('Evelina', 'Maier', uniqueEmail, 'Password123asd', 'Password123asd');
			cy.login(uniqueEmail, 'Password123asd');
			cy.url().should('include', '/panel/garage');
		});
	});
});
