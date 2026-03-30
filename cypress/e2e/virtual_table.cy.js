describe('Conversion List functionality- Happy Path', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }
beforeEach(() => {
  cy.login(validUser.email, validUser.password)   
  cy.visit('https://company.old.tabletap.lk/pages/virtualTables')  

})

it('Should create virtual table', () => {
    //create new virtual table
    cy.contains('New Virtual Table').click()

    //enter name and description
    cy.get('input[placeholder="e.g. MergedCustomers"]').type('cypress_virtual_table')
    cy.get('textarea[placeholder="e.g. Joins customers with addresses"]').type('This is a virtual table created by Cypress')

    //Add SQL query
    const sqlQuery = `SELECT * FROM "SupplierInfo";`
    const searchPlaceholder = `"SELECT a."id" AS "Supplier_ID", a."name", b."value" From "table_a" a JOIN "table_b" b ON a."id" = b."fk_id" `

    cy.get(`textarea[placeholder= "${searchPlaceholder}"]`).type(sqlQuery)

    cy.contains('button', 'Preview').click()

})

})