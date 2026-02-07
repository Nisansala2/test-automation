describe("Column Properties Modal", () => {
  const ADMIN_EMAIL = "rohana@example.com";
  const ADMIN_PASSWORD = "hefnu6-veDvez-domcen";

  beforeEach(() => {
    cy.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  });

  it('should create migration flow "test column prop" if it does not exist', () => {
    const flowName = "test column prop";

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
      // Look for the flow name in the table/list
      const flowExists =
        $body.find(`td:contains("${flowName}")`).length > 0 ||
        $body.find(`tr:contains("${flowName}")`).length > 0;

      if (flowExists) {
        cy.log(`Flow "${flowName}" found, clicking on it...`);
        cy.contains("td", flowName).click(); // Click on the flow row
      } else {
        cy.log(`Flow "${flowName}" not found, creating new flow...`);

        // Click the "New" button to create a new flow
        cy.get("button").contains("New").click();

        // Fill in the flow name
        cy.get("#new-flow-name").type(flowName);

        // Fill in a description
        cy.get("#new-flow-description").type("Created by Cypress automation");

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

    // Only reload tables if no tables are persisted yet
    cy.get("body").then(($body) => {
      const noTablesPersisted = $body
        .text()
        .includes(
          "No tables persisted yet. Click the save icon above to load tables from IFS.",
        );

      if (noTablesPersisted) {
        cy.log("No tables persisted, reloading tables from source...");
        // Reload tables from source
        cy.get('[title="Reload tables from source"]').click();
        cy.contains("Saving tables snapshot...", { timeout: 60000 }).should(
          "not.exist",
        );
      } else {
        cy.log("Tables already persisted, skipping reload.");
      }
    });

    // Search for SupplierInfo
    const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
    cy.get(`input[placeholder="${searchPlaceholder}"]`)
      .clear()
      .type("SupplierInfo");

    // Add 'SupplierInfo' table only if it exists
    cy.get("body").then(($body) => {
      if ($body.find('[title="SupplierInfo"] > span').length > 0) {
        cy.log("SupplierInfo found, clicking to add...");
        cy.get('[title="SupplierInfo"] > span').click();
      } else {
        cy.log("SupplierInfo not found in the list.");
      }
    });

    // Click synchronize database and wait for popup to close
    cy.get('[title="Synchronize database"]').click();
    cy.contains("Synchronizing database", { timeout: 60000 }).should(
      "not.exist",
    );

    // Click the button after adding the table
    cy.get(".sc-gjTGSA > button > .sc-kFuwaP").click();

    // Click download from source and wait for download to complete
    cy.get('[title="Download from source"]').click();
    cy.contains("Download completed (download)", { timeout: 120000 }).should(
      "be.visible",
    );
    cy.get(":nth-child(2) > .dMqmKY").click();
    cy.get(
      '[style="cursor: pointer; background-color: rgb(243, 242, 241); width: 103px; max-width: 103px; position: relative;"] > .sc-dmqHEX > .sc-gjTGSA',
    ).click();

    // Enter test label name
    cy.get(":nth-child(2) > .field-input").clear().type("Test");

    // Enter test description
    cy.get(".field-textarea").clear().type("Test");

    // Intercept the apply changes API call
    cy.intercept("PUT", "**/api/migration/meta/table/attribute*").as(
      "applyChanges",
    );

    // Click apply changes button
    cy.get(".button-primary").click();

    // Check that apply changes API succeeded with status 200
    cy.wait("@applyChanges").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      cy.log("Apply changes API succeeded");
    });
  });

  //   // Helper to check table and add if missing
  //     }
  //   });

  //   // Helper to check table and add if missing
  //   const checkAndAddTable = (flowId) => {
  //     cy.request(`GET`, `/api/migration/flows/${flowId}`).then((response) => {
  //       const nodes = response.body.flow.diagram.nodes || [];
  //       const hasSupplierInfo = nodes.some(
  //         (node) => node.data && node.data.name === "SupplierInfo",
  //       );

  //       cy.contains(flowName).click(); // Open the flow

  //       if (!hasSupplierInfo) {
  //         cy.log("SupplierInfo table not found in flow API data, adding it...");

  //         // Reload tables
  //         cy.get('[title="Reload tables from source"]').click();
  //         cy.contains("Saving tables snapshot...", { timeout: 60000 }).should(
  //           "not.exist",
  //         );

  //         // Search for SupplierInfo
  //         const searchPlaceholder = "Search: ^start, end$, ^exact$, includes";
  //         cy.get(`input[placeholder="${searchPlaceholder}"]`)
  //           .clear()
  //           .type("SupplierInfo");

  //         // Add 'SupplierInfo' table
  //         cy.contains("tr", "SupplierInfo").contains("+ Add").click();
  //       } else {
  //         cy.log(
  //           "SupplierInfo table already exists in the flow (verified via API)",
  //         );
  //       }
  //     });
  //   };
  // });

  it("should open Column Properties modal and apply changes", () => {
    // --- OPEN MODAL ---
    // Click on a column header to open the modal (excluding the first two system columns)
    // We target the 3rd column (index 2) or a specific column by name if known
    cy.get('[data-testid="records-table"] thead th')
      .eq(3) // Adjust index to pick a safe column (e.g., Email or Name)
      .click();

    // Verify modal is visible
    cy.contains("Column Properties").should("be.visible");
    cy.get(".panel-footer").should("be.visible");

    // --- TEST INPUTS ---

    // 1. Label
    cy.contains("label", "Label").next("input").as("labelInput");
    cy.get("@labelInput").should("be.visible");
    const newLabel = "Updated Label " + Date.now();
    cy.get("@labelInput").clear().type(newLabel);

    // 2. Type (Read-only)
    cy.contains("label", "Type").next("input").should("be.disabled");

    // 3. Description
    cy.contains("label", "Description").next("textarea").as("descInput");
    cy.get("@descInput")
      .clear()
      .type("This is a test description for Cypress.");

    // 4. Options (Mandatory / Visible)
    // Mandatory
    cy.contains("Mandatory").parent().click(); // Toggle checkbox

    // Visible
    // Note: If you uncheck 'Visible', the column might disappear after apply, possibly breaking subsequent tests if not handled.
    // We'll toggle it twice to leave it visible.
    cy.contains("Visible").parent().click();
    cy.contains("Visible").parent().click();

    // 5. Conversion List (Custom Selector)
    cy.contains("label", "Conversion List").next().click(); // Open dropdown
    // Assuming standard React Select or similar structure, adjust if needed
    // cy.contains('OptionName').click(); // Select an option if available

    // 6. Reference
    cy.contains("label", "Reference").next("input").type("IsoCountry");

    // 7. Decimal Point (if numeric, or generally check visibility)
    // This input might not exist if type is not numeric, wrap in conditional check or just check existence if applicable
    cy.get("body").then(($body) => {
      if ($body.find('input[placeholder="."]').length > 0) {
        cy.get('input[placeholder="."]').type(".");
      }
    });

    // 8. Pad Left/Right
    cy.contains("label", "Pad Left Characters").next("input").type("0");
    cy.contains("label", "Pad Right Characters").next("input").type(" ");

    // --- APPLY CHANGES ---
    cy.contains("button", "Apply").click();

    // --- VERIFICATION ---
    // Verify modal closes
    cy.contains("Column Properties").should("not.exist");

    // Verify Label Change in Table Header
    // Note: Reload might be needed if state isn't instant, but usually it is.
    cy.get('[data-testid="records-table"] thead th')
      .contains(newLabel)
      .should("be.visible");
  });

  it("should close modal without applying changes", () => {
    cy.get('[data-testid="records-table"] thead th').eq(3).click();
    cy.contains("Column Properties").should("be.visible");

    // Change something
    cy.contains("label", "Label").next("input").type("Discard This");

    // Click Cancel
    cy.contains("button", "Cancel").click();

    // Verify modal closed
    cy.contains("Column Properties").should("not.exist");

    // Verify label did NOT change
    cy.get('[data-testid="records-table"] thead th')
      .contains("Discard This")
      .should("not.exist");
  });
});
