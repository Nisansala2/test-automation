describe('Setting page tests', () => {
const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }
 const sourcecardinatilies ={
     source_url :'https://valeofoodsuk-cfg.ifs.cloud',
     source_releam :'vafocfg1',
     source_client_id :'C8_MIG',
     source_client_secret :'GqYtgmH6OnIrI0MFDxWG65Ewf6CaiSf0',
    
 }

 const destinationcardinatilies ={
    dest_url :'https://psawa5g-dev1.build.ifs.cloud',
    dest_releam :'psawa5gdev1',
    dest_client_id :'C8_MIG',
    dest_client_secret :'AMH8lIZ68KHmLxQclyRK9Fy3Aq95fuTe'
}
beforeEach(() => {

cy.login(validUser.email, validUser.password)
cy.get('.bpJfoD').click()   
cy.contains('Settings').click()

  })

it('Update source IFS connection setting ', () => {

cy.contains('Source IFS Connection Settings')
  .parent()
  .within(() => {
cy.contains('IFS Base URL')
  .parent()
  .find('input')
    .clear()
    .type(sourcecardinatilies.source_url);

cy.contains('IFS Realm')
    .parent()
    .find('input')
    .clear()
    .type(sourcecardinatilies.source_releam);

cy.contains('Client ID')
    .parent()
    .find('input')
    .clear()
    .type(sourcecardinatilies.source_client_id);

cy.contains('Client Secret')
    .parent()
    .find('input')
    .clear()
    .type(sourcecardinatilies.source_client_secret);

  })

cy.contains('Test Connection').click();
       
cy.contains('Close').click();
cy.contains('Save Configuration').click();

})

it('Update destination IFS connection settings ', () => {

  cy.get('#scope-dest')
  .parent()
  .click()


cy.contains('Destination IFS Connection Settings')
  .parent()
  .within(() => {
cy.contains('IFS Base URL')
  .parent()
  .find('input')
    .clear()
    .type(destinationcardinatilies.dest_url);

cy.contains('IFS Realm')
    .parent()
    .find('input')
    .clear()
    .type(destinationcardinatilies.dest_releam);

cy.contains('Client ID')
    .parent()
    .find('input')
    .clear()
    .type(destinationcardinatilies.dest_client_id);

cy.contains('Client Secret')
    .parent()
    .find('input')
    .clear()
    .type(destinationcardinatilies.dest_client_secret);
    })
cy.contains('Test Connection').click();
cy.contains('Connection successful', { timeout: 10000 })
  .should('be.visible');
        
cy.contains('Close').click();
cy.contains('Save Configuration').click();


    })

})