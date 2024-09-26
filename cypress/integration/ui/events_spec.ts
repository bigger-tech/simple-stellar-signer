/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { operationsXdr } from '../../fixtures/operations.json';
import { amountToSend, assetCode, destinationAccount, issuer } from '../../fixtures/payment.json';

const operationGroupTitle = 'Payment';
const operationGroupDescription = 'This is a merge account operation';
const operationDescription = 'This is a transaction';

describe('Events', () => {
    beforeEach(() => {
        cy.interceptAnalytics();
    });

    it('should render one wallet', () => {
        cy.visit('/connect');
        cy.window().then((win) => {
            win.postMessage({ wallets: ['xbull'] }, '*');
        });
        cy.get('.simple-signer-wallets').last().should('have.length', 1);
    });

    it('should render a transaction, with groups and description', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit('/sign');
        cy.window().then((win) => {
            win.postMessage(
                {
                    xdr: operationsXdr,
                    description: operationDescription,
                    operationGroups: [
                        { from: 0, to: 0, description: operationGroupDescription, title: operationGroupTitle },
                    ],
                },
                '*',
            );
        });
        cy.get('.tx-container').should('have.length', 1);
        cy.get('.operation-group-container').should('have.length', 1);
        cy.get('.operation-title-head').should('contain', operationGroupTitle);
        cy.get('.operation-group-description').contains(operationGroupDescription);
        cy.get('.tx-operation-container').should('have.length', 2);
        cy.get('.tx-description-container').contains(operationDescription);
    });

    it('should render a payment operation', () => {
        cy.visit('/payment');
        cy.window().then((win) => {
            win.postMessage({
                receiver: destinationAccount,
                issuer,
                amount: amountToSend,
                assetCode,
            });
        });
        cy.get('.receiver').should('have.length', 1);
    });
});
