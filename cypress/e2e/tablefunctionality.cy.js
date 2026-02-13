describe('table functionality ', () => {


const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }
const flowname = 'test table functionality flow'
const tableName = "SupplierInfo"
const filname2 = 'supplierInfo1.csv'

beforeEach(() => {
  cy.login(validUser.email, validUser.password)

})

it('should load table page', () => {
  cy.contains('Manage Flows').click()
  // Search flow
  cy.get('input[placeholder="Search flows..."]')
    .clear()
    .type(flowname);

  // Wait for search result to render (better use intercept if API exists)
  cy.wait(1000);

  cy.get('body').then(($body) => {

    if ($body.text().includes(flowname)) {

      cy.log('Flow exists');
      cy.contains(flowname).click();

    } else {

      cy.log('Flow not found - creating new flow');
      cy.Create_migration_flow();   // your custom command

    }

  });

  // After flow is opened, open table details
  cy.contains(tableName)
    .parents('.react-flow__node')
    .within(() => {
      cy.get('[title="Open table details"]').click();
    });

});


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
  cy.get('input[placeholder="Search columns..."]').type('Supplier ID ')
  cy.get('input[placeholder="Filter Supplier Id Test"]').type('10001');
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

  })

it ('should add field in table ', () => {
  cy.get('.bpJfoD').click()
  cy.contains('Database').click()
  cy.contains(tableName).click()

  cy.get('button[aria-label="Add"]').click();
  cy.contains('New Field').click()
   // Type Column Name
  cy.get('input[placeholder="e.g. customer_id"]')
    .clear()
    .type('customer_id');

  cy.get('select[name="dataType"]').select('String'); 
 

  // Enter Default Value (optional)
  cy.get('input[placeholder="Optional default value for existing rows"]')
    .type('N/A');

  // Check Required Field (if needed)
  cy.contains('Required Field')
    .parent()
    .find('input[type="checkbox"]')
    .check();

  // Click Create Field button
  cy.contains('Create Field').click();
  


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

  it ('should export table data ', () => {
  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()

 
  cy.get('[title="Export Data"]').click()

})


it ('should upload table data ', () => {

  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()

  
  cy.get('[title="Upload to destination"]').click()
  })

it ('should delete all record in table ', () => {
  cy.get('.bpJfoD').click()  
  cy.contains('Database').click()
  cy.contains(tableName).click()
 
  cy.get('[title="Clear 1569 filtered rows"]').click()
  cy.contains('button', 'Confirm Deletion').click()

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