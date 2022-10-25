/// <reference types="cypress" />
export {};

describe('Connect', () => {
    beforeEach(() => {
        cy.visit('/connect');
        cy.wait(300);
        cy.get('.wallet-title').contains('xBull').as('xBullTitle');
        cy.get('.wallet-title').contains('Freighter').as('freighterTitle');
        cy.get('.wallet-title').contains('Albedo').as('albedoTitle');
        cy.get('.wallet-title').contains('Private Key').as('privateKeyTitle');
        cy.get('.wallet-title').contains('Rabet').as('rabetTitle');
        cy.get('.wallet-title').contains('Ledger').as('ledgerTitle');

        cy.get('.wallet-title').contains('Private Key').as('privateKeyBtn');

        cy.get('.simple-signer-container').as('container');
    });
    it('Should should display the connect methods', () => {
        cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        cy.get('@freighterTitle').should('contain.text', 'Freighter');
        cy.get('@albedoTitle').should('contain.text', 'Albedo');
        cy.get('@xBullTitle').should('contain.text', 'xBull');
        cy.get('@rabetTitle').should('contain.text', 'Rabet');
        cy.get('@ledgerTitle').should('contain.text', 'Ledger');
    });

    it('Should show the private key connect method', () => {
        cy.get('@privateKeyBtn').click();
        cy.get('.private-key-title').should('contain.text', 'Private Key');
        cy.get('.connect-btn').should('contain.text', 'Connect');
        cy.get('.cancel-btn').should('contain.text', 'Cancel');
    });

    it('Should show the connect methods', () => {
        cy.get('@privateKeyBtn').click();
        cy.get('@container').should('contain.text', 'Connect');
        cy.get('.cancel-btn').click();

        cy.wait(100);

        cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        cy.get('@freighterTitle').should('contain.text', 'Freighter');
        cy.get('@albedoTitle').should('contain.text', 'Albedo');
        cy.get('@xBullTitle').should('contain.text', 'xBull');
        cy.get('@rabetTitle').should('contain.text', 'Rabet');
        cy.get('@ledgerTitle').should('contain.text', 'Ledger');
    });
});
