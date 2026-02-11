
import 'cypress-file-upload';

const tableSearch1 = '^SupplierInfo$'
const tableName = "SupplierInfo"
const placeholder = 'Search: ^start, end$, ^exact$, includes'

Cypress.Commands.add('login', (email,password) => {
  cy.visit('https://cypresstenant.tabletap.lk/pages/')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.contains('button', 'Sign in').click()
 
})

Cypress.Commands.add('migration_flow', () => {
cy.contains('Manage Flows').click()
cy.get('button').contains('New').click()
cy.get('#new-flow-name').type('test migration flow')
cy.get('#new-flow-description').type("test migration flow description")
cy.get('button').contains('Create Flow').click()

  
})

Cypress.Commands.add('Create_migration_flow', () => {
cy.contains('Manage Flows').click()
cy.get('button').contains('New').click()
cy.get('#new-flow-name').type("test table functionality flow")
cy.get('#new-flow-description').type("test table functionality flow description")
cy.get('button').contains('Create Flow').click()
cy.contains('Loading database...', { timeout: 60000 })
               .should('not.exist')
cy.get('[title="Reload tables from source"]').click()
cy.contains('Saving tables snapshot...', { timeout: 60000 })
  .should('not.exist')


cy.get('input[placeholder="' + placeholder + '"]')
  .type(tableSearch1 )

cy.contains(tableName).click()
cy.wait(2000)
cy.get('[title="Synchronize database"]').click()
cy.contains('Synchronizing database...', { timeout: 20000 })
  
cy.contains('Synchronizing database...', { timeout: 60000 })
  .should('not.exist')

 
  
})

Cypress.Commands.add('globalfilter', () => {
  cy.contains('Manage Flows').click()
  cy.contains('cypress globalfilter').click()
})

Cypress.Commands.add('migration', () => {
  cy.contains('Manage Flows').click()
  cy.contains('cypress migration').click()
  cy.wait(3000)
})
Cypress.Commands.add('navigateToConversionList', () => {
 cy.visit('https://cypress.tabletap.lk/pages/conversionList')

})
Cypress.Commands.add('navigateToDataWizard', () => {
  cy.visit('https://cypress.tabletap.lk/pages/dataWizard')
})
