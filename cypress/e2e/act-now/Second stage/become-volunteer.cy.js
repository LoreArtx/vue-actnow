/// <reference types="cypress" />

describe("Become a volunteer", ()=>{
    const baseURL = 'http://localhost:5173';

    // Sign in -> Profile -> Become Volunteer -> Form Submit -> Volunteer status
    it('Sign in -> Profile -> Become Volunteer -> Form Submit -> Volunteer status', ()=>{
    
    cy.visit(baseURL)
    cy.contains('Sign in').click()

    cy.url().should('eq', `${baseURL}/sign-in`)

    cy.get('input[name="phoneNumber"]').type('0670783284')
    cy.get('input[name="password"]').type('asd')
    cy.get('button').contains('Sign in').click()

    // we passed sign in stage


    cy.contains('Profile').click()
    cy.url().should('eq', `${baseURL}/profile`)
    cy.contains('Role: user')

    // we got to profile of a user

    cy.get('button').contains('Become a volunteer').click()

    cy.url().should('eq', `${baseURL}/become-volunteer`)
    cy.get("#google-maps").click(150,150)
    cy.get('input[name="organization"]').type('Organization by cypress')
    cy.get('button').contains('Submit').click()

    cy.get('button').contains('Verificate').click()
            cy.on('window:alert', (str) => {
            expect(str).to.equal('Role updated successfully!')
    })
    
    // we became a volunteer

    
    cy.visit(`${baseURL}/profile`)
    cy.contains('Role: volunteer')

    // we got to profile of volunteer
    })

})