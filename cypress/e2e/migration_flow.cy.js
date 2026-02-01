
describe('Login page tests', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }

  const flowName = 'cypress test flow'
  const flowDesc = 'This is a test automation flow description'
 
beforeEach(() => {
  cy.login(validUser.email, validUser.password)

  })
  
it('load the migration flows page', () => {
  cy.contains('Manage Flows').click()
          
  })

it('create new flows ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.get('button').contains('New').click()
  cy.get('#new-flow-name').type(flowName)
  cy.get('#new-flow-description').type(flowDesc)
  cy.get('button').contains('Create Flow').click()
  cy.contains(flowName).should('be.visible')
 })


it('search exsiting flows ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.get('input[placeholder="Search flows..."]')
    .clear()
    .type(flowName)
    .should('have.value', flowName)
   
  cy.contains(flowName).click()
})

it('open flow using flow name ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.contains(flowName).click()
  
  })

it ('Flow visibility button ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.contains('td', flowName)
    .parents('tr')
    .within(() => {
  cy.get('[title="Open flow designer"]').click()
    })
})
  
  
it ('edit flow ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.contains('td', flowName)
    .parents('tr')
    .within(() => {
  cy.get('[title="Edit flow details"]').click()
    })
  cy.get('#edit-flow-name').clear().type('cypress edit test flow')
  cy.get('#edit-flow-description').clear().type(' edit This is a test automation flow description')
  cy.get('button').contains('Save').click()
 
})
 
it ('Export flow ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.contains('td', 'cypress edit test flow')
    .parents('tr')
    .within(() => {
  cy.get('[title="Export flow"]').click()
    })
  cy.wait(2000)
  
})

it ('delete flow ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.contains('td', 'cypress edit test flow')
    .parents('tr')
    .within(() => {
  cy.get('[title="Delete flow "]').click()
    })
  cy.get('button').contains('Delete Flow').click()
  cy.get('button').contains('Confirm').click()
  cy.contains('cypress updated test flow').should('not.exist')
  })

it ('Import flow ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.get('button').contains('Import').click()
  const filePath = 'cypressImport_flow.json';
  cy.get('input[type="file"]').attachFile(filePath);
  cy.contains('Import').click()

}) 
}) 


   

    
   
   






   