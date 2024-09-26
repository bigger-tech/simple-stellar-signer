/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { paymentXdr } from '../../fixtures/operations.json';

describe('logout', () => {
    beforeEach(() => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.window().then((win) => {
            expect(win.localStorage.getItem('wallet')).to.eq('xbull');
        });
        cy.interceptAnalytics();
    });
    it('Should logout on /connect', () => {
        cy.visit('/connect');
        cy.wait(5000);

        cy.get('.logout-button').click();
        cy.get('.logout-active').contains('Logout').click();
    });

    it('Should logout on /sign', () => {
        cy.visit(`/sign?xdr=${paymentXdr}`);
        cy.wait(5000);

        cy.get('.logout-button').click();
        cy.get('.logout-active').contains('Logout').click();
        cy.url().should('include', '/connect');
    });

    it('Should logout on /payment', () => {
        cy.visit('/payment');
        cy.wait(5000);

        cy.get('.logout-button').click();
        cy.get('.logout-active').contains('Logout').click();
        cy.url().should('include', '/connect');
    });

    it('Should logout on /logout', () => {
        cy.visit('/logout');
        cy.url().should('include', '/logout');
        cy.wait(5000);

        cy.window().should((win) => {
            expect(win.localStorage.getItem('wallet')).to.be.null;
        });
    });
});
