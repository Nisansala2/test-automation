describe('through the tenant tests', () => {

  const validUser = {
   email: 'rohana@example.com',
   password: 'hefnu6-veDvez-domcen'
    }
   
beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.getOrCreateFlow('test flow for global filter')
  
})

it (' add equal and verify global filter  ', () => {

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
  cy.wait(2000)

  // Click synchronize database and wait for popup to close
  cy.get('[title="Synchronize database"]').click()
  cy.contains('Synchronizing database...', { timeout: 20000 })
  
  cy.contains('Synchronizing database...', { timeout: 60000 })
    .should('not.exist')

    
  // Open global filter section
  cy.contains('Filters').click()
 
  // Click on add filter button
  cy.contains('Add Filter').click()

  cy.contains('Filter 1')
  .closest('section[style*="border-left"]')
  .within(() => {

  // Select field dropdown
  cy.contains('AssociationNo').click()
  cy.contains('Equals').click()
  cy.get('input[placeholder="Enter value"]').type("1000");
  })
  //apply filter condition
  cy.get('[data-variant="primary"]').click()
  cy.wait(2000)

  //verify the applied filter condition
   cy.contains('SupplierInfo')
    .parents('.react-flow__node')
    .within(() => {
   cy.get('[title="Open table details"]').click();

    })
  
  
})

it (' add notequal in global filter  ', () => {

   
    // Open global filter section
  cy.contains('Filters').click()

   //remove existing filter condition if exists
  cy.get('[data-variant="danger"]').click({ multiple: true, force: true })
 
  // Click on add filter button
  cy.contains('Add Filter').click()

  cy.contains('Filter 1')
  .closest('section[style*="border-left"]')
  .within(() => {

  // Select field dropdown
  cy.contains('AssociationNo').click()
  //open operator dropdown 
  cy.contains('Equals').click()
  //select not equal operator
  cy.contains('Not Equals').click()
  cy.get('input[placeholder="Enter value"]').type("1000");
  })
  //apply filter condition
  cy.get('[data-variant="primary"]').click()
  cy.wait(2000)

  //verify the applied filter condition
   cy.contains('SupplierInfo')
    .parents('.react-flow__node')
    .within(() => {
   cy.get('[title="Open table details"]').click();
    })

  
   
})
it (' add in(multiple value) in global filter  ', () => {

  // Open global filter section
  cy.contains('Filters').click()

   //remove existing filter condition if exists
  cy.get('[data-variant="danger"]').click({ multiple: true, force: true })
 
  // Click on add filter button
  cy.contains('Add Filter').click()

  cy.contains('Filter 1')
  .closest('section[style*="border-left"]')
  .within(() => {

  // Select field dropdown
  cy.contains('AssociationNo').click()
  //open operator dropdown 
  cy.contains('Equals').click()
  //select in(multiple value) operator
  cy.contains('In (multiple values)').click()
  cy.get('textarea').type("1000").type("{enter}").type("2000").type("{enter}").type("3000");
  
  })
  //apply filter condition
  cy.get('[data-variant="primary"]').click()
  cy.wait(2000)

  //verify the applied filter condition
   cy.contains('SupplierInfo')
    .parents('.react-flow__node')
    .within(() => {
   cy.get('[title="Open table details"]').click();
    })


})

it (' add contains in global filter  ', () => {
  // Open global filter section
  cy.contains('Filters').click()

   //remove existing filter condition if exists
  cy.get('[data-variant="danger"]').click({ multiple: true, force: true })
 
  // Click on add filter button
  cy.contains('Add Filter').click()

  cy.contains('Filter 1')
  .closest('section[style*="border-left"]')
  .within(() => {

  // Select field dropdown
  cy.contains('AssociationNo').click()
  //open operator dropdown 
  cy.contains('Equals').click()
  //select Contains operator
  cy.contains('Contains').click()
  cy.get('input[placeholder="Enter value"]').type("1000");
  
  })
  //apply filter condition
  cy.get('[data-variant="primary"]').click()
  cy.wait(2000)

  //verify the applied filter condition
   cy.contains('SupplierInfo')
    .parents('.react-flow__node')
    .within(() => {
   cy.get('[title="Open table details"]').click();
    })

})

it (' add multiple filter in same time at global filter  ', () => {
  // Open global filter section
  cy.contains('Filters').click()

   //remove existing filter condition if exists
  cy.get('[data-variant="danger"]').click({ multiple: true, force: true })
 
  // Click on add filter button
  cy.contains('Add Filter').click()

  cy.contains('Filter 1')
  .closest('section[style*="border-left"]')
  .within(() => {

  // Select field dropdown
  cy.contains('AssociationNo').click()
  //open operator dropdown 
  cy.contains('Equals').click()
  //select Contains operator
  cy.contains('Contains').click()
  cy.get('input[placeholder="Enter value"]').type("1000");
  
  })

   // Click on add filter button
  cy.contains('Add Filter').click()
   cy.contains('Filter 2')
  .closest('section[style*="border-left"]')
  .within(() => {

  // Select operator dropdown
  cy.contains('AssociationNo').click()
 
  //select field
  cy.contains('B2bSupplier').click()
  //open operator dropdown 
  cy.contains('Equals').click()
 
  cy.get('input[placeholder="Enter value"]').type("1000");
  
  })


  //apply filter condition
  cy.get('[data-variant="primary"]').click()
  cy.wait(2000)

  //verify the applied filter condition
   cy.contains('SupplierInfo')
    .parents('.react-flow__node')
    .within(() => {
   cy.get('[title="Open table details"]').click();
    })
  

})

it (' add greater than in global filter  ', () => {

})
it (' add less than in global filter  ', () => {

})


})
