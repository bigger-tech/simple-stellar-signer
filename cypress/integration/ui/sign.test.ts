/// <reference types="cypress" />
/// <reference types="@testing-library/cypress"/>

const validXDR =
    'AAAAAgAAAAAiVD0LPjeVN9dg4xnB+xRONl3ES7okC0lLa8GznBk7bACYloAACVO9AAAAAQAAAAEAAAAAAAAAAAAAAABh6rhSAAAAAAAAAAEAAAAAAAAACAAAAABKBB+2UBMP/abwcm/M1TXO+/JQWhPwkalgqizKmXyRIQAAAAAAAAABnBk7bAAAAEDacZu/NajCJ8BK05TjKL/YnsDDk+dbM3Zb8h9JRMGLZiWinI9bCnjal8T9SXU6hRAdFZSv12OZUtp4VwigwoUL';

const url = Cypress.env('HOST');
it('alerts you if you do not pass an XDR as a query parameter or it is invalid', () => {
    cy.visit(url);
    cy.get('a[href*="sign"]').click();
    cy.findByText('INVALID OR NULL XDR').should('exist');
});
it('renders transaction info if XDR query parameter is valid', () => {
    cy.visit(`${url}/sign?xdr=${validXDR}`);
    cy.get('.src-account').contains('GARFIPILHY3ZKN6XMDRRTQP3CRHDMXOEJO5CIC2JJNV4DM44DE5WYLOK');
    cy.get('.operations').contains('GBFAIH5WKAJQ77NG6BZG7TGVGXHPX4SQLIJ7BENJMCVCZSUZPSISCLU5');
});
it('goes to /connect when clicking on the "Go to Connect" button', () => {
    cy.get('.connect-btn').click();
    cy.findByText('Connector').should('exist');
});
