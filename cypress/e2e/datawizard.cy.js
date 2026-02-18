describe('Data wizard functionality', () => {

  const validUser = {
   email: 'rohana@example.com',
   password: 'hefnu6-veDvez-domcen'
  }
  const File = {
    csvfilname :'supplierInfo1.csv',
    excelfilname :'supplierInfo1.xlsx',
    germanlanguagefilename :'German_Sample_Data.xlsx'

  }

beforeEach(() => {
  cy.login(validUser.email, validUser.password)
  cy.get('.bpJfoD').click()    
  cy.contains('Data Wizard').click()
    
})

it ('should load data wizard page and import csv file', () => {
  //load data wizard page
  cy.get('input[type="file"]').attachFile(File.csvfilname);
  cy.wait(2000) 
  cy.get('button').contains('Preview Data').click()
  cy.get('button').contains('Create Table').click() 
  
  })
  
it ('should load data wizard page and import exel file', () => {
  //load data wizard page
  cy.get('input[type="file"]').attachFile(File.excelfilname);
  cy.wait(2000) 
  cy.get('button').contains('Preview Data').click()
  cy.get('button').contains('Create Table').click()
})

it('Should load data wizard page and import Germon lauange file', () => {
  cy.get('input[type="file"]').attachFile(File.germanlanguagefilename);
  cy.wait(2000) 
  cy.get('button').contains('Preview Data').click()
  cy.get('button').contains('Create Table').click()
  
})
})