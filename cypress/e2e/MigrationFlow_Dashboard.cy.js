
describe('Migration Flow Dashboard - Happy path ', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'

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
  cy.get('[title="Delete flow"]').click()
    })
   })

it ('Import flow ', () => {
  cy.get('button').contains('Manage Flows').click()
  cy.get('button').contains('Import').click()
  const filePath = 'cypressImport_flow.json';
  cy.get('input[type="file"]').attachFile(filePath);
  //cy.get('button').contains('Import Flow').click() cover so temporyily use this 
  cy.get('[style="background: rgb(0, 120, 212); color: rgb(255, 255, 255); border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; opacity: 1; font-size: 14px; font-weight: 600; line-height: 1.5; min-width: 100px; display: flex; align-items: center; justify-content: center; gap: 6px;"]').click()

}) 
}) 

describe('Migration Flow - Edge Cases', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  const flowname = 'test migration flow'

  beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.getOrCreateFlow(flowname)
  })

  // ─── FLOW CREATION EDGE CASES ─────────────────────────────────────────────

  it('Should not create a flow with an empty name', () => {
    cy.contains('New Flow').click()
    cy.get('input[placeholder*="flow name"]').clear()
    cy.contains('button', 'Create').click()
    cy.contains(/name is required|cannot be empty/i).should('be.visible')
  })

  it('Should not create a duplicate flow name', () => {
    cy.contains('New Flow').click()
    cy.get('input[placeholder*="flow name"]').clear().type(flowname)
    cy.contains('button', 'Create').click()
    cy.contains(/already exists|duplicate/i).should('be.visible')
  })

  it('Should not create a flow with only whitespace as name', () => {
    cy.contains('New Flow').click()
    cy.get('input[placeholder*="flow name"]').clear().type('     ')
    cy.contains('button', 'Create').click()
    cy.contains(/invalid|cannot be empty/i).should('be.visible')
  })

  it('Should not create a flow with special characters in name', () => {
    cy.contains('New Flow').click()
    cy.get('input[placeholder*="flow name"]').clear().type('flow!@#$%')
    cy.contains('button', 'Create').click()
    cy.contains(/invalid|special characters not allowed/i).should('be.visible')
  })
})


   

    
   
   






   