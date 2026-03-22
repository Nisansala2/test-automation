describe('table functionality ', () => {

const validUser = {
  email: 'rohana@example.com',
  password: 'hefnu6-veDvez-domcen'
  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Entity mapper in table details', () => {

cy.visit('https://cypresstenant.old.tabletap.lk/resources/cypresstenant.SupplierInfo');

 //Open entity mapper from table details page
 
  cy.get('[title="Entity Mapper"]').click()
    .should("be.visible")
  cy.wait(2000)
  cy.contains('Cancel').click()
})
})