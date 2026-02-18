describe('Version control functionality', () => {

  const validUser = {
     email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

   beforeEach(() => {
    cy.login(validUser.email, validUser.password)
         
  })

  it('should navigate to version control and create new version ', () => {
    const flowName = "test version control";

  // Navigate to the flow (creates it if it doesn't exist)
  cy.getOrCreateFlow(flowName);

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


     cy.contains('SupplierInfo')
    .parents('.react-flow__node')
    .within(() => {
      
      cy.get('[title="Open table details"]').click();
  
    })
    // Click download from source and wait for download to complete
    cy.get('[title="Download from source"]').click();
    cy.contains("Download completed (download)", { timeout: 120000 }).should(
      "be.visible",
    );

    //close download modal
    cy.get(":nth-child(2) > .dMqmKY").click();

    // Open version control show active version 
    cy.get('[title="Click to open version control"]').click({timeout: 10000});

    //create version 01
   cy.contains("Create Version").click();
   cy.wait(2000)

  })

it('version comparison between version 0 and version 1', () => {

  //toggle view menu
  cy.get('.bpJfoD').click()

  //open supplier info table details
  cy.contains('Database').click()
  cy.contains('SupplierInfo').click()

  // Click version control icon
  cy.get('[title="Click to open version control"]').click({timeout: 10000});

  //select version 0 and version 1 for comparision
 


  // Click compare button
  cy.contains('Open Comparison').click()

})

it('version comparison in version 1 and version 2 ', () => {

  

  //toggle view menu
  cy.get('.bpJfoD').click()

  //open supplier info table details
  cy.contains('Database').click()
  cy.contains('SupplierInfo').click()

  // Click version control icon
  cy.get('[title="Click to open version control"]').click({timeout: 10000});  
  //select version 0 for revert

})
})

  