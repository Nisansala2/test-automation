describe('table functionality ', () => {

const validUser = {
  email: 'rohana@example.com',
  password: 'hefnu6-veDvez-domcen'
  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Add new column to table)', () => {

cy.visit('https://cypresstenant.old.tabletap.lk/resources/cypresstenant.SupplierInfo');

//Add new field in table details page
  cy.get('button[aria-label="Add"]').click();
  cy.contains('New Field').click()
   // Type Column Name
  cy.get('input[placeholder="e.g. customer_id"]')
    .clear()
    .type('customer_id');
  //select data type
  cy.get('.eUTfhg > :nth-child(2) > select').select('String'); 
 

  // Enter Default Value (optional)
  cy.get('input[placeholder="Optional default value for existing rows"]')
    .type('N/A');

  // Click Create Field button
  cy.contains('Create Field').click();

  //close add field modal
  cy.contains('button', 'Close').click()
  cy.wait(2000)


})
})