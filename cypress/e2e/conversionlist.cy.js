describe('Conversion List functionality', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }

  beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    //toggle view menu
    cy.get('.bpJfoD').click()    
    cy.contains('Conversion List').click()
  })
  
  it('Create conversion list', () => {
  cy.contains('New Conversion List').click()
  cy.get('input[placeholder="e.g. CurrencyConversions"]')
    .clear()
    .type('cypress_conversion_list1')
  cy.contains('button', 'Create').click() 

  })

  it('Add value to conversion list', () => {
  cy.contains('cypress_conversion_list1').click()
  cy.contains('Add Value').click()
  cy.get('input[placeholder="Old value"]')
    .clear()
    .type('ABC')
  cy.get('input[placeholder="New value"]')
    .clear()
    .type('XYZ')

  cy.get('#app button[title="Save"]').click();
  
  })

  it('Export conversion list', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Export').click()
    cy.get('button').contains('Export').click()
  })


  it('Import conversion list', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Import').click()
    const filePath = 'company_conversions.csv';
    cy.get('input[type="file"]').attachFile(filePath);
    cy.get('button').contains('Import').click()
  })
  
})
