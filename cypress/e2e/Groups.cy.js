describe('Group functonality', () => {

const validUser = {

    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'

  }

 const flowname = 'test migration flow'

  beforeEach(() => {
  cy.login(validUser.email, validUser.password)
  })

it('Select multiple tables using CTRL + click', () => {

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

  
//Open Group section
cy.contains('Groups').click()

//open driagam
cy.contains('Drawing').click()



// Hold CTRL key
cy.get('body').type('{ctrl}', { release: false });

// Click first table
cy.contains('SupplierAddress').click({ force: true });

// Click second table
cy.contains('SupplierInfo').click({ force: true });

// Release CTRL
cy.get('body').type('{ctrl}');
})

})
