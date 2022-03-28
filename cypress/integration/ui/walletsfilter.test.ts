/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>

describe('wallets filter', () => {
    it('should show one wallet', () => {
        cy.visit('/connect?wallets=xbull');
        cy.get('.simple-signer-wallets').children().should('have.length', 1);
    });

    it('should show two wallets', () => {
        cy.visit('/connect?wallets=xbull&wallets=rabet');
        cy.get('.simple-signer-wallets').children().should('have.length', 2);
    });

    it('should show three wallets', () => {
        cy.visit('/connect?wallets=xbull&wallets=freighter&wallets=albedo');
        cy.get('.simple-signer-wallets').children().should('have.length', 3);
    });

    it('should show four wallets', () => {
        cy.visit('/connect?wallets=xbull&wallets=freighter&wallets=albedo&wallets=rabet');
        cy.get('.simple-signer-wallets').children().should('have.length', 4);
    });

    it('should show five wallets', () => {
        cy.visit('/connect?wallets=xbull&wallets=freighter&wallets=albedo&wallets=rabet&wallets=privateKey');
        cy.get('.simple-signer-wallets').children().should('have.length', 5);
    });

    it('should render the default wallets passing duplicates wallets', () => {
        cy.visit('/connect?wallets=xbull&wallets=xbull');
        cy.get('.simple-signer-wallets').children().should('have.length', 5);
    });

    it('should render one wallet if one of two wallets is bad written', () => {
        cy.visit('/connect?wallets=xbull&wallets=rabe');
        cy.get('.simple-signer-wallets').children().should('have.length', 1);
    });
});
