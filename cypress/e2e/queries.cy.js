/// <reference types="cypress" />

describe ('queries', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('get.button.sign_up', () => {
        cy.get('.btn-primary');
    })
    
    it('click button', () => {
        cy.get('.header_signin').click();
    })

    it('find socials link', () => {
        cy.get('#contactsSection').find('.socials_link');
    })

    it('contains text', () => {
        cy.get('.hero-descriptor').contains('With the help of the Hillel auto project');
    })

    it('get children', () => {
        cy.get('.header_inner').children();
    })

    it('find buttons', () => {
        cy.get('.header_inner').find('button');
    })

    it('check text p', () => {
        cy.get('div.about-block').first().within(() => {
            cy.get('p').first().invoke('text').should('include', 'Log fuel expenses');
        })
    })

    it('click socials links', () => {
        cy.get('.socials_icon').each(($item) => {
            cy.wrap($item).click();
        })
    })

    it('check text p', () => {
        cy.get('.hero-descriptor').contains('With the help of the Hillel auto project, you will have the opportunity to get hands-on experience in manual testing.');
    })

    it('get button sign in', () => {
        cy.get('.header_signin').not('hidden').should('exist');
    })

})