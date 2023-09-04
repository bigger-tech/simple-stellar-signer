/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { paymentXdr } from '../../fixtures/operations.json';

describe('logout', () => {
    it('Should logout on /connect', () => {
        cy.visit('/connect');

        window.localStorage.setItem('wallet', 'xbull');

        cy.wait(5000);

        cy.get('.logout-button').click();
        cy.get('.logout-active').contains('Logout').click();
    });

    it('Should logout on /sign', () => {
        cy.visit(`/sign?xdr=${paymentXdr}`);
        window.localStorage.setItem('wallet', 'xbull');
        cy.wait(5000);
        cy.get('.logout-button').click();
        cy.get('.logout-active').contains('Logout').click();
        cy.url().should('include', '/connect');
    });
});
