/// <reference types="cypress" />
import { WALLETS_LOAD_TIMEOUT } from './utils/constants';

describe('Connect', () => {
    beforeEach(() => {
        cy.visit('/connect');
        cy.wait(WALLETS_LOAD_TIMEOUT);
        cy.get('.simple-signer-container').as('container');
        cy.get('@container').find('.simple-signer-wallets').children().should('have.length', 8);
        cy.get('@container').find('.wallet-title').should('contain.text', 'xBull').as('xBullTitle');
        cy.get('@container').find('.wallet-title').should('contain.text', 'Freighter').as('freighterTitle');
        cy.get('.wallet-title').contains('Albedo').as('albedoTitle');
        cy.get('.wallet-title').contains('Private Key').as('privateKeyTitle');
        cy.get('.wallet-title').contains('Rabet').as('rabetTitle');
        cy.get('.wallet-title').contains('Private Key').as('privateKeyBtn');
        cy.get('.wallet-title').contains('WalletConnect').as('walletConnectTitle');
        cy.get('.wallet-title').contains('Lobstr').as('lobstrTitle');
    });

    it("Should check if there's six connect methods", () => {
        cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        cy.get('@freighterTitle').should('contain.text', 'Freighter');
        cy.get('@albedoTitle').should('contain.text', 'Albedo');
        cy.get('@xBullTitle').should('contain.text', 'xBull');
        cy.get('@rabetTitle').should('contain.text', 'Rabet');
        cy.get('@walletConnectTitle').should('contain.text', 'WalletConnect');
        cy.get('@lobstrTitle').should('contain.text', 'Lobstr');
    });

    it('Should show the private key connect method', () => {
        cy.get('@privateKeyBtn').click();
        cy.get('.private-key-title').should('contain.text', 'Private Key');
        cy.get('.connect-btn').should('contain.text', 'Connect');
        cy.get('.cancel-btn').should('contain.text', 'Cancel');
    });

    it('Should return to the six connect methods', () => {
        cy.get('@privateKeyBtn').click();
        cy.get('@container').should('contain.text', 'Connect');
        cy.get('.cancel-btn').click();
        cy.get('@privateKeyTitle').should('contain.text', 'Private Key');
        cy.get('@freighterTitle').should('contain.text', 'Freighter');
        cy.get('@albedoTitle').should('contain.text', 'Albedo');
        cy.get('@xBullTitle').should('contain.text', 'xBull');
        cy.get('@rabetTitle').should('contain.text', 'Rabet');
        cy.get('@walletConnectTitle').should('contain.text', 'WalletConnect');
        cy.get('@lobstrTitle').should('contain.text', 'Lobstr');
    });
});
