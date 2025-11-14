class AddExpenseForm {
	get addExpenseButton() {
		return cy.contains('button', 'Add an expense');
	}

	get modal() {
		return cy.get('app-add-expense-modal');
	}

	get modalTitle() {
		return cy.get('app-add-expense-modal h4');
	}

	get mileageField() {
		return cy.get('#addExpenseMileage');
	}

	get numberOfLitersField() {
		return cy.get('#addExpenseLiters');
	}

	get totalCostField() {
		return cy.get('#addExpenseTotalCost');
	}

	get addButton() {
		return cy.get('app-add-expense-modal .modal-footer .btn-primary');
	}

	get cancelButton() {
		return cy.get('app-add-expense-modal .modal-footer .btn-secondary');
	}

	get numberOfLitersValidationError() {
		return cy.contains('.invalid-feedback', 'Liters');
	}

	get totalCostValidationError() {
		return cy.contains('.invalid-feedback', 'cost');
	}

	openAddExpenseModal() {
		this.addExpenseButton.click();
	}

	enterMileage(mileage) {
		this.mileageField.clear().type(mileage);
	}

	enterNumberOfLiters(liters) {
		this.numberOfLitersField.type(liters);
	}

	enterTotalCost(cost) {
		this.totalCostField.type(cost);
	}

	clickAddButton() {
		this.addButton.click();
	}

	clickCancelButton() {
		this.cancelButton.click();
	}

	addExpense(mileage, liters, cost) {
		this.enterMileage(mileage);
		this.enterNumberOfLiters(liters);
		this.enterTotalCost(cost);
		this.clickAddButton();
	}
}

export default new AddExpenseForm();
