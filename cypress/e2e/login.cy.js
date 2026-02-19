describe('Login functionality', () => {

beforeEach(() => {
   cy.visit("https://test.tabletap.lk");
  });
 

it ('Log in with valid credentials', () => {
 
  cy.get('input[name="email"]').type('rohana@example.com')
  cy.get('input[name="password"]').type('hefnu6-veDvez-domcen')
  cy.contains("button", "Sign in").click();
})

it('Log in with invalid credentials', () => {
  
  cy.get('#email').type('rohana@example.com')
  cy.get('#password').type('Password123')
  cy.contains("button", "Sign in").click();
  cy.contains('Dashboard').should('be.visible')
})

it('Log in with empty fields', () => {
  cy.contains("button", "Sign in").click();
  cy.contains('Please fill out this field').should('be.visible')
  
})
it('Log in with invalid email format', () => {
  
cy.get('#email').type('invalid-email')
cy.get('#password').type('Password123')
cy.contains("button", "Sign in").click();
cy.contains("Please include an '@' in the email address.'tt' is missing an '@'").should('be.visible')
})

it('Log in with short password', () => {
cy.get('#email').type('test@gmail.com')
cy.get('#password').type('123')
cy.contains("button", "Sign in").click();
cy.contains('Password must be at least 8 characters').should('be.visible')
})

it('Maximum Length (Boundary Testing)', () => {
const longEmail = 'a'.repeat(256) + '@gmail.com'
cy.get('#email').type(longEmail)
cy.get('#password').type('Password123')
cy.contains("button", "Sign in").click();
cy.contains('Email too long').should('be.visible')
})


})