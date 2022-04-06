/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>
import { operationsXdr } from '../../fixtures/operations.json';
const operationGroupDescription = 'This is a merge account operation';
const operationDescription = 'This is a transaction';

describe('Events', () => {
    it('should render one wallet', () => {
        cy.visit('/connect');
        cy.window().then((win) => {
            win.postMessage({ wallets: ['xbull'] }, '*');
        });
        cy.get('.simple-signer-wallets').children().should('have.length', 1);
    });

    it('should render a transaction, with groups and description', () => {
        window.localStorage.setItem('wallet', 'xbull');
        cy.visit('/sign');
        cy.window().then((win) => {
            win.postMessage(
                {
                    xdr: operationsXdr,
                    description: operationDescription,
                    operationGroups: [{ from: 0, to: 0, description: operationGroupDescription }],
                },
                '*',
            );
        });
        cy.get('.tx-container').should('have.length', 1);
        cy.get('.operations-group-container').should('have.length', 1);
        cy.get('.operations-group-title').contains(operationGroupDescription);
        cy.get('.tx-operation-container').should('have.length', 2);
        cy.get('.tx-description-container').contains(operationDescription);
    });
});
