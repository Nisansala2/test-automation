describe('Conversion List functionality- Happy Path', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  const listName = 'cypress_conversion_list1'
  const filePath = 'company_conversions.csv';

const openOrCreateConversionList = (name) => {
    const findAndOpen = (attemptsLeft = 4) => {
      cy.get('body').then(($body) => {
        const existingItem = $body
          .find('*')
          .toArray()
          .find((el) => el.textContent && el.textContent.trim() === name)

        if (existingItem) {
          cy.wrap(existingItem).click()
          return
        }

        if (attemptsLeft > 0) {
          cy.wait(500)
          findAndOpen(attemptsLeft - 1)
          return
        }

        cy.contains('New Conversion List').click()
        cy.get('input[placeholder="e.g. CurrencyConversions"]').clear().type(name)
        cy.contains('button', 'Create').click()
        cy.wait(6000) // Wait for the list to be created and appear in the DOM
      })
    }

    findAndOpen()
}
  
  beforeEach(() => {
  cy.login(validUser.email, validUser.password)
          
  //toggle view menu
  cy.get('.bpJfoD').click() 

  cy.contains('Conversion List').click()
  
    
  });
  
  it('Create, Add values, export conversion list', () => {

  openOrCreateConversionList(listName)

  cy.contains(listName).should('be.visible')
  cy.wait(2000)

  cy.contains(listName).click()
  cy.contains('Add Value').click()
  cy.get('input[placeholder="Old value"]')
    .clear()
    .type('ABC')
  cy.get('input[placeholder="New value"]')
    .clear()
    .type('XYZ')

  cy.get('#app button[title="Save"]').click();
  
    cy.contains(listName).click()
    cy.contains('Export').click()
    cy.get('button').contains('Export').click()
  })


  it('Import conversion list', () => {
    cy.contains(listName).click()
    cy.contains('Import').click()
    const filePath = 'company_conversions.csv';
    cy.get('input[type="file"]').attachFile(filePath);
    cy.get('button').contains('Import').click()
  })

  it('Delete conversion list', () => {
    cy.contains(listName).click()
    cy.get('[title="Delete conversion list"]').click()
    cy.get('button').contains('Confirm deletion').click()
  })
  
})


describe('Conversion List - Edge Cases', () => {
  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.get('.bpJfoD').click()
    cy.contains('Conversion List').click()
  })

  // ─── CREATE ───────────────────────────────────────────────────────────────

  it('Should not create a conversion list with an empty name', () => {
    cy.contains('New Conversion List').click()
    cy.get('input[placeholder="e.g. CurrencyConversions"]').clear()
    cy.contains('button', 'Create').click({force: true})
    cy.contains('button', 'Create').should('be.disabled')
   
  })

  it('Should not create a duplicate conversion list name', () => {
    cy.contains('New Conversion List').click()
    cy.get('input[placeholder="e.g. CurrencyConversions"]')
      .clear()
      .type('cypress_conversion_list1')
    cy.contains('button', 'Create').click()
    cy.contains(/already exists|duplicate/i).should('be.visible')
  })

  it('Should not create a conversion list with only whitespace', () => {
    cy.contains('New Conversion List').click()
    cy.get('input[placeholder="e.g. CurrencyConversions"]')
      .clear()
      .type('     ')
    cy.contains('button', 'Create').click({force: true})
    
  })

  it('Should handle a very long conversion list name', () => {
    const longName = 'a'.repeat(256)
    cy.contains('New Conversion List').click()
    cy.get('input[placeholder="e.g. CurrencyConversions"]')
      .clear()
      .type(longName)
    cy.contains('button', 'Create').click()
    
  })

  it('Should handle special characters in conversion list name', () => {
    cy.contains('New Conversion List').click()
    cy.get('input[placeholder="e.g. CurrencyConversions"]')
      .clear()
      .type('list!@#$%^&*()')
    cy.contains('button', 'Create').click()
    // Adjust assertion based on whether special chars are allowed or not
    cy.contains(/invalid|special characters/i).should('be.visible')
  })

  // ─── ADD VALUE ────────────────────────────────────────────────────────────

  it('Should not save a value entry with empty Old value', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Add Value').click()
    cy.get('input[placeholder="New value"]').clear().type('XYZ')
    cy.get('#app button[title="Save"]').click()
    cy.contains(/old value is required|cannot be empty/i).should('be.visible')
  })

  it('Should not save a value entry with empty New value', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Add Value').click()
    cy.get('input[placeholder="Old value"]').clear().type('ABC')
    cy.get('#app button[title="Save"]').click()
    cy.contains(/new value is required|cannot be empty/i).should('be.visible')
  })

  it('Should not save a duplicate Old value in the same list', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Add Value').click()
    cy.get('input[placeholder="Old value"]').clear().type('ABC')
    cy.get('input[placeholder="New value"]').clear().type('DEF')
    cy.get('#app button[title="Save"]').click()
    // Add duplicate
    cy.contains('Add Value').click()
    cy.get('input[placeholder="Old value"]').clear().type('ABC')
    cy.get('input[placeholder="New value"]').clear().type('GHI')
    cy.get('#app button[title="Save"]').click()
    cy.contains(/duplicate|already exists/i).should('be.visible')
  })

  it('Should handle special characters in Old and New values', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Add Value').click()
    cy.get('input[placeholder="Old value"]').clear().type('<script>alert(1)</script>')
    cy.get('input[placeholder="New value"]').clear().type('safe_value')
    cy.get('#app button[title="Save"]').click()
    // Should either sanitize or reject — no raw script should render
    cy.get('script').should('not.exist')
  })

  it('Should handle very long Old and New values', () => {
    const longValue = 'x'.repeat(1000)
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Add Value').click()
    cy.get('input[placeholder="Old value"]').clear().type(longValue)
    cy.get('input[placeholder="New value"]').clear().type(longValue)
    cy.get('#app button[title="Save"]').click()
    cy.contains(/too long|limit exceeded/i).should('be.visible')
  })

  // ─── IMPORT ───────────────────────────────────────────────────────────────

  it('Should reject import of a non-CSV file', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Import').click()
    cy.get('input[type="file"]').attachFile('invalid_file.txt')
    cy.get('button').contains('Import').click()
    cy.contains(/invalid file|must be csv/i).should('be.visible')
  })

  it('Should reject import of an empty CSV file', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Import').click()
    cy.get('input[type="file"]').attachFile('empty.csv')
    cy.get('button').contains('Import').click()
    cy.contains(/empty|no data/i).should('be.visible')
  })

  it('Should reject a malformed CSV missing required columns', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Import').click()
    cy.get('input[type="file"]').attachFile('malformed_conversions.csv')
    cy.get('button').contains('Import').click()
    cy.contains(/invalid format|missing column/i).should('be.visible')
  })

  it('Should reject an oversized CSV file', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.contains('Import').click()
    cy.get('input[type="file"]').attachFile('oversized_conversions.csv')
    cy.get('button').contains('Import').click()
    cy.contains(/file too large|size limit/i).should('be.visible')
  })

  // ─── DELETE ───────────────────────────────────────────────────────────────

  it('Should cancel deletion and keep the conversion list intact', () => {
    cy.contains('cypress_conversion_list1').click()
    cy.get('[title="Delete conversion list"]').click()
    cy.contains('button', 'Cancel').click()
    cy.contains('cypress_conversion_list1').should('be.visible')
  })

  it('Should not be able to delete a non-existent conversion list', () => {
    // Simulates navigating directly to a deleted/invalid list
    cy.visit('/conversion-list/non-existent-id')
    cy.contains(/not found|does not exist/i).should('be.visible')
  })

  // ─── EXPORT ───────────────────────────────────────────────────────────────

  it('Should export an empty conversion list without error', () => {
    cy.contains('New Conversion List').click()
    cy.get('input[placeholder="e.g. CurrencyConversions"]')
      .clear()
      .type('empty_export_list')
    cy.contains('button', 'Create').click()
    cy.contains('empty_export_list').click()
    cy.contains('Export').click()
    cy.get('button').contains('Export').click()
    // Assert file downloaded or no error shown
    cy.contains(/error/i).should('not.exist')
  })
})
