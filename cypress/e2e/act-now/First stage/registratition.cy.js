/// <reference types="cypress" />

describe('Registration and sign out', () => {
  const baseURL = 'http://localhost:5173';

  // Navigate to the sign-up page from Create Request link
  it('Create Request -> Sign in page -> Sign out page', () => {
    cy.visit(baseURL);

    cy.contains('Create Own Request').click();

    cy.url().should('eq', `${baseURL}/sign-in`);

    cy.contains("Don't have an account?").click();

    cy.url().should('eq', `${baseURL}/sign-up`);
  });

  // Complete the sign-up form and access the profile page
  it('Sign up -> profile page -> sign out', () => {
    cy.visit(`${baseURL}/sign-up`);
    cy.get('input[name="firstName"]').type('Test by');
    cy.get('input[name="lastName"]').type('cypress');
    cy.get('input[name="phoneNumber"]').type('0670783284');
    cy.get('input[name="password"]').type('asd');
    cy.get('input[name="confirmPassword"').type('asd');
    
    cy.get('button').contains('Sign up').click();

    cy.url().should('eq', `${baseURL}/`);

    cy.contains('Profile').click();

    cy.url().should('eq', `${baseURL}/profile`)

    cy.get('button').contains('Sign out').click()

    cy.url().should('eq', `${baseURL}/sign-in`)
  });
});
