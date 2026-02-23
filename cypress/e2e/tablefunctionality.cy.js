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

    // Search for SupplierInfo
    const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
    cy.get(`input[placeholder="${searchPlaceholder}"]`)
      .clear()
      .type("SupplierInfo");

     // Add 'SupplierInfo' table only if it exists
  cy.get("body").then(($body) => {
    if ($body.find('[title="SupplierInfo"]').length > 0) {
    cy.log("SupplierInfo found, clicking to add...");
    cy.get('[title="SupplierInfo"]').click();
    } else {
     cy.log("SupplierInfo not found in the list.");
      }
    });
      
  // Click synchronize database and wait for popup to close
  cy.get('[title="Synchronize database"]').click()
  cy.contains('Synchronizing database...', { timeout: 20000 })
  
  cy.contains('Synchronizing database...', { timeout: 60000 })
    .should('not.exist')

  // After flow is opened, open table details
  cy.contains(tableName)
    .parents('.react-flow__node')
    .within(() => {
      cy.get('[title="Open table details"]').click();
    });

//cy.intercept('GET', '**/api/migration/entity-structure?tableName=SupplierInfo&structureType=source').as('download');
cy.get('[title="Download from source"]').click()

cy.contains('Download completed', { timeout: 30000 })
  .should('be.visible')

 
//close download modal
cy.get(':nth-child(2) > .dMqmKY > .sc-kFuwaP > svg').click()

//Filter functionality in table details page
cy.contains('button', 'Filters').click();

//search for supplier id and apply filter
cy.get('input[placeholder="Search columns..."]').type('Supplier ID ')
cy.get('input[placeholder="Filter Supplier Id Test"]').type('10001');
cy.contains('button', 'Apply Filter').click()
      .should ('be.visible')

cy.get('[title="Show filters (1 active)"]').click()
cy.contains('button', 'Clear all filters').click()
cy.contains('button', 'Close').click()
cy.wait(2000)

//Full screen and exit full screen functionality in table details page
cy.contains('button', 'Fullscreen').click()
cy.wait(2000)
cy.contains('button', 'Exit Fullscreen').click()

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

//Column visibility in table details page
  cy.get('[title="Column visibility"]').click()
     .should('be.visible')
  cy.wait(20000)
  cy.contains('Cancel').click()
  
 //Open entity mapper from table details page
 
  cy.get('[title="Entity Mapper"]').click()
    .should("be.visible")
  cy.wait(2000)
  cy.contains('Cancel').click()

//Export  functionality in table details page 
  cy.get('[title="Export Data"]').click()
  cy.wait(2000)


//Upload functionality in table details page  
  cy.get('[title="Upload to destination"]').click({timeout: 10000})
  //close Upload modal
cy.get(':nth-child(2) > .dMqmKY > .sc-kFuwaP > svg').click()
  


// Delete table from flow
 
  cy.get('[title="Clear 1567 filtered rows"]').click()
  cy.contains('button', 'Confirm Deletion').click()


//Import data to table from table details page
 
  cy.get('[title="Import Data"]').click()
    
  cy.get('input[type="file"]').attachFile(filname2);
  cy.contains('button', 'Start Import')
    .click({timeout:40000})
    .should("be.visible")
  cy.contains('button', 'Close')
})

 })
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

    // Search for SupplierInfo
    const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
    cy.get(`input[placeholder="${searchPlaceholder}"]`)
      .clear()
      .type("SupplierInfo");

     // Add 'SupplierInfo' table only if it exists
  cy.get("body").then(($body) => {
    if ($body.find('[title="SupplierInfo"]').length > 0) {
    cy.log("SupplierInfo found, clicking to add...");
    cy.get('[title="SupplierInfo"]').click();
    } else {
     cy.log("SupplierInfo not found in the list.");
      }
    });
      
  // Click synchronize database and wait for popup to close
  cy.get('[title="Synchronize database"]').click()
  cy.contains('Synchronizing database...', { timeout: 20000 })
  
  cy.contains('Synchronizing database...', { timeout: 60000 })
    .should('not.exist')

  // After flow is opened, open table details
  cy.contains(tableName)
    .parents('.react-flow__node')
    .within(() => {
      cy.get('[title="Open table details"]').click();
    });

//cy.intercept('GET', '**/api/migration/entity-structure?tableName=SupplierInfo&structureType=source').as('download');
cy.get('[title="Download from source"]').click()

cy.contains('Download completed', { timeout: 30000 })
  .should('be.visible')

 
//close download modal
cy.get(':nth-child(2) > .dMqmKY > .sc-kFuwaP > svg').click()

//Filter functionality in table details page
cy.contains('button', 'Filters').click();

//search for supplier id and apply filter
cy.get('input[placeholder="Search columns..."]').type('Supplier ID ')
cy.get('input[placeholder="Filter Supplier Id Test"]').type('10001');
cy.contains('button', 'Apply Filter').click()
      .should ('be.visible')

cy.get('[title="Show filters (1 active)"]').click()
cy.contains('button', 'Clear all filters').click()
cy.contains('button', 'Close').click()
cy.wait(2000)

//Full screen and exit full screen functionality in table details page
cy.contains('button', 'Fullscreen').click()
cy.wait(2000)
cy.contains('button', 'Exit Fullscreen').click()

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

//Column visibility in table details page
  cy.get('[title="Column visibility"]').click()
     .should('be.visible')
  cy.wait(20000)
  cy.contains('Cancel').click()
  
 //Open entity mapper from table details page
 
  cy.get('[title="Entity Mapper"]').click()
    .should("be.visible")
  cy.wait(2000)
  cy.contains('Cancel').click()

//Export  functionality in table details page 
  cy.get('[title="Export Data"]').click()
  cy.wait(2000)


//Upload functionality in table details page  
  cy.get('[title="Upload to destination"]').click({timeout: 10000})
  //close Upload modal
cy.get(':nth-child(2) > .dMqmKY > .sc-kFuwaP > svg').click()
  


// Delete table from flow
 
  cy.get('[title="Clear 1567 filtered rows"]').click()
  cy.contains('button', 'Confirm Deletion').click()


//Import data to table from table details page
 
  cy.get('[title="Import Data"]').click()
    
  cy.get('input[type="file"]').attachFile(filname2);
  cy.contains('button', 'Start Import')
    .click({timeout:40000})
    .should("be.visible")
  cy.contains('button', 'Close')
})

 })