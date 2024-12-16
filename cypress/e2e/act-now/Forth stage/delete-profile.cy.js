/// <reference types="cypress" />

describe('Delete the profile',()=>{
    const baseURL = 'http://localhost:5173';

    it('Sign in -> Link to your Profile -> Delete User -> Check if sign in works', ()=>{
        cy.visit(baseURL)
        cy.get('[href="/sign-in"]').click()
        cy.url().should('eq', `${baseURL}/sign-in`)

        cy.get('input[name="phoneNumber"]').type('0670783284');
        cy.get('input[name="password"]').type('asd');
        cy.get('button').contains('Sign in').click()

        // successfully signed in

       cy.get('[href="/profile"]').click()
       cy.contains('Delete user').click()


       // deleted the user

        cy.url().should('eq', `${baseURL}/sign-in`)
        cy.get('input[name="phoneNumber"]').type('0670783284');
        cy.get('input[name="password"]').type('asd');
        cy.get('button').contains('Sign in').click()
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })

    })
})