describe('Version control functionality', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }

   beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.get('.bpJfoD').click()    
    cy.contains('Version control').click()
  })

    it ('should view version control functionality', () => {
        cy.get('[title="Version Control"]').click()
        
    })
    it ('should add version control in table ', () => {
       cy.get('[title="Version Control"]').click()
    })
})