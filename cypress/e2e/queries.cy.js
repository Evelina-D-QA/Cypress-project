
/// <reference types="cypress" />

describe('queries', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('cy.get()', () => {
        cy.get('h1');
        cy.get('img');
    })


    it('cy.contains()', () => {
        cy.contains('button', 'Sign');
    })

    it('find()', () => {
        cy.get('header').find('button');
        // cy.get('header button');
    })

    it('children()', () => {
        cy.get('.header_right').children('.header_signin');
        // cy.get('.header_right>.header_signin')
    })

    it('parent()', () => {
        cy.get('.header_signin').parent();
    })

    it('parents()', () => {
        cy.get('.header_signin').parents('header');
    })

    it('closest()', () => {
        cy.get('h1').closest('h1');
    })

    it('focused()', () => {
        cy.focused();
    })

    it('within()', () => {
        cy.get('button');
        cy.contains('Sign In').click();
        cy.get('button');
        cy.get('div.modal-content').within(() => {
            cy.get('button');
            cy.root().parent();
        })
    })

    context('Multiple elements', () => {
        it('first, last', () => {
            cy.get('.socials_icon').first();
            cy.get('.socials_icon').last();
        })

        it('eq', () => {
            cy.get('.socials_icon').eq(2);
        })

        it('filter', () => {
            cy.get('.socials_icon').filter('.icon-telegram');
        })

        // cy.get('.list-item').each(($item, index, $list) => {
        //     // $item - поточний елемент
        //     // index - індекс поточного елемента
        //     // $list - список всіх елементів
        //     cy.wrap($item).click(); // Наприклад, натискання на кожен елемент
        // });
    })


    it('invoke', () => {
        cy.get('.hero-descriptor_btn').invoke('hide');
        cy.wait(3000);
        cy.get('.hero-descriptor_btn').invoke('show');
    })

    it('then', () => {
        cy.get('h1').invoke('text').then((text) => {
            cy.log(text);
        })
    })

    it('wrap', () => {
        cy.get('h1').invoke('text').then((text) => {
            cy.wrap(text).should('contain', 'more');
        })
    })

    it('each', () => {
        // cy.get('button').each(($item, index, $list) => {
        //     // $item - поточний елемент
        //     // index - індекс поточного елемента
        //     // $list - список всіх елементів
        //     cy.log(index);
        //     cy.wrap($item).click(); // Наприклад, натискання на кожен елемент
        // });
        // cy.contains('Sign In').click();
        // cy.get('input').each(($item, index, $list) => {
        //     // $item - поточний елемент
        //     // index - індекс поточного елемента
        //     // $list - список всіх елементів
        //     cy.log(index);
        //     cy.wrap($item).click(); // Наприклад, натискання на кожен елемент
        // });

        cy.get('.socials_icon').each(($item, index, $list) => {
            // $item - поточний елемент
            // index - індекс поточного елемента
            // $list - список всіх елементів
            cy.wrap($item).should('have.class', 'icon');
        });
    })


    it('its', () => {
        cy.get('.socials_icon').its('length').should('eq', 5);

        const obj1 = {
            name: 'Joe',
            age: 33
        }

        cy.wrap(obj1).its('name').should('eq', 'Joe');
    })

    it.only('aliases', () => {
        // const signInButton = cy.contains('Sign In');
        // signInButton.click();
        const signInButton = 'Sign In';

        cy.contains('Sign In').as('signinButton');
        cy.get('@signinButton').click();
        cy.get('.close').click();
        cy.get('@signinButton').click();
    })
})
