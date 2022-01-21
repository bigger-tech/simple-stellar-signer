/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>

describe('Simple Signer', () => {
    const url = Cypress.env('HOST');
    it("Should check if there's three wallets", () => {
        cy.visit(url);
        cy.get('a[href*="connect"]').click();
        cy.get('h1').contains('Connector');
        cy.get('.albedo-wallet').contains('Connect with Albedo');
        cy.get('.private-key-wallet').contains('Connect with Private Key');
        cy.get('.xbull-wallet').contains('Connect with xBull');
    });
});
