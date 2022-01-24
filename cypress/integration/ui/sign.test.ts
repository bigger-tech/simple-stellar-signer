/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { paymentXdr, sourceAccount, paymentRecipient } from '../../fixtures/sign.json';

const url = Cypress.env('HOST');
describe('sign user history', () => {
    it('alerts you if you do not pass an XDR as a query parameter or it is invalid', () => {
        cy.visit(url);
        cy.get('a[href*="sign"]').click();
        cy.findByText('INVALID OR NULL XDR').should('exist');
    });
    it('renders transaction info if XDR query parameter is valid', () => {
        cy.visit(`${url}/sign?xdr=${paymentXdr}`);
        cy.get('.src-account').contains(sourceAccount);
        cy.get('.operations').contains(paymentRecipient);
    });
    it('goes to /connect when clicking on the "Go to Connect" button', () => {
        cy.get('.connect-btn').click();
        cy.findByText('Connector').should('exist');
    });
});
