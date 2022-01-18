/// <reference types="cypress" />

describe('connect', () => {
    const url = Cypress.env('HOST');
    const testSecretKey = 'SAP3SV3BANKBI7DVLFAOJJDHAQYVNUZX6O56FXDP6AHZNU2OYQLYWDZJ';
    const testPublicKey = 'GAVPIQ5RZCTNXWB5257PEQEZUBUKE37RQ4ZGDCNZPTKK3KLXGVIP2DBJ';

    beforeEach(() => {
        cy.visit(url);
    });

    it('clicking in "show key" should change the type of the input', () => {
        cy.get('#secret-key-input').type('1234');
        cy.get('#secret-key-input').invoke('attr', 'type').should('contain', 'password');
        cy.get('button').contains('Show key').click();
        cy.get('#secret-key-input').invoke('attr', 'type').should('contain', 'text');
    });

    it('passing an invalid key should throw an error', () => {
        cy.get('#secret-key-input').type('1234');
        cy.get('button').contains('Connect with private key').click();
        cy.get('#public-key-title').should('contain.text', 'Public Key: There was a problem, try again');
    });

    it('passing a valid key should change the title showcasing the public key', () => {
        cy.get('#secret-key-input').type(testSecretKey);
        cy.get('button').contains('Connect with private key').click();
        cy.get('#public-key-title').should('contain.text', testPublicKey);
    });
});
