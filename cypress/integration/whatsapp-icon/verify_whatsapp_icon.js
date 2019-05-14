/* eslint-disable no-undef */
// import { WebServer } from '../../../src/Defaults';

const WebServer = 'http://localhost:4000';

describe('Verify whatsapp icon appears', () => {
  it('Renders Whatsapp icon', () => {
    cy.visit(`${WebServer}`);

    cy.get('[data-cy=whatsapp-icon]')
      .should('be.visible');

    cy.get('[data-cy=user-list]')
      .should('have.css', 'display')
      .and('match', 'none');

    cy.get('.chat-icon').click();

    cy.get('[data-cy=whatsapp-icon]')
      .should('be.visible')
      .should('have.css', 'display')
      .and('match', 'flex');
  });
});
