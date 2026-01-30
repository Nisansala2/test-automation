describe('Data wizard functionality', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }

   beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.navigateToDataWizard()
    
  })

  it ('should load data wizard page', () => {
    const filname = 'book2.csv';

  cy.get('input[type="file"]').attachFile(filname);
  cy.wait(2000)

  

  cy.get('button').contains('Preview Data').click()
  cy.get('button').contains('Create Table').click() 
  
  })

  
})