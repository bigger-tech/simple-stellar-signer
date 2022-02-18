/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { sourceAccount } from '../../fixtures/sign.json';
import { paymentXdr, signedXdr, multiSignedXdr } from '../../fixtures/operations.json';

describe('checks that the /sign component works', () => {
    const url = Cypress.env('HOST');
    const TEST_PRIVATE_KEY = Cypress.env('TEST_PRIVATE_KEY');
    it('should visit /sign with xdr valid but user is not connected', () => {
        cy.visit(`${url}/sign?xdr=${paymentXdr}`);
        cy.get('.user-not-connected').contains('User is not connected');
        cy.get('.connect-btn').click();
        cy.url().should('include', '/connect');
    });
    it('should connect with private key', () => {
        cy.visit(`${url}/connect`);
        cy.get('#input-key').type(TEST_PRIVATE_KEY);
        cy.get('.private-key-btn').click();
    });

    it('renders transaction info if XDR query parameter is valid', () => {
        cy.visit(`${url}/sign?xdr=${paymentXdr}`);
        cy.get('.src-account').contains(sourceAccount);
    });

    it('alerts you if you do not pass an XDR as a query parameter or it is invalid', () => {
        cy.visit(url);
        cy.get('a[href*="sign"]').click();
        cy.findByText('INVALID OR NULL XDR').should('exist');
    });

    it('should render a signature if the tx also have', () => {
        cy.visit(`${url}/sign?xdr=${signedXdr}`);
        cy.get('.tx-signatures').contains('Hint: GCQDITCYUFWA');
    });

    it('should render two signatures if the xdr also have', () => {
        cy.visit(`${url}/sign?xdr=${multiSignedXdr}`);
        cy.get('.tx-signatures').children().should('have.length', 2);
    });
});
