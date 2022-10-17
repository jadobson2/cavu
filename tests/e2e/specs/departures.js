// https://docs.cypress.io/api/table-of-contents

describe('Departures', () => {
  it('displays a list of departures', () => {
    cy.visit('/')
    cy.get('[data-test="departure"]').its('length').should('be.gt', 0)
  })

  it('updates a flight status to a pre-defined option', () => {
    cy.visit('/')
    cy.get('#update-flight').select(1)
    cy.get('#update-status').select('Cancelled')
    cy.get('[data-test="update-button"]').click()
    cy.contains('Departure updated successfully.')
    cy.get('[data-test="departure"]')
      .first()
      .find('[data-test="departure-status"]')
      .contains('Cancelled')
  })

  it('updates a flight status to a custom value', () => {
    cy.visit('/')
    cy.get('#update-flight').select(1)
    cy.get('#update-status').select('Other')
    cy.get('#update-status-other').type('Other status')
    cy.get('[data-test="update-button"]').click()
    cy.contains('Departure updated successfully.')
    cy.get('[data-test="departure"]')
      .first()
      .find('[data-test="departure-status"]')
      .contains('Other status')
  })
})
