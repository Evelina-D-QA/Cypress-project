/// <reference types="cypress" />

import HomePage from '../../POM/pages/HomePage';
import LoginForm from '../../POM/forms/LoginForm';
import GaragePage from '../../POM/pages/GaragePage';
import AddCarForm from '../../POM/forms/AddCarForm';

describe('Add Car Form Tests - Positive and Negative', () => {
	beforeEach(() => {
		cy.visit('/');
		HomePage.openSignInForm();
		LoginForm.signInWithCredentials(Cypress.env('USER_EMAIL'), Cypress.env('USER_PASSWORD'));
		GaragePage.verifyPageHeaderIsVisible();
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

	context('Positive Tests - Valid Car Addition', () => {
		it('Successful opening of the Add a car form', () => {
			AddCarForm.openAddCarModal();
			AddCarForm.modal.should('be.visible');
			AddCarForm.modalTitle.should('have.text', 'Add a car');
		});

		it('Should enable Add button when all fields are valid', () => {
			AddCarForm.openAddCarModal();
			AddCarForm.addButton.should('be.disabled');
			AddCarForm.selectBrand('Fiat');
			AddCarForm.selectModel('Palio');
			AddCarForm.enterMileage('15000');
			AddCarForm.addButton.should('not.be.disabled');
		});

		it('Should successfully add a car with valid data', () => {
			AddCarForm.openAddCarModal();
			AddCarForm.addCar('Audi', 'TT', '50000');
			cy.contains('.car-item', 'Audi TT').should('be.visible');
		});

		it('Should successfully add a car with 0 mileage', () => {
			AddCarForm.openAddCarModal();
			AddCarForm.addCar('Fiat', 'Panda', '0');
			cy.contains('.car-item', 'Fiat Panda').should('be.visible');
		});

		it('Should successfully add a car with maximum valid mileage (999999 km)', () => {
			AddCarForm.openAddCarModal();
			AddCarForm.addCar('Porsche', '911', '999999');
			cy.contains('.car-item', 'Porsche 911').should('be.visible');
		});

		it('Should successfully add multiple cars sequentially', () => {
			const cars = [
				{ brand: 'Audi', model: 'A6', mileage: '45000' },
				{ brand: 'BMW', model: '3', mileage: '25000' },
			];

			cars.forEach((car) => {
				AddCarForm.openAddCarModal();
				AddCarForm.addCar(car.brand, car.model, car.mileage);
				cy.contains('.car-item', `${car.brand} ${car.model}`).should('be.visible');
			});
		});
	});

	context('Negative Tests - Mileage Field Validation', () => {
		beforeEach(() => {
			AddCarForm.openAddCarModal();
		});

		it('Should show error when mileage field is empty', () => {
			AddCarForm.selectBrand('Audi');
			AddCarForm.selectModel('TT');
			AddCarForm.mileageField.focus().blur();
			AddCarForm.mileageField.should('have.class', 'ng-invalid');
			AddCarForm.mileageValidationError.should('contain.text', 'Mileage cost required');
			AddCarForm.mileageField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Should show error when mileage is negative', () => {
			AddCarForm.selectBrand('BMW');
			AddCarForm.selectModel('X5');
			AddCarForm.enterMileage('-100');
			AddCarForm.mileageField.blur();
			AddCarForm.mileageField.should('have.class', 'ng-invalid');
			AddCarForm.mileageValidationError.should('contain.text', 'Mileage has to be from 0 to 999999');
			AddCarForm.mileageField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Should show error when mileage exceeds maximum (1000000)', () => {
			AddCarForm.selectBrand('Ford');
			AddCarForm.selectModel('Focus');
			AddCarForm.enterMileage('1000000');
			AddCarForm.mileageField.blur();
			AddCarForm.mileageValidationError.should('contain.text', 'Mileage has to be from 0 to 999999');
			AddCarForm.mileageField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Should show error when mileage contains letters and special characters', () => {
			AddCarForm.selectBrand('Audi');
			AddCarForm.selectModel('A6');
			AddCarForm.enterMileage('&%*@KJH');
			AddCarForm.mileageField.blur();
			AddCarForm.mileageValidationError.should('contain.text', 'Mileage cost required');
			AddCarForm.mileageField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
		});

		it('Should disable Add button when mileage is invalid', () => {
			AddCarForm.selectBrand('Audi');
			AddCarForm.selectModel('Q7');
			AddCarForm.enterMileage('-50');
			AddCarForm.mileageField.blur();
			AddCarForm.addButton.should('be.disabled');
		});
	});

	context('Negative Tests - Modal Interaction', () => {
		beforeEach(() => {
			AddCarForm.openAddCarModal();
		});

		it('Should close modal when clicking Cancel button', () => {
			AddCarForm.modal.should('be.visible');
			AddCarForm.clickCancelButton();
			AddCarForm.modal.should('not.exist');
		});

		it('Should not add car when Cancel is clicked after filling form', () => {
			AddCarForm.selectBrand('Audi');
			AddCarForm.selectModel('A8');
			AddCarForm.enterMileage('40000');
			AddCarForm.clickCancelButton();
			cy.contains('.car-item', 'Audi A8').should('not.exist');
		});
	});
});
