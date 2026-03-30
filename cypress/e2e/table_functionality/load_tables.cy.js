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

it('should load table canva, navigate table details,. ', () => {

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
    })

  // Search for Supplier table and add to flow
  const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
  
  const tableName = "SupplierInfo";
  

  cy.get(`input[placeholder="${searchPlaceholder}"]`)
    .clear()
    .type(tableName);

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

//download data

cy.get('[title="Download from source"]').click()

cy.contains('Download completed', { timeout: 30000 })
  .should('be.visible')

 
//close download modal
cy.get(':nth-child(2) > .dMqmKY > .sc-kFuwaP > svg').click()
})
})