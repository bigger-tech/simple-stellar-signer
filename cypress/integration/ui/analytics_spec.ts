/// <reference types="cypress" />
import { paymentXdr } from '../../fixtures/operations.json';

describe('Analytics', () => {
    const BASE_SIGN_URL = '/sign?xdr=';
    const BASE_ANALYTICS_URL = 'https://www.google-analytics.com';

    beforeEach(() => {
        cy.intercept('POST', `${BASE_ANALYTICS_URL}/g/collect*`, {
            body: {},
        }).as('googleAnalytics');
    });

    it('Should check analytics in connect page', () => {
        cy.visit('/connect');

        cy.get('head')
            .find('#google-analytics')
            .should('exist')
            .and('have.attr', 'src')
            .and('match', /googletagmanager/)
            .and('match', /id=G-/);
        cy.get('head').find('#google-analytics-script').should('exist');
    });
    it('Should check analytics in sign page', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(`${BASE_SIGN_URL}${paymentXdr}`);

        cy.wait('@googleAnalytics');

        cy.get('head')
            .find('#google-analytics')
            .should('exist')
            .and('have.attr', 'src')
            .and('match', /googletagmanager/);
        cy.get('head').find('#google-analytics-script').should('exist');
    });
});
