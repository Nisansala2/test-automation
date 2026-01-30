
describe('Login page tests', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }
 
  beforeEach(() => {
   
    cy.login1(validUser.email, validUser.password)

  })
  
  describe("page load and navigate ", () => {
    it('should load the migration flows page', () => {
      cy.contains('Manage Flows').click()
          
    })

  it('should create new flows correct ', () => {
      cy.get('button').contains('Manage Flows').click()
      cy.get('button').contains('New').click()
      cy.get('#new-flow-name').type('TEST AUTOMATION FLOW12')
      cy.get('#new-flow-description').type('This is a test automation flow description')
      cy.get('button').contains('Create Flow').click()

    })

   it('create and search flows ', () => {

   cy.get('[style="background: rgb(255, 255, 255); color: rgb(0, 120, 212); font-weight: 600; border: none; padding: 10px 18px; border-radius: 4px; display: flex; align-items: center; gap: 8px; cursor: pointer;"]').click()
   cy.get('input[placeholder="Search flows..."]')
   .clear()
   .type(flowName)
   .should('have.value', flowName)
   //Give UI time to filter results
    cy.wait(500)

   cy.get('body').then(($body) => {
    // 🔎 IF flow exists in search results
  if ($body.text().includes(flowName)) {
    cy.contains(flowName).first().click()
  } 
  else {
    // ➕ ELSE create new flow

    // Open create flow modal
    cy.get(':nth-child(1) > .sc-dmqHEX > .sc-gjTGSA').click()

    // Wait for modal
    cy.contains('h3', 'New flow').should('be.visible')

    // Enter flow name & description
    cy.get('#new-flow-name').clear().type(flowName)
    cy.get('#new-flow-description').clear().type(flowDesc)

    // Create flow button
    cy.contains('button', 'Create Flow')
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  }
  
   })

  })  


   

    
   
   

  
  })


})

   