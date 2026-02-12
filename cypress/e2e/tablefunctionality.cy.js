describe('table functionality ', () => {


const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

const tableName = "SupplierInfo"
const filname2 = 'supplierInfo1.csv'

beforeEach(() => {
  cy.login(validUser.email, validUser.password)

})

it ('should load table page', () => {
    cy.Create_migration_flow()
    cy.contains(tableName)
      .parents('.react-flow__node')
      .within(() => {
    cy.get('[title="Open table details"]').click()
      })
    
  })

it ('should download table data ', () => {

  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()

//cy.intercept('GET', '**/api/migration/entity-structure?tableName=SupplierInfo&structureType=source').as('download');
cy.get('[title="Download from source"]').click()

cy.contains('Download completed', { timeout: 30000 })
  .should('be.visible')

 
  })
   
it ('should add filter ', () => {

  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()

  //cy.get('[title="Show filters"] > .sc-gjTGSA').click()
  cy.contains('button', 'Filters').click();
  cy.get('input[placeholder="Search columns..."]').type('Supplier ID')
  cy.get('input[placeholder="Filter Supplier Id"]').type('10001');
  cy.contains('button', 'Apply Filter').click()
      .should ('be.visible')
  cy.get('[title="Show filters (1 active)"]').click()
  cy.contains('button', 'Clear all filters').click()
                
 
})

it('Full screen mode ', () => {

  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()
  cy.contains('button', 'Fullscreen').click()
  cy.wait(2000)
  cy.contains('button', 'Exit Fullscreen').click()

})

it ('should add record in table ', () => {
   
  cy.get('.bpJfoD').click()
   
  cy.contains('Database').click()
  cy.contains(tableName).click()

 
 
  cy.get('button[aria-label="Add"]').click();
  cy.contains('New Record').click()
   
  cy.get('input[id ="company"]').type('ABC Corporation');
  cy.get('input[placeholder="Pt File Id"]').type('PT12345');
  cy.get('input[placeholder="Supplier Id"]').type('SUP001');
  cy.get('input[placeholder="Account Id"]').type('AC9988');
  cy.get('input[placeholder="Supplier Tax Id"]').type('TAX55');

   cy.contains('button', 'Create').click()



  })

it ('shoulld view visibility ', () => {
  
  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()


  cy.get('[title="Column visibility"]').click()
     .should('be.visible')
  cy.wait(20000)
  cy.contains('Cancel').click()
   })
   
it ('should map columns in table ', () => {

  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()

 
  cy.get('[title="Entity Mapper"]').click()
    .should("be.visible")
  })


it ('should upload table data ', () => {

  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()

  
  cy.get('[title="Upload to destination"]').click()
  })


it ('should export table data ', () => {
  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()

 
  cy.get('[title="Export Data"]').click()

})

it ('should delete all record in table ', () => {
  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()
 
  cy.get('[title="Delete all records"]').click()

    })

it ('should import table data ', () => {
  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()
  cy.get('[title="Import Data"]').click()
    
  cy.get('input[type="file"]').attachFile(filname2);
  cy.contains('button', 'Start Import')
    .click({timeout:40000})
    .should("be.visible")
  cy.contains('button', 'Close')
})

 })