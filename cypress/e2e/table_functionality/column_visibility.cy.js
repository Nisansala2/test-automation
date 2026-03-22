describe('table functionality ', () => {

const validUser = {
  email: 'rohana@example.com',
  password: 'hefnu6-veDvez-domcen'
  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Column visibility in table details page)', () => {

cy.visit('https://cypresstenant.old.tabletap.lk/resources/cypresstenant.SupplierInfo');

//Column visibility in table details page
  cy.get('[title="Column visibility"]').click()
     .should('be.visible')
  cy.wait(20000)
  cy.contains('Cancel').click()


})
})