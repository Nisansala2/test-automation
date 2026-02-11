describe('Version control functionality', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }

   beforeEach(() => {
    cy.login(validUser.email, validUser.password)
         
  })
  it('navigate to version control', () => {
     //toggle view menu
    cy.get('.bpJfoD').click()  
    cy.contains('Database').click()
    cy.contains('AbcClass').click()
    cy.get('[style="gap: 10px;"] > .oahQK > .sc-dmqHEX').click()
    cy.contains('Create Version').click() 
    
  })

  it('Open version comperision', () => {
     //toggle view menu
    cy.get('.bpJfoD').click()  
    cy.contains('Database').click()
    cy.contains('AbcClass').click()
    cy.get('[style="gap: 10px;"] > .oahQK > .sc-dmqHEX').click()
   cy.contains('Version A')
     .parent()
     .find('select')
     .select('v3 - Version 3')


  

    cy.contains('Open Comparison').click()

    
  })


  it ('should view version control functionality', () => {
     cy.Create_migration_flow()

    cy.contains('AbcClass')
      .parents('.react-flow__node')
      .within(() => {
      
    cy.get('[title="Open table details"]').click()
    cy.get('button[aria-label="Version Control"]').click()
     //toggle view menu
    cy.get('.bpJfoD').click()  
    cy.contains('Migration flows').click()
    cy.contains('td', 'test migration flow')
      .parents('tr')
      .within(() => {
   cy.get('[title="Delete flow"]').click()
    })
   
        
    })
    it ('should add version control in table ', () => {
       cy.get('[title="Version Control"]').click()
    })
  })
})