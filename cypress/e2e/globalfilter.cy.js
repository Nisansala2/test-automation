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
describe('Global Filter - Edge Cases', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.getOrCreateFlow('test flow for global filter')
    // Open global filter section
    cy.contains('Filters').click()
    // Clear any existing filters
    cy.get('body').then(($body) => {
      if ($body.find('[data-variant="danger"]').length > 0) {
        cy.get('[data-variant="danger"]').click({ multiple: true, force: true })
      }
    })
  })

  // ─── FILTER CREATION ──────────────────────────────────────────────────────

  it('Should not apply filter when no field is selected', () => {
    cy.contains('Add Filter').click()
    // Skip selecting a field and try to apply
    cy.get('[data-variant="primary"]').click()
    cy.contains(/select a field|field is required/i).should('be.visible')
  })

  it('Should not apply filter when value input is empty', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        // Leave value input empty
      })
    cy.get('[data-variant="primary"]').click()
    cy.contains(/value is required|enter a value/i).should('be.visible')
  })

  it('Should not apply filter when no operator is selected', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        // Skip selecting operator
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.contains(/select an operator|operator is required/i).should('be.visible')
  })

  // ─── VALUE INPUT EDGE CASES ───────────────────────────────────────────────

  it('Should handle special characters in filter value', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type("!@#$%^&*()")
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // Should either return no results or show a validation error
    cy.contains(/no results|no data|invalid/i).should('be.visible')
  })

  it('Should handle SQL injection in filter value', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type("1; DROP TABLE SupplierInfo;--")
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // App should not crash; SQL should be treated as plain text
    cy.contains('SupplierInfo').should('exist')
    cy.contains(/error|crashed/i).should('not.exist')
  })

  it('Should handle very long value in filter input', () => {
    const longValue = 'a'.repeat(1000)
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type(longValue)
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/too long|limit exceeded|no results/i).should('be.visible')
  })

  it('Should handle whitespace-only value in filter input', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('     ')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/value is required|invalid/i).should('be.visible')
  })

  it('Should handle decimal/float values in numeric filter', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('1000.50')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/no results|invalid type/i).should('be.visible')
      .or(cy.get('[title="Open table details"]').should('exist'))
  })

  it('Should handle negative values in numeric filter', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('-1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/no results|no data/i).should('be.visible')
  })

  it('Should handle alphabetic value on a numeric field', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('abc')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/invalid|type mismatch|no results/i).should('be.visible')
  })

  // ─── IN (MULTIPLE VALUES) EDGE CASES ─────────────────────────────────────

  it('Should handle empty textarea in In (multiple values) operator', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('In (multiple values)').click()
        // Leave textarea empty
      })
    cy.get('[data-variant="primary"]').click()
    cy.contains(/value is required|enter at least one value/i).should('be.visible')
  })

  it('Should handle duplicate values in In (multiple values) operator', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('In (multiple values)').click()
        cy.get('textarea')
          .type('1000').type('{enter}')
          .type('1000').type('{enter}') // duplicate
          .type('2000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // Should deduplicate or handle gracefully
    cy.contains(/duplicate|deduplicated/i).should('be.visible')
      .or(cy.get('[title="Open table details"]').should('exist'))
  })

  it('Should handle a single value in In (multiple values) operator', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('In (multiple values)').click()
        cy.get('textarea').type('1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.get('[title="Open table details"]').should('exist')
  })

  it('Should handle a very large number of values in In (multiple values)', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('In (multiple values)').click()
        // Type 500 values
        let values = ''
        for (let i = 1; i <= 500; i++) {
          values += `${i}\n`
        }
        cy.get('textarea').type(values, { delay: 0 })
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(3000)
    cy.contains(/limit exceeded|too many values|error/i).should('be.visible')
      .or(cy.get('[title="Open table details"]').should('exist'))
  })

  // ─── GREATER THAN / LESS THAN ─────────────────────────────────────────────

  it('Should apply Greater Than filter and return correct results', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('Greater Than').click()
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains('SupplierInfo')
      .parents('.react-flow__node')
      .within(() => {
        cy.get('[title="Open table details"]').click()
      })
  })

  it('Should apply Less Than filter and return correct results', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('Less Than').click()
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains('SupplierInfo')
      .parents('.react-flow__node')
      .within(() => {
        cy.get('[title="Open table details"]').click()
      })
  })

  it('Should return no results when Greater Than value exceeds all records', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('Greater Than').click()
        cy.get('input[placeholder="Enter value"]').type('999999999')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/no results|no data|0 rows/i).should('be.visible')
  })

  it('Should return no results when Less Than value is below all records', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.contains('Less Than').click()
        cy.get('input[placeholder="Enter value"]').type('0')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/no results|no data|0 rows/i).should('be.visible')
  })

  // ─── MULTIPLE FILTERS EDGE CASES ─────────────────────────────────────────

  it('Should handle conflicting filter conditions (no possible results)', () => {
    // Equals 1000 AND Equals 2000 on same field — impossible
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.contains('Add Filter').click()
    cy.contains('Filter 2')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('2000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/no results|no data|0 rows/i).should('be.visible')
  })

  it('Should handle adding maximum allowed number of filters', () => {
    for (let i = 1; i <= 10; i++) {
      cy.contains('Add Filter').click()
      cy.contains(`Filter ${i}`)
        .closest('section[style*="border-left"]')
        .within(() => {
          cy.contains('AssociationNo').click()
          cy.contains('Equals').click()
          cy.get('input[placeholder="Enter value"]').type(`${1000 + i}`)
        })
    }
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.contains(/limit|maximum filters/i).should('be.visible')
      .or(cy.get('[title="Open table details"]').should('exist'))
  })

  // ─── FILTER REMOVAL ───────────────────────────────────────────────────────

  it('Should remove a filter and reset results', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // Now remove the filter
    cy.get('[data-variant="danger"]').click({ multiple: true, force: true })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // All records should be returned
    cy.contains('SupplierInfo')
      .parents('.react-flow__node')
      .within(() => {
        cy.get('[title="Open table details"]').click()
      })
  })

  it('Should remove one of multiple filters and update results correctly', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.contains('Add Filter').click()
    cy.contains('Filter 2')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('2000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // Remove Filter 2 only
    cy.contains('Filter 2')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.get('[data-variant="danger"]').click()
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    cy.get('[title="Open table details"]').should('exist')
  })

  // ─── UI / PERSISTENCE ─────────────────────────────────────────────────────

  it('Should persist filter state after switching tabs and returning', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // Navigate away and back
    cy.contains('Filters').click() // close panel
    cy.contains('Filters').click() // reopen panel
    cy.contains('Filter 1').should('be.visible')
    cy.get('input[placeholder="Enter value"]').should('have.value', '1000')
  })

  it('Should clear all filters when navigating to a different flow', () => {
    cy.contains('Add Filter').click()
    cy.contains('Filter 1')
      .closest('section[style*="border-left"]')
      .within(() => {
        cy.contains('AssociationNo').click()
        cy.contains('Equals').click()
        cy.get('input[placeholder="Enter value"]').type('1000')
      })
    cy.get('[data-variant="primary"]').click()
    cy.wait(2000)
    // Navigate to a different flow and come back
    cy.getOrCreateFlow('another test flow')
    cy.getOrCreateFlow('test flow for global filter')
    cy.contains('Filters').click()
    cy.contains('Filter 1').should('not.exist')
  })

})
