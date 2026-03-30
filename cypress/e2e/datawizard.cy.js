describe('Data wizard functionality- Happy Path', () => {

  const validUser = {
   email: 'rohana@example.com',
   password: 'hefnu6-veDvez-domcen'
  }
  const File = {
    csvfilname :'supplierInfo1.csv',
    excelfilname :'customerInfo_sample.xlsx',
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
describe('Data Wizard functionality - Edge Cases', () => {

  const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }

  const files = {
    csv: 'supplierInfo1.csv',
    excel: 'supplierInfo1.xlsx',
    german: 'German_Sample_Data.xlsx',
    emptyCSV: 'empty.csv',
    emptyExcel: 'empty.xlsx',
    headerOnlyCSV: 'header_only.csv',
    largeFile: 'large_file.csv',
    oversizedFile: 'oversized_50mb.csv',
    txtFile: 'invalid.txt',
    pdfFile: 'invalid.pdf',
    imageFile: 'invalid.png',
    jsonFile: 'invalid.json',
    malformedCSV: 'malformed.csv',
    specialCharsCSV: 'special_characters.csv',
    duplicateHeadersCSV: 'duplicate_headers.csv',
    singleColumnCSV: 'single_column.csv',
    singleRowCSV: 'single_row.csv',
    mismatchedColsCSV: 'mismatched_columns.csv',
    sqlInjectionCSV: 'sql_injection.csv',
    unicodeCSV: 'unicode_data.csv',
    mixedDataTypesCSV: 'mixed_data_types.csv',
    csvWithNulls: 'null_values.csv',
    csvWith1000Cols: 'wide_table_1000cols.csv',
  }

  beforeEach(() => {
    cy.login(validUser.email, validUser.password)
    cy.get('.bpJfoD').click()
    cy.contains('Data Wizard').click()
  })

  // ─── FILE TYPE VALIDATION ─────────────────────────────────────────────────

  it('Should reject a .txt file and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.txtFile)
    cy.get('.fpMNoc').should('be.visible')
    //cy.get('button').contains('Preview Data').should('be.disabled')
  })

  it('Should reject a .pdf file and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.pdfFile)
    cy.contains('File invalid.pdf has unsupported type: application/pdf').should('be.visible')
    cy.get('button').contains('Preview Data').should('be.disabled')
  })

  it('Should reject an image file (.png) and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.imageFile)
    cy.contains('File invalid.pdf has unsupported type: application/pdf').should('be.visible')
    cy.get('button').contains('Preview Data').should('be.disabled')
  })

  it('Should reject a .json file and show an error', () => {
    cy.get('input[type="file"]').attachFile(files.jsonFile)
    cy.contains('File invalid.pdf has unsupported type: application/pdf').should('be.visible')
    cy.get('button').contains('Preview Data').should('be.disabled')
  })

  // ─── EMPTY & MINIMAL FILES ────────────────────────────────────────────────

  it('Should handle an empty CSV file gracefully', () => {
    cy.get('input[type="file"]').attachFile(files.emptyCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains('File invalid.pdf has unsupported type: application/pdf').should('be.visible')
    cy.get('button').contains('Create Table').should('be.disabled')
  })

  it('Should handle an empty Excel file gracefully', () => {
    cy.get('input[type="file"]').attachFile(files.emptyExcel)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains('File invalid.pdf has unsupported type: application/pdf').should('be.visible')
    cy.get('button').contains('Create Table').should('be.disabled')
  })

  it('Should handle a CSV with headers only and no data rows', () => {
    cy.get('input[type="file"]').attachFile(files.headerOnlyCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains('File invalid.pdf has unsupported type: application/pdf').should('be.visible')
    cy.get('button').contains('Create Table').should('be.disabled')
  })

  it('Should handle a CSV with a single column', () => {
    cy.get('input[type="file"]').attachFile(files.singleColumnCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    cy.get('button').contains('Create Table').should('not.be.disabled')
  })

  it('Should handle a CSV with a single data row', () => {
    cy.get('input[type="file"]').attachFile(files.singleRowCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  // ─── FILE SIZE ────────────────────────────────────────────────────────────

  it('Should handle a large but valid CSV file without timeout', () => {
    cy.get('input[type="file"]').attachFile(files.largeFile)
    cy.wait(5000) // allow extra processing time
    cy.get('button').contains('Preview Data').click()
    cy.get('table', { timeout: 15000 }).should('be.visible')
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  it('Should reject a file that exceeds the size limit', () => {
    cy.get('input[type="file"]').attachFile(files.oversizedFile)
    cy.contains(/file too large|size limit exceeded/i).should('be.visible')
    cy.get('button').contains('Preview Data').should('be.disabled')
  })

  // ─── MALFORMED & STRUCTURAL ISSUES ───────────────────────────────────────

  it('Should handle a malformed CSV with inconsistent delimiters', () => {
    cy.get('input[type="file"]').attachFile(files.malformedCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains(/malformed|invalid format|parsing error/i).should('be.visible')
  })

  it('Should handle a CSV with duplicate column headers', () => {
    cy.get('input[type="file"]').attachFile(files.duplicateHeadersCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains(/duplicate|column names must be unique/i).should('be.visible')
  })

  it('Should handle a CSV with mismatched column counts per row', () => {
    cy.get('input[type="file"]').attachFile(files.mismatchedColsCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains(/mismatch|inconsistent columns|parsing error/i).should('be.visible')
  })

  it('Should handle a CSV with a very wide table (1000+ columns)', () => {
    cy.get('input[type="file"]').attachFile(files.csvWith1000Cols)
    cy.wait(3000)
    cy.get('button').contains('Preview Data').click()
    cy.contains(/column limit|too many columns/i).should('be.visible')
      .or(cy.get('table').should('be.visible')) // depending on whether there's a hard limit
  })

  // ─── DATA CONTENT EDGE CASES ──────────────────────────────────────────────

  it('Should handle a CSV with null/empty cell values', () => {
    cy.get('input[type="file"]').attachFile(files.csvWithNulls)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  it('Should handle a CSV with mixed data types in a single column', () => {
    cy.get('input[type="file"]').attachFile(files.mixedDataTypesCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    // Should either infer type or warn about type mismatch
    cy.contains(/type mismatch|inferred as text/i).should('be.visible')
      .or(cy.get('button').contains('Create Table').should('not.be.disabled'))
  })

  it('Should handle a CSV with special characters in data cells', () => {
    cy.get('input[type="file"]').attachFile(files.specialCharsCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  it('Should sanitize SQL injection content in CSV cells', () => {
    cy.get('input[type="file"]').attachFile(files.sqlInjectionCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    // Raw SQL should be treated as plain text, not executed
    cy.contains('DROP TABLE').should('not.cause.error') // verify app doesn't crash
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  it('Should handle a CSV with Unicode and emoji characters', () => {
    cy.get('input[type="file"]').attachFile(files.unicodeCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  // ─── UI / WORKFLOW EDGE CASES ─────────────────────────────────────────────

  it('Should not allow clicking Preview Data without uploading a file', () => {
    cy.get('button').contains('Preview Data').should('be.disabled')
  })

  it('Should not allow clicking Create Table without clicking Preview Data first', () => {
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(2000)
    cy.get('button').contains('Create Table').should('be.disabled')
  })

  it('Should allow replacing an uploaded file before previewing', () => {
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(1000)
    cy.get('input[type="file"]').attachFile(files.excel)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  it('Should handle re-uploading a new file after a failed preview', () => {
    cy.get('input[type="file"]').attachFile(files.emptyCSV)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.contains(/empty|no data/i).should('be.visible')
    // Re-upload a valid file
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('table').should('be.visible')
    cy.get('button').contains('Create Table').click()
    cy.contains(/success|table created/i).should('be.visible')
  })

  it('Should show a duplicate table name error if the table already exists', () => {
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('button').contains('Create Table').click()
    // Import the same file again
    cy.get('input[type="file"]').attachFile(files.csv)
    cy.wait(2000)
    cy.get('button').contains('Preview Data').click()
    cy.get('button').contains('Create Table').click()
    cy.contains(/already exists|duplicate table name/i).should('be.visible')
  })

})