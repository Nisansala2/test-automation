describe('Login page tests', () => {

  const validUser = {
    email: 'nisansala@example.com',
    password: '123456'
  }
 
  beforeEach(() => {
    cy.visit('https://tabletap.lk/admin/pages')

    cy.login(validUser.email, validUser.password)

  })
    describe("page load and navigate ", () => {
    it('should load the migration flows page', () => {
      
      cy.get('[style="background: rgb(250, 249, 248); min-height: 100vh; padding: 24px;"]').should('be.visible')
      cy.get('.bpJfoD').click()
      cy.get('.fhxSOB > .sc-jOQpHc > ul > :nth-child(3) > .sc-eZYOHW > .sc-iCmkLe').click()
      cy.get('[data-id="42"] > .cRYeRf > [data-testid="property-list-name"]').click()
      cy.get('[data-testid="action-viewAccount"]').click()
     

    })


    })
})