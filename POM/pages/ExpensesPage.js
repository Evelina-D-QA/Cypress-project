class ExpensesPage {
	get header() {
		return cy.contains('h1', 'Fuel expenses');
	}

	get addExpenseButton() {
		return cy.contains('button', 'Add an expense');
	}

	get noExpensesMessage() {
		return cy.contains('p', "You don't have any fuel expenses filed in");
	}

	verifyPageHeaderIsVisible() {
		this.header.should('be.visible');
	}
}

export default new ExpensesPage();
