describe('through the tenant tests', () => {

const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

const flowname = 'test migration flow'

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
    
   })

it('Reload tables in migrate data ', () => {  
  cy.migration_flow()
  cy.contains('Loading database...', { timeout: 60000 })
    .should('not.exist')
  cy.get('[title="Reload tables from source"]').click()
  cy.wait(1000) 

  })

it(' search table  ', () => {
  const tableSearch1 = '^SupplierAddress$'
  const tableSearch2 = '^SupplierInfo$'
  const placeholder = 'Search: ^start, end$, ^exact$, includes'
  cy.contains('Manage Flows').click()
  cy.contains(flowname).click()
  cy.get('input[placeholder="' + placeholder + '"]')
    .type(tableSearch1 )
  cy.contains('Supplier').click()
  cy.wait(2000)
             
  })

   
it('synchronize  database ', () => {
  
  cy.contains('Manage Flows').click()
  cy.contains(flowname).click()
  
  cy.get('[title="Synchronize database"]').click()
  cy.contains('Synchronizing database...', { timeout: 20000 })
  
  cy.contains('Synchronizing database...', { timeout: 60000 })
    .should('not.exist')


   cy.contains('SupplierAddress')
    .parents('.react-flow__node')
    .within(() => {

       
const downloadBtn = '[title="Download data from source database"]'
const migrateBtn = '[title="Start migration Upload data to destination database"]'

// Click Download
cy.get(downloadBtn).click()

// Wait until download button UI changes (success)
cy.get(downloadBtn, { timeout: 60000 })
   .should('be.enabled')  // or changed state

// Click Migrate AFTER download finishes
cy.get(migrateBtn).click()
cy.get(migrateBtn, { timeout: 60000 })
   .should('be.enabled')  // or changed state

 cy.get('[title="View download and migration logs for this table"]').click()
  cy.wait(5000)

    })



 cy.get('[title="Save current configuration"]').click()
  cy.contains('Saving Flow...', { timeout: 60000 })
    .should('not.exist')


  
  
 


 }) 

   
it(' sholud show logs in table ', () => {
  
  cy.migration_flow()       
 
  cy.get(':nth-child(2) > .dMqmKY').click() 
  
})

it(' sholud save current configration ', () => {
  cy.migration_flow()
    
  })

})
   

 



 
   



