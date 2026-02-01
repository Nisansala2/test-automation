describe('table functionality ', () => {
  const flow ={
   flowName :'cypress test flow',
   flowDesc :'this is a cypress test flow description',
   tableSearch :'company'
  }

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
  cy.migration_flow() 
  cy.contains('Supplier')                       
          .find('button')                     
          .first()
          .click();
  cy.wait(2000)    
  })
   
it ('should add filter ', () => {
  cy.get('[title="Show filters"] > .sc-gjTGSA').click()
   // 3️⃣ Type company name into Company filter input
  cy.get('input[placeholder="Filter Supplier"]')
      .clear()
      .type('10000')
  cy.contains('button', 'Apply Filter').click()
      .should ('be.visible')
  cy.get('[title="Show filters (1 active)"]').click()
  cy.contains('button', 'Clear all filters').click()
                
  })

it ('should add record in table ', () => {
  //cy.get('[style="width: max-content; position: relative;"] > .sc-hLseeU').click()
  cy.contains('Add').click()
  cy.contains('New Record').click()
  })

it ('shoulld view visibility ', () => {
  cy.get('[title="Column visibility"]').click()
     .should('be.visible')
  cy.wait(20000)
  cy.contains('Cancel').click()
   })
   
it ('should map columns in table ', () => {
  cy.get('[title="Entity Mapper"]').click()
    .should("be.visible")
  })

it ('should download table data ', () => {
  cy.get('[title="Download from source"]').click()
  })
it ('should upload table data ', () => {
  })

it ('should import table data ', () => {
  cy.get('[title="Import Data"]').click()
    const filname2 = 'SupplierAddress.csv';
  cy.get('input[type="file"]').attachFile(filname2);
  cy.contains('button', 'Start Import')
    .click({timeout:40000})
    .should("be.visible")
  cy.contains('button', 'Close')
})

it ('should export table data ', () => {
  cy.get('[title="Export Data"]').click()

})

it ('should delete record in table ', () => {
    })

 })