/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { amountToSend, assetCode, destinationAccount, issuer } from '../../fixtures/payment.json';

describe('checks that the /payment component works', () => {
    const BASE_URL = '/payment';
    const HORIZON_URL = Cypress.env('HORIZON_URL');
    const accountResponse = {
        id: 'GBS23SVOXH73F4L3ETIXFNAHIPIISLLPF3DREGQZE4TRAANMMYB7COKZ',
        account_id: 'GBS23SVOXH73F4L3ETIXFNAHIPIISLLPF3DREGQZE4TRAANMMYB7COKZ',
        sequence: '441114616135680',
        balances: [
            {
                balance: '10000.0000000',
                buying_liabilities: '0.0000000',
                selling_liabilities: '0.0000000',
                asset_type: 'native',
            },
        ],
    };

    beforeEach(() => {
        cy.interceptAnalytics();
        cy.intercept(`${HORIZON_URL}/accounts/*`, { body: accountResponse }).as('getAccount');
    });

    it('should visit /payment with payment information but user is not connected', () => {
        cy.visit(
            `${BASE_URL}?receiver=${destinationAccount}&amount=${amountToSend}&assetCode=${assetCode}&issuer=${issuer}`,
        );
        cy.wait('@getAccount');
        cy.get('.user-not-connected').contains('User is not connected');
        cy.get('.payment-btn').click();
        cy.url().should('include', '/connect');
    });

    it('should render payment information if payment parameters are valid', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit(
            `${BASE_URL}?receiver=${destinationAccount}&amount=${amountToSend}&assetCode=${assetCode}&issuer=${issuer}`,
        );
        cy.wait('@getAccount');
        cy.get('.simple-signer').contains(`You are paying ${amountToSend} XLM to the account ${destinationAccount}.`);
    });

    it('should render an error if payment parameters was not provided', () => {
        cy.visit(`${BASE_URL}?receiver=${destinationAccount}`);
        cy.get('.simple-signer').contains("Sorry, the recipient's data wasn't provided.");
    });
});
