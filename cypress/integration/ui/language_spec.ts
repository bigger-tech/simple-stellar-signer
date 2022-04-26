/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>

describe('language', () => {
    it('should change language of text', () => {
        cy.visit('/connect');
        cy.get('.select-wallet').should('contain.text', 'Select Wallet');
        cy.get('.invisible-button').click();
        cy.get('.default').click();
        cy.get('.select-wallet').should('contain.text', 'Seleccionar Wallet');
    });
});
