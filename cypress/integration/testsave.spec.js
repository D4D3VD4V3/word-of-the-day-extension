// testsave.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
    describe('Test Saving Word Functionality', () => {
        it('click the save button', () => {
            cy.contains('.save-button').click()

        })
        it('make sure save button is disabled', () => {
            cy.get('.save-button').should('be.disabled')

        })
    })
