/// <reference types="cypress" />

describe('connect', () => {
    const url = Cypress.env('HOST');
    const TEST_PRIVATE_KEY = Cypress.env('TEST_PRIVATE_KEY');
    const TEST_PUBLIC_KEY = Cypress.env('TEST_PUBLIC_KEY');

    beforeEach(() => {
        cy.visit(`${url}connect`);
        cy.get('.wallet-xbull-title').as('xBullTitle');
        cy.get('.wallet-freighter-title').as('freighterTitle');
        cy.get('.wallet-albedo-title').as('albedoTitle');
        cy.get('.wallet-private-key-title').as('privateKeyTitle');
        cy.get('.connect-private-key').as('privateKeyBtn');
        cy.get('.simple-signer-container').as('container');
    });
    describe('Connect', () => {
        it("Should check if there's four connect methods", () => {
            cy.get('@xBullTitle').should('contain.text', 'xBull');
            cy.get('@freighterTitle').should('contain.text', 'Freighter');
            cy.get('@albedoTitle').should('contain.text', 'Albedo');
            cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        });

        it('Should show the private key connect method', () => {
            cy.get('@privateKeyBtn').click().as('privateKeyBtn');
            cy.get('@container').should('contain.text', 'Connect with private key');
        });

        it('Should return to the four connect methods', () => {
            cy.get('@privateKeyBtn').click();
            cy.get('@container').should('contain.text', 'Connect with private key');
            cy.get('.return-btn').click();
            cy.get('@xBullTitle').should('contain.text', 'xBull');
            cy.get('@freighterTitle').should('contain.text', 'Freighter');
            cy.get('@albedoTitle').should('contain.text', 'Albedo');
            cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        });
    });
});
