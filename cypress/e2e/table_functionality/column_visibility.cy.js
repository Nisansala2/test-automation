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
  cy.wait(200)

  //hide columns 
 cy.contains("Name", { matchCase: false }).dblclick({ force: true })
 cy.contains("Supplier ID", { matchCase: false }).dblclick({ force: true })



  //save column visibility settings
  
  cy.contains('Save').click()

  cy.wait(2000)

  //Hide all columns and verify no data is shown in table details page
  cy.get('[title="Column visibility"]').click()
  cy.contains("hide all").click({timeout: 2000})
  cy.contains('Save').click()

  //Unhide all columns and verify data is shown in table details page
  cy.get('[title="Column visibility"]').click()
  cy.contains("unhide all").click({timeout: 2000})
  cy.contains('Save').click()

})
})