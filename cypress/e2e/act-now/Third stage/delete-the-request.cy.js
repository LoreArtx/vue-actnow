/// <reference types="cypress" />

describe('Delete the request',()=>{
    const baseURL = 'http://localhost:5173';

    it('Sign in -> Link to your request -> Delete Request -> Check for Request', ()=>{
        cy.visit(baseURL)
        cy.get('[href="/sign-in"]').click()
        cy.url().should('eq', `${baseURL}/sign-in`)

        cy.get('input[name="phoneNumber"]').type('0670783284');
        cy.get('input[name="password"]').type('asd');
        cy.get('button').contains('Sign in').click()

        // successfully signed in

       cy.get('[href="/all-requests"]').click()
       cy.get('input[name="organization"]').type('Organization by cypress')
       cy.contains('Hot request by cypress').click()

       // got to the request page


       cy.contains('Delete request').click()

       // deleted the request

       cy.reload()

       cy.get('[href="/all-requests"]').click()
       cy.get('input[name="organization"]').type('Organization by cypress')
       cy.contains('No results')

    })
})