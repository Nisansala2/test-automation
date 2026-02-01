describe('Data wizard functionality', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }
  const File = {
    filname :'supplierInfo1.csv'

  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
  cy.get('.bpJfoD').click()    
  cy.contains('Data Wizard').click()
    
})

it ('should load data wizard page', () => {
  cy.get('input[type="file"]').attachFile(File.filname);
  cy.wait(2000) 
  cy.get('button').contains('Preview Data').click()
  cy.get('button').contains('Create Table').click() 
  
  })

  
})