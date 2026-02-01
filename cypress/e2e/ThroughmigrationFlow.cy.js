describe('through the tenant tests', () => {

const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }
    
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

it('should search table  ', () => {
  const tableSearch1 = '^SupplierAddress$'
  const tableSearch2 = '^SupplierInfo$'
  const placeholder = 'Search: ^start, end$, ^exact$, includes'
  cy.migration_flow()
  cy.get('input[placeholder="' + placeholder + '"]')
    .type(tableSearch1 )
  cy.contains('Supplier').click()
  cy.wait(2000)
             
  })

   
it('should synchronize ,Download and migrate database ', () => {
  
  cy.migration_flow()
  
  cy.get('[title="Synchronize database"]').click()
  cy.contains('Synchronizing database...', { timeout: 20000 })
  
  cy.contains('Synchronizing database...', { timeout: 60000 })
    .should('not.exist')

  cy.contains('SupplierAddress')
    .parents('.react-flow__node')
    .within(() => {
    
  cy.get('[title="Download data from source database"]' ,{timeout:6000 }).click()
    .should('be.visible')
    .and('not.be.disabled')
    .click()
 
  cy.get('[title="Start migration Upload data to destination database"]').click()
    .should('be.enabled')
    })
  cy.get('[title="Save current configuration"] > .sc-kFuwaP').click()

})


it(' sholud show logs in table ', () => {
  
  cy.migration_flow()       
  cy.get('[title="View download and migration logs for this table"]').click()
  cy.wait(5000)
  cy.get(':nth-child(2) > .dMqmKY').click() 
  
})

it(' sholud save current configration ', () => {
  cy.migration_flow()
    
  });
   

 })


 
   



