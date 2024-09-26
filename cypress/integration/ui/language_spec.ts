/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>

describe('language', () => {
    it('should change language of text', () => {
        cy.interceptAnalytics();
        cy.visit('/connect');
        cy.get('.select-wallet').should('contain.text', 'Select Wallet');
        cy.get('.invisible-button').click();
        cy.get('.language').contains('Spanish').should('have.class', 'default').click();
        cy.get('.select-wallet').should('contain.text', 'Seleccionar Wallet');
        cy.get('.language').contains('Español').should('have.class', 'active').click();
        cy.get('.language').contains('Inglés').should('have.class', 'default');
    });
});
