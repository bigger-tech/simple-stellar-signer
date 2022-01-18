/// <reference types="cypress" />

describe('Simple Signer', () => {
    const url = Cypress.env('HOST');
    it("Should check if there's three wallets", () => {
        cy.visit(url);
        cy.get('h1').contains('Connector');
        cy.get('.albedo-wallet').contains('Connect with Albedo');
        cy.get('.private-key-wallet').contains('Connect with Private Key');
        cy.get('.xbull-wallet').contains('Connect with xBull');
    });
    it('Should visit /sign and check if exist a transaction', () => {
        cy.visit(`${url}/sign`);
        cy.get('h1').contains('Sign');
        cy.get('.payment-tx').contains(
            'John pays 100.00 to Dominic GAVPIQ5RZCTNXWB5257PEQEZUBUKE37RQ4ZGDCNZPTKK3KLXGVIP2DBJ',
        );
    });
    it('Should go to /connect', () => {
        cy.get('.connect-btn').click();
        cy.get('h1').contains('Connector');
        cy.get('.albedo-wallet').contains('Connect with Albedo');
        cy.get('.private-key-wallet').contains('Connect with Private Key');
        cy.get('.xbull-wallet').contains('Connect with xBull');
    });
});
