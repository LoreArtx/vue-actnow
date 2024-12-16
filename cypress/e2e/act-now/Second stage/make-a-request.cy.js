/// <reference types="cypress" />

describe('Create a request',()=>{
    const baseURL = 'http://localhost:5173';

    it('Sign in -> Fill the form -> Create a request', ()=>{
        cy.visit(baseURL)
        cy.get('[href="/sign-in"]').click()
        cy.url().should('eq', `${baseURL}/sign-in`)

        cy.get('input[name="phoneNumber"]').type('0670783284');
        cy.get('input[name="password"]').type('asd');
        cy.get('button').contains('Sign in').click()

        // successfully signed in

        cy.contains('Create Own Request').click()
        cy.get('input[name="title"]').type('Hot request by cypress');
        cy.get('.v-select').type('medical').click();
        cy.get('textarea[name="description"]').type('Small description by cypress');
        cy.get('input[name="donateGoal"]').type('25000');

        cy.get('button').contains('Create a request').click()
        cy.url().should('include',`${baseURL}/request-for-volunteering`)

    })
})