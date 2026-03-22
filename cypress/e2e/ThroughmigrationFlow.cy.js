describe('through the tenant tests', () => {

const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

 const flowname1 = 'test migration flow01'
 const flowname2 = 'test migration flow02'

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it(' create , reload flow and add tables to the flow ', () => { 
 
  //create flow if not exists and navigate to flow
  cy.getOrCreateFlow(flowname1);

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

  // Search for Supplier table and add to flow
  const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
  const tableName1 = "Supplier";
  const tableName2 = "SupplierInfo";
  const tableName3 = "SupplierAddress";

  cy.get(`input[placeholder="${searchPlaceholder}"]`)
    .clear()
    .type(tableName1);

  // target the list container instead of body
  cy.wait(500);

  cy.get('.dTrtJo')   // your real container
    .should('exist')  // ensure container exists
    .then(($container) =>{
const supplierInfo = $container.find('[title="Supplier"]');

  if (supplierInfo.length > 0) {
    cy.wrap(supplierInfo).click();
      cy.log('Supplier found and clicked');
    } else {
      cy.log('Supplier not found');
    }
    })
  cy.wait(6000)

   // Search for SupplierInfo table and add to flow
  cy.get(`input[placeholder="${searchPlaceholder}"]`)
    .clear()
    .type(tableName2);

  // target the list container instead of body
  cy.wait(500);

  cy.get('.dTrtJo')   // your real container
    .should('exist')  // ensure container exists
    .then(($container) =>{
const supplierInfo = $container.find('[title="SupplierInfo"]');

  if (supplierInfo.length > 0) {
    cy.wrap(supplierInfo).click();
      cy.log('SupplierInfo found and clicked');
    } else {
      cy.log('SupplierInfo not found');
    }
    })
  cy.wait(6000)

   //Search for SupplierAddress table and add to flow
     cy.get(`input[placeholder="${searchPlaceholder}"]`)
    .clear()
    .type(tableName3);

  // target the list container instead of body
  cy.wait(500);

  cy.get('.dTrtJo')   // your real container
    .should('exist')  // ensure container exists
    .then(($container) =>{

const supplierInfo = $container.find('[title="SupplierAddress"]');

  if (supplierInfo.length > 0) {
    cy.wrap(supplierInfo).click();
      cy.log('SupplierAddress found and clicked');
    } else {
      cy.log('SupplierAddress not found');
    }
    })


  cy.wait(6000)// Click synchronize database and wait for popup to close
  cy.get('[title="Synchronize database"]').click()
  cy.contains('Synchronizing database...', { timeout: 20000 })
  
  cy.contains('Synchronizing database...', { timeout: 60000 })
    .should('not.exist')



  })

  //connect flows 

it("Run connected flow and verify download and migration", () => {

  cy.getOrCreateFlow(flowname2);
    
  // Click synchronize database and wait for popup to close
  cy.get('[title="Synchronize database"]').click()
  cy.contains('Synchronizing database...', { timeout: 20000 })
  
  cy.contains('Synchronizing database...', { timeout: 60000 })
    .should('not.exist')

  // Download data for Supplier table and verify download completion
  cy.contains('Supplier')
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
 cy.get('[title="Close"]').click()

 // Download data for SupplierInfo table and verify download completion

 cy.contains('SupplierInfo')
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
 cy.get('[title="Close"]').click()

// Download data for SupplierAddress table and verify download completion

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
 cy.get('[title="Close"]').click()



  //click migration button and wait for migration to complete
  
  const migrateBtn = '[title="Start migration Upload data to destination database"]'
  cy.get(migrateBtn, { timeout: 60000 }).click().should('be.enabled')  // or changed state

  //click view log button
  cy.get('[title="View download and migration logs for this table"]').click()
   
  cy.contains("Upload completed (Upload)", { timeout: 120000 }).should(
      "be.visible",
    );
// close migration log modal
  cy.get('[title="Close"]').click()

//save flow
 cy.get('[title="Save current configuration"]').click()
  cy.contains('Saving Flow...', { timeout: 60000 })
    .should('not.exist')

})
 

})





   

 



 
   



