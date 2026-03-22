describe('table functionality ', () => {

const validUser = {
  email: 'rohana@example.com',
  password: 'hefnu6-veDvez-domcen'
  }

  const filname2 = 'supplierInfo1.csv'

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Import table data)', () => {

cy.visit('https://cypresstenant.old.tabletap.lk/resources/cypresstenant.SupplierInfo');

//Import data to table from table details page
 
  cy.get('[title="Import Data"]').click()
    
  cy.get('input[type="file"]').attachFile(filname2);
  cy.contains('button', 'Start Import')
    .click({timeout:40000})
    .should("be.visible")
  cy.contains('button', 'Close')

})
})