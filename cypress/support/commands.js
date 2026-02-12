import "cypress-file-upload";

Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://test.tabletap.lk");
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.contains("button", "Sign in").click();
});

Cypress.Commands.add("migration_flow", () => {
  cy.contains("Manage Flows").click();
  cy.get("button").contains("New").click();
  cy.get("#new-flow-name").type("test migration flow");
  cy.get("#new-flow-description").type("test migration flow description");
  cy.get("button").contains("Create Flow").click();
});

Cypress.Commands.add("Create_migration_flow", () => {
  cy.contains("Manage Flows").click();
  cy.get("button").contains("New").click();
  cy.get("#new-flow-name").type("test migration flow");
  cy.get("#new-flow-description").type("test migration flow description");
  cy.get("button").contains("Create Flow").click();
  cy.contains("Loading database...", { timeout: 60000 }).should("not.exist");
  cy.get('[title="Reload tables from source"]').click();
  cy.contains("Saving tables snapshot...", { timeout: 60000 }).should(
    "not.exist",
  );

  const tableSearch1 = "^AbcClass$";
  const tableSearch2 = "^SupplierInfo$";
  const placeholder = "Search: ^start, end$, ^exact$, includes";

  cy.get('input[placeholder="' + placeholder + '"]').type(tableSearch1);

  cy.contains("AbcClass").click();
  cy.wait(2000);
  cy.get('[title="Synchronize database"]').click();
  cy.contains("Synchronizing database...", { timeout: 20000 });

  cy.contains("Synchronizing database...", { timeout: 60000 }).should(
    "not.exist",
  );
});

Cypress.Commands.add("globalfilter", () => {
  cy.contains("Manage Flows").click();
  cy.contains("cypress globalfilter").click();
});

Cypress.Commands.add("migration", () => {
  cy.contains("Manage Flows").click();
  cy.contains("cypress migration").click();
  cy.wait(3000);
});
Cypress.Commands.add("navigateToConversionList", () => {
  cy.visit("https://cypress.tabletap.lk/pages/conversionList");
});
Cypress.Commands.add("navigateToDataWizard", () => {
  cy.visit("https://cypress.tabletap.lk/pages/dataWizard");
});

Cypress.Commands.add(
  "getOrCreateFlow",
  (flowName, description = "Created by Cypress automation") => {
    // Intercept the flows API call BEFORE triggering navigation
    cy.intercept("GET", "**/api/migration/flows*").as("getFlows");

    cy.contains("Manage Flows").click();

    // Wait for the API call to complete
    cy.wait("@getFlows");

    // Search for the flow
    cy.get('input[placeholder="Search flows..."]').clear().type(flowName);

    // Wait a moment for search results to update
    cy.wait(500);

    // Check if the flow exists in the list and click on it, or create a new one
    cy.get("body").then(($body) => {
      const flowExists =
        $body.find(`td:contains("${flowName}")`).length > 0 ||
        $body.find(`tr:contains("${flowName}")`).length > 0;

      if (flowExists) {
        cy.log(`Flow "${flowName}" found, clicking on it...`);
        cy.contains("td", flowName).click();
      } else {
        cy.log(`Flow "${flowName}" not found, creating new flow...`);

        // Click the "New" button to create a new flow
        cy.get("button").contains("New").click();

        // Fill in the flow name
        cy.get("#new-flow-name").type(flowName);

        // Fill in a description
        cy.get("#new-flow-description").type(description);

        // Intercept the create request
        cy.intercept("POST", "**/api/migration/flows").as("createFlow");

        // Click the create button
        cy.get("button").contains("Create Flow").click();

        // Wait for the flow to be created
        cy.wait("@createFlow").then((interception) => {
          cy.log("Flow created successfully");
          expect(interception.response.statusCode).to.be.oneOf([200, 201]);
        });
      }
    });

    // Wait for the flow page to load
    cy.wait(1000);
  },
);
