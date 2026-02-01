describe('through the tenant tests', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
    }
   
beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.globalfilter()
    
})

it (' sholud show global filter section  ', () => {
   cy.contains('Filters').click()
 })

it (' sholud apply globle filter  ', () => {
  cy.contains('Filters').click()
  cy.contains('Add Filter').click()
})
 
it ('should apply filter and show results', () => {
  cy.contains('Filters').click()
  cy.get('[data-variant="neutral"]').click()
  cy.get('input').eq(0).type('Status')
  cy.get('[data-variant="primary"]').click()
  cy.wait(2000)
  cy.contains('Apply Filters').click()
  cy.reload()
})
})
