/// <reference types="cypress" />

describe('Connect', () => {
    beforeEach(() => {
        cy.visit('/connect');
        cy.wait(100);
        cy.get('.wallet-title').contains('Install xBull').as('xBullTitle');
        cy.get('.wallet-title').contains('Install Freighter').as('freighterTitle');
        cy.get('.wallet-title').contains('Install Albedo').as('albedoTitle');
        cy.get('.wallet-title').contains('Private Key').as('privateKeyTitle');
        cy.get('.wallet-title').contains('Install Rabet').as('rabetTitle');
        cy.get('.connect-wallet').contains('Private Key').as('privateKeyBtn');
        cy.get('.simple-signer-container').as('container');
    });
    it("Should check if there's five connect methods", () => {
        cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        cy.get('@freighterTitle').should('contain.text', 'Install Freighter');
        cy.get('@albedoTitle').should('contain.text', 'Install Albedo');
        cy.get('@xBullTitle').should('contain.text', 'Install xBull');
        cy.get('@rabetTitle').should('contain.text', 'Install Rabet');
    });

    it('Should show the private key connect method', () => {
        cy.get('@privateKeyBtn').click();
        cy.get('.private-key-btn').should('contain.text', 'Connect');
    });

    it('Should return to the four connect methods', () => {
        cy.get('@privateKeyBtn').click();
        cy.get('@container').should('contain.text', 'Connect');
        cy.get('.return-btn').click();
        cy.wait(100);
        cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        cy.get('@freighterTitle').should('contain.text', 'Install Freighter');
        cy.get('@albedoTitle').should('contain.text', 'Install Albedo');
        cy.get('@xBullTitle').should('contain.text', 'Install xBull');
        cy.get('@rabetTitle').should('contain.text', 'Install Rabet');
    });
});
