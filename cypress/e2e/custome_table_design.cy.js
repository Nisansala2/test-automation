describe('through the tenant tests', () => {

const validUser = {

email: 'rohana@example.com',
password: 'hefnu6-veDvez-domcen'

    }
   
beforeEach(() => {

  cy.login(validUser.email, validUser.password)

  const flowname = 'test migration flow'

   //create flow if not exists and navigate to flow
  cy.getOrCreateFlow(flowname);

   //Load flow 
  cy.contains('Loading tables...', { timeout: 60000 })
    .should('not.exist')
  
  })

it(' create custome table in happy path ', () => { 

  // Only reload tables if no tables are persisted yet
  cy.get("body").then(($body) => {
    const noTablesPersisted = $body
        .text()
        .includes(
          "No tables persisted yet. Click the save icon above to load tables from IFS.",
        );

    if (noTablesPersisted) {
        cy.log("No tables persisted, reloading tables from source...");
        // Reload tables from source
        cy.get('[title="Reload tables from source"]').click();
        cy.contains("Saving tables snapshot...", { timeout: 60000 }).should(
          "not.exist",
        );
      } else {
        cy.log("Tables already persisted, skipping reload.");
      }

    })

    //open custome table window 
   cy.get('[title="Design a new custom table"]').click()
     .should('be.visible')
     
  
    cy.get('input[placeholder="e.g. customer_orders"]')
      .type('text_supplier1');

    // Add an attribute
    //cy.contains('Add Attribute').click();

    // Fill in column name
    cy.get('input[placeholder="e.g. customer_id"]')
      .type('SupplierId');

    // Select type from dropdown (example: VARCHAR2)
    cy.get('select').select('VARCHAR2');
 
    cy.contains('td', 'PK')
      .find('input[type="checkbox"]')
      .check({ force: true })
  

    // Enter fill label
    
    // Enter default value
    cy.get('input[placeholder="Enter default value"]')
      .type('N/A');

    // Optionally check description field
    cy.get('textarea[placeholder="Description shown in edit forms"]')
      .type('Unique identifier for each customer');
   

     // Add an attribute
    cy.contains('Add Attribute').click();

    cy.get('input[placeholder="e.g. customer_id"]').eq(1).type('SupplierName')
  
    // Add an attribute
    cy.contains('Add Attribute').click();
       // Fill in column name
    cy.get('input[placeholder="e.g. customer_id"]').eq(2)
      .type('Country');

     // Add an attribute
    cy.contains('Add Attribute').click();
    
      // Fill in column name
    cy.get('input[placeholder="e.g. customer_id"]').eq(3)
      .type('Email');

       // Add an attribute
    cy.contains('Add Attribute').click();

        // Fill in column name
    cy.get('input[placeholder="e.g. customer_id"]').eq(4)
      .type('Phone');

    
    // Click Create Table
    cy.contains('Create Table').click();

    // Assert that table creation succeeded (example: confirmation message)
   cy.contains('Saving...', { timeout: 100000 })
     .should('not.exist')

  cy.wait(2000)


 // navigate the table detail 
  cy.contains('text_supplier1')
    .parents('.react-flow__node')
    .within(() => {
    cy.get('[title="Open table details"]').click();

    })

    //reload 
  cy.reload()

    //open etity mapper 
  cy.get('[title="Entity Mapper"]').click()
    .should("be.visible")

  cy.contains('test.text_supplier1').click()

  //search destination entity 
  cy.get('input[placeholder="Search IFS destination entities..."]')
    .clear()
    .type('SupplierInfo', {timeout: 10000}); 

    //select supplier info entity
  cy.contains('SupplierInfo')
    .click()
    .should('be.visible')

  
  






  })
 


});

  




