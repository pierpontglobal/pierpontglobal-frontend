import { ApiServer, AutomationUsername, AutomationPassword  } from '../../src/Defaults';

/**
 * Local configuration
*/
// const ApiServer = 'http://ppm2.local:3000';
// const AutomationUsername = 'leinadpb';
// const AutomationPassword = 'admin123';

let cookie = undefined;

Cypress.Commands.add("login", () => {

  cy.request({
    url: `${ApiServer}/oauth/token`,
    method: 'POST',
    body: {
      username: AutomationUsername,
      password: AutomationPassword,
      grant_type: 'password',
    },
  }).then( (response) => {
    cy.setCookie('tests_token', response.body.access_token);
    cookie = response.body.access_token;
  });
});

Cypress.Commands.add("logout", () => {

  cy.request({
    url: `${ApiServer}/api/v1/user/invalidate`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${cookie}`,
    },
  }).then( (res) => {
    cy.clearCookies();
  });
});
