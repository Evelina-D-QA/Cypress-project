/// <reference types="cypress" />

import HomePage from '../../POM/pages/HomePage';
import LoginForm from '../../POM/forms/LoginForm';
import ExpensesPage from '../../POM/pages/ExpensesPage';
import AddExpenseForm from '../../POM/forms/AddExpenseForm';
import AddCarForm from '../../POM/forms/AddCarForm';

describe('Add Expense Form Tests - Positive and Negative', () => {
	context('Tests with existing car', () => {
		beforeEach(() => {
			cy.visit('/');
			HomePage.openSignInForm();
			LoginForm.signInWithCredentials(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));

			cy.url().should('include', '/panel/garage');
			cy.contains('h1', 'Garage').should('be.visible');

			AddCarForm.addCarButton.should('be.visible');
			AddCarForm.openAddCarModal();
			AddCarForm.addCar('Audi', 'TT', '50000');

			cy.visit('/panel/expenses');
			ExpensesPage.verifyPageHeaderIsVisible();
			AddExpenseForm.addExpenseButton.should('be.enabled');
		});

		afterEach(() => {
			cy.visit('/panel/garage');
			cy.wait(1000);
			cy.get('body').then(($body) => {
				const carCount = $body.find('.car-item').length;
				if (carCount > 0) {
					for (let i = 0; i < carCount; i++) {
						cy.get('.car-item').first().find('.icon-edit').click();
						cy.contains('.btn-outline-danger', 'Remove car').click();
						cy.contains('.btn-danger', 'Remove').click();
						cy.wait(1000);
					}
				}
			});
		});

		context('Positive Tests - Add an expense button', () => {
			it('Should successfully open Add an expense modal', () => {
				AddExpenseForm.openAddExpenseModal();
				AddExpenseForm.modal.should('be.visible');
				AddExpenseForm.modalTitle.should('have.text', 'Add an expense');
			});

			it('Should display Number of liters and Total cost fields', () => {
				AddExpenseForm.openAddExpenseModal();
				AddExpenseForm.numberOfLitersField.should('be.visible');
				AddExpenseForm.totalCostField.should('be.visible');
				AddExpenseForm.addButton.should('be.visible');
				AddExpenseForm.cancelButton.should('be.visible');
			});

			it('Should successfully add an expense with valid data', () => {
				AddExpenseForm.openAddExpenseModal();
				AddExpenseForm.addExpense('60000', '45', '1500');
				AddExpenseForm.modal.should('not.exist');
			});
		});

		context('Negative Tests - Number of liters field validation', () => {
			beforeEach(() => {
				AddExpenseForm.openAddExpenseModal();
			});

			it('Should show error when Number of liters field is empty', () => {
				AddExpenseForm.enterMileage('60000');
				AddExpenseForm.enterTotalCost('1500');
				AddExpenseForm.numberOfLitersField.focus().blur();
				AddExpenseForm.numberOfLitersField.should('have.class', 'ng-invalid');
				AddExpenseForm.numberOfLitersValidationError.should('have.text', 'Liters required');
			});

			it('Should show error when Number of liters is negative', () => {
				AddExpenseForm.enterMileage('60000');
				AddExpenseForm.enterTotalCost('1500');
				AddExpenseForm.enterNumberOfLiters('-10');
				AddExpenseForm.numberOfLitersField.blur();
				AddExpenseForm.numberOfLitersField.should('have.class', 'ng-invalid');
				AddExpenseForm.numberOfLitersValidationError.should('have.text', 'Liters has to be from 0.01 to 9999');
			});

			it('Should disable Add button when Number of liters is invalid', () => {
				AddExpenseForm.enterMileage('60000');
				AddExpenseForm.enterNumberOfLiters('-5');
				AddExpenseForm.enterTotalCost('1500');
				AddExpenseForm.addButton.should('be.disabled');
			});
		});

		context('Negative Tests - Total cost field validation', () => {
			beforeEach(() => {
				AddExpenseForm.openAddExpenseModal();
			});

			it('Should show error when Total cost field is empty', () => {
				AddExpenseForm.enterMileage('60000');
				AddExpenseForm.enterNumberOfLiters('45');
				AddExpenseForm.totalCostField.focus().blur();
				AddExpenseForm.totalCostField.should('have.class', 'ng-invalid');
				AddExpenseForm.totalCostValidationError.should('have.text', 'Total cost required');
			});

			it('Should show error when Total cost is negative', () => {
				AddExpenseForm.enterMileage('60000');
				AddExpenseForm.enterNumberOfLiters('45');
				AddExpenseForm.enterTotalCost('-100');
				AddExpenseForm.totalCostField.blur();
				AddExpenseForm.totalCostField.should('have.class', 'ng-invalid');
				AddExpenseForm.totalCostValidationError.should('have.text', 'Total cost has to be from 0.01 to 1000000');
			});

			it('Should disable Add button when Total cost is invalid', () => {
				AddExpenseForm.enterMileage('60000');
				AddExpenseForm.enterNumberOfLiters('45');
				AddExpenseForm.enterTotalCost('-500');
				AddExpenseForm.addButton.should('be.disabled');
			});
		});

		context('Negative Tests - Modal interaction', () => {
			it('Should close modal when clicking Cancel button', () => {
				AddExpenseForm.openAddExpenseModal();
				AddExpenseForm.modal.should('be.visible');
				AddExpenseForm.clickCancelButton();
				AddExpenseForm.modal.should('not.exist');
			});

			it('Should not add expense when Cancel is clicked after filling form', () => {
				AddExpenseForm.openAddExpenseModal();
				AddExpenseForm.enterMileage('60000');
				AddExpenseForm.enterNumberOfLiters('45');
				AddExpenseForm.enterTotalCost('1500');
				AddExpenseForm.clickCancelButton();
				AddExpenseForm.modal.should('not.exist');
			});
		});
	});
});
