describe('Setting page tests', () => {
const validUser = {
    email: 'rohana@example.com',
    password: 'hefnu6-veDvez-domcen'
  }
 const sourcecardinatilies ={
    
     source_IFS_Auth_URL :'https://valeofoodsuk-cfg.ifs.cloud/auth/realms/vafocfg1/protocol/openid-connect/auth?response_type=code&state=...',
     source_url :'https://valeofoodsuk-cfg.ifs.cloud',
     source_releam :'vafocfg1',
     source_client_id :'C8_MIG',
     source_client_secret :'d95DY0gr0A1hkWVRYpTvWAP0RCWe8CLx',
    
 }

 const destinationcardinatilies ={

    dest_AUTH_URL :' https://psawa5g-dev1.build.ifs.cloud/auth/realms/psawa5gdev1/protocol/openid-connect/auth?client_id=IFS_aurena&response_type=code&nonce=e89a0a330267c7c8f5302c7ebecd3386&scope=openid%20microprofile-jwt&state=89b8ce2570a7797d615e9a9924d1958e&redirect_uri=https%3A%2F%2Fpsawa5g-dev1.build.ifs.cloud%2Fredirect',
    dest_url :'https://psawa5g-dev1.build.ifs.cloud',
    dest_releam :'psawa5gdev1',
    dest_client_id :'C8_MIG',
    dest_client_secret :'AMH8lIZ68KHmLxQclyRK9Fy3Aq95fuTe'
}
beforeEach(() => {

cy.login(validUser.email, validUser.password)
cy.contains('button', 'Settings').click()

  })

it('Update source IFS connection setting ', () => {

cy.contains('Source IFS Connection Settings')
  .parent()
  .within(() => {
cy.contains('IFS Auth URL')
  .parent()
  .find('input')
    .clear()
    .type(sourcecardinatilies.source_IFS_Auth_URL);

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
cy.contains('IFS Auth URL')
  .parent()
  .find('input')
    .clear()
    .type(destinationcardinatilies.dest_AUTH_URL);

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
cy.contains('Connection Successful', { timeout: 10000 })
  .should('be.visible');
        
cy.contains('Close').click();
cy.contains('Save Configuration').click();


    })

})