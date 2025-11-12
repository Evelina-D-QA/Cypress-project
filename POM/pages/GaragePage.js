class GaragePage {

    get header() {
        return cy.contains('h1', 'Garage');
    }

    verifyPageHeaderIsVisible() {
        this.header.should('be.visible');
    }
}

export default new GaragePage();