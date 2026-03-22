describe('table functionality ', () => {

const validUser = {
  email: 'rohana@example.com',
  password: 'hefnu6-veDvez-domcen'
  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Export column data)', () => {

cy.visit('https://cypresstenant.old.tabletap.lk/resources/cypresstenant.SupplierInfo');

//Export  functionality in table details page 
  cy.get('[title="Export Data"]').click()
  cy.wait(2000)

})
})