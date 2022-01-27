/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { paymentXdr, sourceAccount, paymentRecipient } from '../../fixtures/sign.json';

describe('checks that the /sign component works', () => {
    const url = Cypress.env('HOST');
    const testSecretKey = Cypress.env('PRIVATE');
    it('should visit /sign with xdr valid but user is not connected', () => {
        cy.visit(`${url}sign?xdr=${paymentXdr}`);
        cy.get('.user-not-connected').contains('User is not connected');
        cy.get('.connect-btn').click();
        cy.url().should('include', '/connect');
    });
    it('should connect with private key', () => {
        cy.visit(`${url}connect`);
        cy.get('#input-key').type(testSecretKey);
        cy.get('.private-key-btn').click();
    });

    it('renders transaction info if XDR query parameter is valid', () => {
        cy.visit(`${url}sign?xdr=${paymentXdr}`);
        cy.get('.src-account').contains(sourceAccount);
        cy.get('.operations').contains(paymentRecipient);
    });

    it('alerts you if you do not pass an XDR as a query parameter or it is invalid', () => {
        cy.visit(url);
        cy.get('a[href*="sign"]').click();
        cy.findByText('INVALID OR NULL XDR').should('exist');
    });
});
