/// <reference types="cypress" />

describe("Donation", ()=>{
      const baseURL = 'http://localhost:5173';

    // Make a donate
    it('Make a donate', ()=>{
        cy.visit(baseURL)
        cy.contains('Aid for Refugees Organization').click()

        cy.url().should('eq', `${baseURL}/request-for-volunteering/674881c568e7084b50bf137c`)

        cy.get('button').contains('Donate').click()

        cy.get('input[name="name"]').type('Danylo')
        cy.get('input[name="cardNumber"]').type('4114775288232231')
        cy.get('input[name="exp"]').type('12/12')
        cy.get('input[name="cvv"]').type('123')
        cy.get('input[name="amount"]').type('100')

        cy.get('button').contains('Submit').click()


        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Request updated successfully`)
        })
    })
})