describe('through the tenant tests', () => {

const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

 const flowname = 'test migration flow'

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it(' create , reload flow and add tables to the flow ', () => { 
 

  //create flow if not exists and navigate to flow
  cy.getOrCreateFlow(flowname);

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


   // Search for SupplierInfo
    const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
    cy.get(`input[placeholder="${searchPlaceholder}"]`)
      .clear()
      .type("SupplierInfo");

    // Add 'SupplierInfo' table only if it exists
     //cy.get('#app div[title="PtSupplierInfo"] span').click();
    });
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

  

  cy.contains('SupplierAddress')
    .parents('.react-flow__node')
    .within(() => {

  const downloadBtn = '[title="Download data from source database"]'

 //click download button and wait for download to complete
 cy.get(downloadBtn).click().should('be.enabled')  // or changed state
  //click view log button
 cy.get('[title="View download and migration logs for this table"]').click()
 })
cy.contains('Download done:', { timeout: 80000 })
  .then(() => {
    cy.log('Download completed successfully');
  });

// close download modal
 cy.get('svg')
  .closest('button')
  .click({multiple: true})

  //click migration button and wait for migration to complete
  
  const migrateBtn = '[title="Start migration Upload data to destination database"]'
  cy.get(migrateBtn, { timeout: 60000 }).click().should('be.enabled')  // or changed state

  //click view log button
  cy.get('[title="View download and migration logs for this table"]').click()
   
  cy.contains("Upload completed (Upload)", { timeout: 120000 }).should(
      "be.visible",
    );
// close migration log modal
  cy.get('svg')
    .closest('button')
    .click()

  

  //navigate to the table details page
   cy.get('[title="Open table details"]').click();
 

//save flow
 cy.get('[title="Save current configuration"]').click()
  cy.contains('Saving Flow...', { timeout: 60000 })
    .should('not.exist')

})
 

})


   

 



 
   



