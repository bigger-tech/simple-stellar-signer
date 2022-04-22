/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { multiSignedXdr, paymentXdr, signedXdr } from '../../fixtures/operations.json';
import { paymentRecipient, sourceAccount } from '../../fixtures/sign.json';

describe('checks that the /sign component works', () => {
    const BASE_URL = '/sign?xdr=';

    it('should visit /sign with xdr valid but user is not connected', () => {
        cy.visit(`${BASE_URL}${paymentXdr}`);
        cy.get('.user-not-connected').contains('User is not connected');
        cy.get('.connect-btn').click();
        cy.url().should('include', '/connect');
    });

    it('should render a transaction if XDR query parameter is valid', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${paymentXdr}`);
        cy.get('.operation-info-container').contains(sourceAccount);
        cy.get('.operation-info-container').contains(paymentRecipient);
    });

    it('should render an error if xdr is invalid', () => {
        cy.visit('/');
        cy.get('a[href*="/sign"]').click();
        cy.findByText(`Sorry, an XDR wasn't provided`).should('exist');
    });

    it('should render one signature on the tx', () => {
        cy.visit('/');
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${signedXdr}`);
        cy.get('.tx-signatures').contains('Hint: GCQDITCYUFWA');
    });

    it('should render two signatures on the tx', () => {
        cy.visit('/');
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_URL}${multiSignedXdr}`);
        cy.get('.tx-signatures').children().should('have.length', 2);
    });
});
