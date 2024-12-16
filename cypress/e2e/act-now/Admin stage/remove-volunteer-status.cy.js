/// <reference types="cypress" />

describe('Remove the volunteer status',()=>{
    const baseURL = 'http://localhost:5173';

    it('Sign in -> Link to Dashboard -> Remove the volunteer status of a user', ()=>{
        cy.visit(baseURL)
        cy.get('[href="/sign-in"]').click()
        cy.url().should('eq', `${baseURL}/sign-in`)

        cy.get('input[name="phoneNumber"]').type('0678078342');
        cy.get('input[name="password"]').type('asd');
        cy.get('button').contains('Sign in').click()

        // successfully signed in

       cy.get('[href="/dashboard"]').click()
       cy.get(':nth-child(2) > :nth-child(3) > .v-card > .v-card-actions > :nth-child(2) > .v-btn__content').click()
       cy.get(':nth-child(2) > :nth-child(3) > .v-card > .v-card-actions > :nth-child(2) > .v-btn__content')
    })
})