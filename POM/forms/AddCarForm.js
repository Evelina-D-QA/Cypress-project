class AddCarForm {
	get addCarButton() {
		return cy.contains('button', 'Add car');
	}

	get modal() {
		return cy.get('app-add-car-modal');
	}

	get modalTitle() {
		return cy.get('app-add-car-modal h4');
	}

	get brandDropdown() {
		return cy.get('#addCarBrand');
	}

	get modelDropdown() {
		return cy.get('#addCarModel');
	}

	get mileageField() {
		return cy.get('#addCarMileage');
	}

	get addButton() {
		return cy.get('app-add-car-modal .modal-footer .btn-primary');
	}

	get cancelButton() {
		return cy.get('app-add-car-modal .modal-footer .btn-secondary');
	}

	get mileageValidationError() {
		return cy.contains('.invalid-feedback', 'Mileage');
	}

	openAddCarModal() {
		this.addCarButton.click();
	}

	selectBrand(brandName) {
		this.brandDropdown.select(brandName);
	}

	selectModel(modelName) {
		this.modelDropdown.select(modelName);
	}

	enterMileage(mileage) {
		this.mileageField.type(mileage);
	}

	clickAddButton() {
		this.addButton.click();
	}

	clickCancelButton() {
		this.cancelButton.click();
	}

	addCar(brand, model, mileage) {
		this.selectBrand(brand);
		this.selectModel(model);
		this.enterMileage(mileage);
		this.clickAddButton();
	}
}

export default new AddCarForm();
