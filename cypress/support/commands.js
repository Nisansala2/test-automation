
import 'cypress-file-upload';

Cypress.Commands.add('login', (email,password) => {
  cy.visit('https://cypress.tabletap.lk/login')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.contains('button', 'Sign in').click()
 
})

Cypress.Commands.add('migration_flow', () => {
cy.contains('Manage Flows').click()
cy.contains('cypress test').click()



   
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
