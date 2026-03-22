describe('Login page tests', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  const validtenant ={
    name: 'cypress test automation',
    schema: 'cypresstenant',
    key: 'cypresstenant'
  }
 
  beforeEach(() => {

  cy.visit('https://old.tabletap.lk/')
  cy.get('input[type="email"]').type(validUser.email)
  cy.get('input[type="password"]').type(validUser.password)
  cy.contains('button', 'Sign in').click()

  })
  
it('create tenant ', () => {
  cy.get('.bpJfoD').click()    
  cy.contains('Companies').click()
  cy.contains('Create new').click()
  cy.get('input[name="name"]').type(validtenant.name)
  cy.get('input[name="schema"]').type(validtenant.schema)
  cy.get('input[name="key"]').type(validtenant.key)
  cy.get('button').contains('Create').click()
  cy.contains('cypress test automation').click()
  cy.contains('View Account').click()
     
  })

})    
