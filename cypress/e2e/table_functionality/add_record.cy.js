describe('table functionality ', () => {

const validUser = {
  email: 'rohana@example.com',
  password: 'hefnu6-veDvez-domcen'
  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Add new record to table)', () => {

cy.visit('https://cypresstenant.old.tabletap.lk/resources/cypresstenant.SupplierInfo');

//add new record in table details page
cy.get('button[aria-label="Add"]').click();
cy.contains('New Record').click()

cy.get('#SupplierId').type('ABC Corporation');
cy.get('#Name').type('PT12345');
cy.get('#CreationDate').type('2024-01-01');
cy.get('#AssociationNo').type('AC9988');
cy.get('#Party').type('Customer');
cy.get('#PartyType').select('Customer');

    // Active checkbox
cy.get('#OneTime').click();
cy.get('#SupplierCategory').select('Supplier')
cy.get('#B2bSupplier').click()
cy.get('#DefaultDomain').click()
cy.get('#IdentifierRefValidation').select('None')
  
cy.contains('button', 'Create').click()
cy.wait(2000)


})

  

})