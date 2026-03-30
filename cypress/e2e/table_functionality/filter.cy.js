describe('table functionality ', () => {

const validUser = {
  email: 'rohana@example.com',
  password: 'hefnu6-veDvez-domcen'
  }

  const filname2 = 'supplierInfo1.csv'

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Filter table data)', () => {

cy.visit('https://cypresstenant.old.tabletap.lk/resources/cypresstenant.SupplierInfo');

//Filter functionality in table details page
cy.contains('button', 'Filters').click();

//search for supplier id and apply filter
cy.get('input[placeholder="Search columns..."]').type('Supplier ID ')
cy.get('input[placeholder="Filter Supplier ID"]').type('10001');
cy.contains('button', 'Apply Filter').click()
      .should ('be.visible')

cy.get('[title="Show filters (1 active)"]').click()
cy.contains('button', 'Clear all filters').click()
cy.contains('button', 'Close').click()
cy.wait(2000)

})
})