/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import {
    operationsXdr,
    paymentXdr,
    createAccountXdr,
    beginSponsoringFutureReservesXdr,
    pathPaymentStrictSendXdr,
    pathPaymentStrictReceiveXdr,
    manageBuyOfferXdr,
} from '../../fixtures/operations.json';

describe('operations', () => {
    const url = Cypress.env('HOST');
    const BASE_URL = `${url}/sign?xdr=`;
    const TEST_PRIVATE_KEY = Cypress.env('TEST_PRIVATE_KEY');

    it('should connect with private key', () => {
        cy.visit(`${url}/connect`);
        cy.get('#input-key').type(TEST_PRIVATE_KEY);
        cy.get('.private-key-btn').click();
    });

    it('should render two components if the xdr has two operations, ', () => {
        cy.visit(BASE_URL + operationsXdr);
        cy.get('.operations-container').children().should('have.length', 2);
        cy.get('.payment-operation').should('exist');
        cy.get('.create-account-operation').should('exist');
    });

    it('should render a Payment component if the xdr has a Payment operation', () => {
        cy.visit(BASE_URL + paymentXdr);
        cy.get('.payment-operation').contains('Amount');
        cy.get('.payment-operation').contains('Destination');
        cy.get('.payment-operation').contains('Asset');
    });

    it('should render a CreateAccount component if the xdr has a Create Account operation', () => {
        cy.visit(BASE_URL + createAccountXdr);
        cy.get('.create-account-operation').contains('Source Account');
        cy.get('.create-account-operation').contains('Starting Balance');
        cy.get('.create-account-operation').contains('Destination');
    });

    it('should render begin sponsoring future reserves operation', () => {
        cy.visit(`${BASE_URL}${beginSponsoringFutureReservesXdr}`);
        cy.get('.begin-sponsoring-future-reserves-operation').contains('Sponsored ID');
        cy.get('.begin-sponsoring-future-reserves-operation').contains(
            'GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T',
        );
    });
    it('should render path payment strict send operation', () => {
        cy.visit(`${BASE_URL}${pathPaymentStrictSendXdr}`);
        cy.get('.path-payment-strict-send-operation').contains('Asset you are using to pay: XLM');
        cy.get('.path-payment-strict-send-operation').contains('Amount: 2.0000000');
        cy.get('.path-payment-strict-send-operation').contains(
            'Destination: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T',
        );
        cy.get('.path-payment-strict-send-operation').contains(
            'Minimum amount of destination asset to be received: 2.0000000',
        );
        cy.get('.path-payment-strict-send-operation').contains(
            'Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T',
        );
    });

    it('should render path payment strict receive operation', () => {
        cy.visit(`${BASE_URL}${pathPaymentStrictReceiveXdr}`);
        cy.get('.path-payment-strict-receive-operation').contains('Asset you are using to pay: XLM');
        cy.get('.path-payment-strict-receive-operation').contains('Max amount: 3.0000000');
        cy.get('.path-payment-strict-receive-operation').contains(
            'Destination: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T',
        );
        cy.get('.path-payment-strict-receive-operation').contains('Path: XLM');
        cy.get('.path-payment-strict-receive-operation').contains('Destination asset: XLM');
        cy.get('.path-payment-strict-receive-operation').contains('Amount: 2.0000000');
    });

    it('should render manage buy offer operation', () => {
        cy.visit(`${BASE_URL}${manageBuyOfferXdr}`);
        cy.get('.manage-buy-offer-operation').contains(
            'Source Account: GBLYCS5FDM2EGDVPTECHXEBLIVQPLPIJI5U2BEGQVZIIXCVIHM6RV26T',
        );
        cy.get('.manage-buy-offer-operation').contains('Selling asset: XLM');
        cy.get('.manage-buy-offer-operation').contains('Buying asset: XLM');
        cy.get('.manage-buy-offer-operation').contains('Buy amount: 2.0000000');
        cy.get('.manage-buy-offer-operation').contains('Price: 1');
        cy.get('.manage-buy-offer-operation').contains('Offer ID: 0');
    });
});
