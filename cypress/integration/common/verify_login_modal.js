import { WebServer } from '../../../src/Defaults';

/**
 * Local configuration
*/
// const WebServer = 'http://ppm2.local:4000';

describe('Verify login modal appears', () => {
  it('Renders SignIn modal', () => {

    cy.visit(`${WebServer}/?signIn=true`);

    cy.get('.my-modal-main')
      .should('be.visible');

  });
});