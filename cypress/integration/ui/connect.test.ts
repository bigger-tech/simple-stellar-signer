/// <reference types="cypress" />

describe('connect', () => {
    const url = Cypress.env('HOST');
    const testSecretKey = Cypress.env('PRIVATE');
    const testPublicKey = Cypress.env('PUBLIC');

    beforeEach(() => {
        cy.visit(url);
        cy.get('#secret-key-input').as('input');
        cy.get('button').contains('Connect with private key').as('connectBtn');
        cy.get('#public-key-title').as('title');
    });

    it('clicking in "show key" should change the type of the input', () => {
        cy.get('@input').type('1234');
        cy.get('@input').invoke('attr', 'type').should('contain', 'password');
        cy.get('button').contains('Show key').click();
        cy.get('@input').invoke('attr', 'type').should('contain', 'text');
    });

    it('passing a valid key should change the title showcasing the public key', () => {
        cy.get('@input').type(testSecretKey);
        cy.get('@connectBtn').click();
        cy.get('@title').should('contain.text', testPublicKey);
    });

    it('passing an invalid key should throw an error', () => {
        cy.get('@input').type('1234');
        cy.get('@connectBtn').click();
        cy.get('@title').should('contain.text', 'Public Key: There was a problem, try again');
    });
});
